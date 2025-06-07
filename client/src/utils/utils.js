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
