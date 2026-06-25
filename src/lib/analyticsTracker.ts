import { collection, addDoc, updateDoc, doc, increment, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export const trackPageView = async (pageName: string) => {
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
