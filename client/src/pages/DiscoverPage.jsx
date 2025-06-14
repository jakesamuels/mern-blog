import { useState, useEffect } from "react";
import { getAllPosts } from "../utils/utils";
import { NavLink } from "react-router";
import ScrollToTop from "../components/utils/ScrollToTop";

const PostPreviewCard = ({ post }) => {
  return (
    <div className="post-preview-card">
      <img
        src="/assets/card-placeholder.webp"
        alt={post.title}
        className="post-preview-card__img"
      />
      <div className="post-preview-card__container">
        <NavLink to={`/posts/${post._id}`}>
          <span className="post-preview-card__title">{post.title}</span>
        </NavLink>
        <p className="post-preview-card__description">
          {post.description.slice(0, 100)}...{" "}
        </p>

        <div className="post-preview-card__author-info">
          {post.author.username ? (
            <NavLink to="/" className="post-preview-card__author">
              {post.author.username}
            </NavLink>
          ) : (
            <NavLink to="/" className="post-preview-card__author">
              Author
            </NavLink>
          )}
          <img
            src="/assets/profile-placeholder.png"
            alt="Author profile avatar"
            className="post-preview-card__author-img"
          />
          <span>{post.createdAt.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
};

const DiscoverPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error(error);
      setError(error?.message || "Failed to fetch posts.");
    } finally {
      setLoading(false);
      setError("");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderCards = () => {
    if (posts.length > 0) {
      return posts.map((post) => (
        <PostPreviewCard post={post} key={post._id} />
      ));
    } else {
      return <p>There are no posts to see</p>;
    }
  };

  return (
    <div className="discover-page">
      <ScrollToTop />
      <section className="page-section discover-page__intro-section">
        <h1>Discover</h1>
        <p>Discover new blogs</p>
      </section>

      <section className="page-section discover-page__cards">
        {renderCards()}
      </section>
    </div>
  );
};

export default DiscoverPage;
