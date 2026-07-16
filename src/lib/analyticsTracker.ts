import { collection, addDoc, updateDoc, doc, increment, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

const MEASUREMENT_ID = "G-QBQWJK7NX3";

let sessionClientId: string | null = null;

const getClientId = () => {
  if (!sessionClientId) {
    sessionClientId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  return sessionClientId;
};

// Send GA4 tracking event via Fetch with keepalive to survive page transitions (resolves net::ERR_ABORTED)
const sendGA4Event = (eventName: string, params: Record<string, string> = {}) => {
  try {
    const cid = getClientId();
    const searchParams = new URLSearchParams({
      v: "2",
      tid: MEASUREMENT_ID,
      cid: cid,
      en: eventName,
      ...params
    });

    const url = `https://www.google-analytics.com/g/collect?${searchParams.toString()}`;

    fetch(url, {
      method: "POST",
      keepalive: true,
      mode: "no-cors"
    }).catch(() => {});
  } catch (err) {
    // Fail silently to avoid breaking main application flow
  }
};

export const trackPageView = async (pageName: string) => {
  // Trigger GA4 event with transition persistence
  sendGA4Event("page_view", { 
    dl: window.location.href, 
    dt: document.title,
    ep_page_name: pageName 
  });

  try {
    await addDoc(collection(db, "analytics"), {
      event: "pageview",
      page: pageName,
      timestamp: Timestamp.now()
    });
  } catch (err) {
    console.warn("Failed to log pageview:", err);
  }
};

export const trackBlogView = async (blogId: string) => {
  // Trigger GA4 event with transition persistence
  sendGA4Event("view_blog", { 
    ep_blog_id: blogId 
  });

  try {
    // Increment the view counter in the blog document itself
    const blogRef = doc(db, "blogs", blogId);
    await updateDoc(blogRef, {
      views: increment(1)
    });

    // Record the analytics entry
    await addDoc(collection(db, "analytics"), {
      event: "view_blog",
      targetId: blogId,
      timestamp: Timestamp.now()
    });
  } catch (err) {
    console.warn("Failed to log blog view:", err);
  }
};

export const trackMediaClick = async (mediaId: string, mediaName: string, mediaType: string) => {
  // Trigger GA4 event with transition persistence
  sendGA4Event(`play_${mediaType}`, { 
    ep_media_id: mediaId,
    ep_media_name: mediaName 
  });

  try {
    // Increment the click counter in the media document itself
    const mediaRef = doc(db, "media", mediaId);
    await updateDoc(mediaRef, {
      clicks: increment(1)
    });

    // Record the analytics entry
    await addDoc(collection(db, "analytics"), {
      event: `play_${mediaType}`,
      targetId: mediaId,
      detail: mediaName,
      timestamp: Timestamp.now()
    });
  } catch (err) {
    console.warn("Failed to log media click:", err);
  }
};

