import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "./../../context/AuthContext";
import { createPost } from "./../../utils/utils";

const AddPostForm = () => {
  const { user } = useAuth();
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !editorContent) {
      setError("Please fill in all fields.");
      console.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    try {
      const newPost = {
        title,
        description,
        content: editorContent,
        author: {
          id: user._id,
          username: user.username,
        },
      };

      const result = await createPost(newPost);

      if (result.success) {
        console.log("Post successful!");
      } else {
        setError(
          "Post failed:",
          result.message || "An unknown error occurred."
        );
        console.error(
          "Post failed:",
          result.message || "An unknown error occurred."
        );
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong! Please try again.");
    } finally {
      setEditorContent("");
      setTitle("");
      setSubmitting(false);
      setError("");
    }
  };

  // Callback function to handle content changes from the Quill editor
  const handleEditorChange = useCallback((content) => {
    setEditorContent(content);
  }, []);

  // Handle title input change
  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
  });

  // Handle thumbnail file input change
  const handleThumbnailChange = useCallback((e) => {
    setThumbnail(e.target.files[0]);
  }, []);

  return (
    <form className="add-post-form" onSubmit={handleSubmit}>
      <h2 className="page-title">Create a blog</h2>
      {/* Title Input */}
      <div className="form-group">
        <label htmlFor="post-title" className="form-label">
          Title:
          <input
            type="text"
            id="post-title"
            className="form-input"
            placeholder="Enter your post title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>

        <label htmlFor="post-description" className="form-label">
          Description:
          <input
            type="text"
            id="post-description"
            className="form-input"
            placeholder="Enter post description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
      </div>

      {/* Thumbnail Upload */}
      <div className="form-group">
        <label htmlFor="thumbnail-upload" className="form-label">
          Thumbnail Image:
          <input
            type="file"
            id="thumbnail-upload"
            className="form-input-file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
        </label>
      </div>

      {/* Quill Editor Component */}
      <QuillEditor
        onContentChange={handleEditorChange}
        initialContent="<p>Start writing your content here...</p>"
      />

      {/* Submit Button */}
      <div className="form-actions">
        <button type="submit" className="submit-button">
          Submit Post
        </button>
      </div>
    </form>
  );
};

/**
 * QuillEditor Component
 * A reusable React component for integrating Quill.js rich text editor.
 *
 * Props:
 * - onContentChange: Function to call when the editor content changes.
 * - initialContent: Initial HTML content to load into the editor.
 */
function QuillEditor({ onContentChange, initialContent = "" }) {
  // useRef to hold the DOM element where Quill will be mounted
  const editorRef = useRef(null);
  // useRef to hold the Quill instance
  const quillInstance = useRef(null);

  useEffect(() => {
    // Dynamically load Quill.js and its styles from CDN
    const loadQuill = async () => {
      try {
        // Load Quill.js script
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });

        // Load Quill.js stylesheet
        await new Promise((resolve, reject) => {
          const link = document.createElement("link");
          link.href =
            "https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css";
          link.rel = "stylesheet";
          link.onload = resolve;
          link.onerror = reject;
          document.head.appendChild(link);
        });

        // Initialize Quill after scripts and styles are loaded
        if (editorRef.current && !quillInstance.current) {
          // Define the toolbar options
          const toolbarOptions = [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
          ];

          // Initialize Quill with the snow theme and defined modules
          quillInstance.current = new window.Quill(editorRef.current, {
            theme: "snow",
            modules: {
              toolbar: toolbarOptions,
            },
            placeholder: "Compose your thoughts...",
          });

          // Set initial content if provided
          if (initialContent) {
            quillInstance.current.clipboard.dangerouslyPasteHTML(
              0,
              initialContent
            );
          }

          // Add a listener for text changes
          quillInstance.current.on("text-change", () => {
            if (onContentChange) {
              // Get the HTML content from the editor
              onContentChange(quillInstance.current.root.innerHTML);
            }
          });
        }
      } catch (error) {
        console.error("Failed to load Quill.js:", error);
      }
    };

    loadQuill();

    // Cleanup function: destroy the Quill instance when the component unmounts
    return () => {
      if (quillInstance.current) {
        // If Quill has a destroy method, use it for proper cleanup
        if (typeof quillInstance.current.destroy === "function") {
          quillInstance.current.destroy();
        }
        quillInstance.current = null;
      }
    };
  }, [onContentChange, initialContent]);

  return (
    <div className="quill-editor-wrapper">
      {/* The div where Quill editor will be mounted */}
      <div ref={editorRef} className="quill-editor-container">
        {/* Quill editor will be rendered inside this div */}
      </div>
    </div>
  );
}

export default AddPostForm;
