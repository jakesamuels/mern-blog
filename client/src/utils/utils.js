import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

// GET - getAllPosts
export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    const data = response.data.data.posts;

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Error fetching posts");
  }
};

// POST - createPost
export const createPost = async (formData) => {
  try {
    const response = await axios({
      method: "POST",
      data: formData,
      url: `${BASE_URL}/posts`,
      withCredentials: true,
    });

    const newPostFromServer = await response.data.data.post;

    console.log(newPostFromServer);

    return { success: true, post: newPostFromServer };
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Server error creating post");
  }
};
