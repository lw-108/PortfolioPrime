/**
 * Cloudflare Worker for Dynamic Blog Serverless SSR Rendering
 * 
 * This worker intercepts requests to /blog/<blog-id> or /blog?id=<blog-id>,
 * fetches the corresponding post from Firestore REST API, compiles the HTML, CSS,
 * and JS, and serves it as a standalone, blazing-fast, SEO-optimized page from the edge.
 * 
 * Deployment Instructions:
 * 1. Go to your Cloudflare Dashboard -> Workers & Pages.
 * 2. Create a new Worker (e.g. named `folio-blog-renderer`).
 * 3. Copy-paste this script into the Workers editor.
 * 4. Configure routes (e.g., yourdomain.com/blog/*) to point to this Worker.
 */

const FIRESTORE_PROJECT_ID = "mklingeshwarmafolio";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Parse blog ID from path (/blog/:id) or query parameter (?id=...)
    let blogId = "";
    if (url.pathname.startsWith("/blog/")) {
      blogId = url.pathname.split("/blog/")[1];
    } else {
      blogId = url.searchParams.get("id");
    }

    if (!blogId) {
      return new Response(
        "<h1>Blog ID Required</h1><p>Please supply a blog ID via path (e.g. /blog/YOUR-ID) or query parameter (e.g. ?id=YOUR-ID).</p>", 
        { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 400 }
      );
    }

    // Clean up trailing slash
    blogId = blogId.replace(/\/$/, "");

    try {
      const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}/databases/(default)/documents/blogs/${blogId}`;
      const response = await fetch(firestoreUrl);

      if (!response.ok) {
        if (response.status === 404) {
          return new Response(
            "<h1>404 Blog Not Found</h1><p>The requested blog post could not be found in our database.</p>",
            { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 404 }
          );
        }
        throw new Error(`Firestore responded with status: ${response.status}`);
      }

      const doc = await response.json();
      const fields = doc.fields || {};

      // Helper to extract Firestore values safely
      const getVal = (field, type = "stringValue") => {
        return fields[field] && fields[field][type] ? fields[field][type] : "";
      };

      const title = getVal("title");
      const category = getVal("category");
      const readTime = getVal("readTime");
      const thumbnail = getVal("thumbnail") || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop";
      
      const isCustomCode = fields.isCustomCode && fields.isCustomCode.booleanValue;
      const htmlContent = getVal("htmlContent");
      const cssContent = getVal("cssContent");
      const jsContent = getVal("jsContent");

      // Generate HTML response
      let bodyHtml = "";

      if (isCustomCode) {
        // Mode 1: Full-width dynamic HTML, CSS, JS engine
        bodyHtml = `
          <div class="custom-blog-wrapper">
            ${htmlContent}
          </div>
        `;
      } else {
        // Mode 2: Standard structured blocks parser for backward-compatibility & SEO
        let blocks = [];
        if (fields.blocks && fields.blocks.arrayValue && fields.blocks.arrayValue.values) {
          blocks = fields.blocks.arrayValue.values.map(v => {
            const m = v.mapValue && v.mapValue.fields ? v.mapValue.fields : {};
            return {
              type: m.type ? m.type.stringValue : "text",
              content: m.content ? m.content.stringValue : "",
              description: m.description ? m.description.stringValue : ""
            };
          });
        }

        const blocksHtml = blocks.map(block => {
          if (block.type === "image") {
            return `
              <figure style="margin: 24px 0;">
                <img src="${block.content}" alt="${block.description || "Blog Image"}" style="max-width: 100%; border-radius: 12px;" />
                ${block.description ? `<figcaption style="text-align: center; font-size: 12px; color: #777; font-style: italic; margin-top: 8px;">${block.description}</figcaption>` : ""}
              </figure>
            `;
          }
          if (block.type === "youtube") {
            return `
              <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin: 24px 0;">
                <iframe src="${block.content}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allowfullscreen></iframe>
              </div>
            `;
          }
          return `<p style="margin-bottom: 20px; white-space: pre-wrap;">${block.content}</p>`;
        }).join("");

        bodyHtml = `
          <article style="max-width: 700px; margin: 0 auto;">
            <div style="margin-bottom: 30px;">
              <span style="background: rgba(255,93,21,0.1); color: #ff5d15; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; text-transform: uppercase;">${category}</span>
              <span style="color: #777; font-size: 12px; margin-left: 12px;">${readTime}</span>
            </div>
            <img src="${thumbnail}" alt="${title}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 16px; margin-bottom: 32px;" />
            <div class="content" style="font-size: 18px; line-height: 1.8; color: #ddd;">
              ${blocksHtml}
            </div>
          </article>
        `;
      }

      // Complete page shell
      const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title} | Portfolio Blog</title>
          
          <!-- SEO Metadata -->
          <meta name="description" content="Read ${title} under the ${category} category. Read time: ${readTime}.">
          <meta property="og:title" content="${title}">
          <meta property="og:description" content="Read ${title} under the ${category} category.">
          <meta property="og:image" content="${thumbnail}">
          <meta name="twitter:card" content="summary_large_image">

          <style>
            body {
              margin: 0;
              padding: 48px 24px;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #030303;
              color: #f3f3f3;
              line-height: 1.7;
            }
            .header-bar {
              max-width: 800px;
              margin: 0 auto 40px auto;
              border-bottom: 1px solid #222;
              padding-bottom: 24px;
            }
            .header-bar h1 {
              font-size: 40px;
              margin: 0 0 16px 0;
              font-weight: 800;
              letter-spacing: -0.02em;
            }
            .main-container {
              max-width: 800px;
              margin: 0 auto;
            }
            a {
              color: #ff5d15;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
            ${isCustomCode ? cssContent : ""}
          </style>
        </head>
        <body>
          <div class="header-bar">
            <h1>${title}</h1>
            <a href="/" style="font-size: 14px; font-weight: 600;">&larr; Back to Portfolio</a>
          </div>
          <div class="main-container">
            ${bodyHtml}
          </div>
          <script>
            try {
              ${isCustomCode ? jsContent : ""}
            } catch (e) {
              console.error("Script error on page:", e);
            }
          </script>
        </body>
        </html>
      `;

      return new Response(fullHtml, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=60, s-maxage=600"
        }
      });

    } catch (err) {
      return new Response(
        `<h1>500 Internal Server Error</h1><p>Error rendering blog page: ${err.message}</p>`,
        { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 500 }
      );
    }
  }
};
