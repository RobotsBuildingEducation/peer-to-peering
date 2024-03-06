import { setDoc } from "firebase/firestore";
import { createPost, createUserPost } from "../../../App.utilities";

/**
 * Publishes user content to Firestore, creating a new post in both the global "posts" collection and within the user's personal post subcollection.
 * @param {string} userId - The ID of the user submitting the post.
 * @param {string} content - The content of the post to be published.
 */
export const publishContent = async (userId, content) => {
  // Generates a new document reference for a post in the global "posts" collection.
  const newPostRef = createPost();

  // Generates a reference for the new post within the user-specific "posts" subcollection.
  const userPostRef = createUserPost(userId, newPostRef);

  // Defines the structure of the post data to be saved.
  const postData = {
    content: content,
    userId: userId,
    createdAt: new Date(), // Timestamp for when the post is created.
  };

  // Saves the post data to both the global "posts" collection and the user's subcollection.
  await setDoc(newPostRef, postData);
  await setDoc(userPostRef, postData);
};
