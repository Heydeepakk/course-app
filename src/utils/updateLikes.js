import { db, doc, updateDoc } from "../firebaseConfig";

export const updateLikes = async (courseId) => {
  const courseDoc = doc(db, "courses", courseId);
  try {
    await updateDoc(courseDoc, {
      likes: increment(1),
    });
  } catch (error) {
    console.error("Error updating likes:", error);
  }
};