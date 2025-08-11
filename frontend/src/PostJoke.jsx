import { useState } from "react";
import axios from "axios";

function PostJoke() {
  const [newJoke, setNewJoke] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!newJoke.trim() || !author.trim()) {
      setError("Please fill in both fields");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/jokes", {
        joke: newJoke,
        author: author
      });
      setNewJoke("");
      setAuthor("");
      setSuccess("Joke posted successfully!");
    } catch (err) {
      setError("Failed to post joke ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      padding: 36,
      maxWidth: 500,
      margin: "40px auto"
    }}>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24, color: "#007bff" }}>Share a Joke</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#222" }}>
            Your Name
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter your name"
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              fontSize: 16,
              outline: "none",
              background: "#f9fafb"
            }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#222" }}>
            Joke
          </label>
          <textarea
            value={newJoke}
            onChange={(e) => setNewJoke(e.target.value)}
            placeholder="Enter your joke here..."
            rows="4"
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              fontSize: 16,
              outline: "none",
              background: "#f9fafb",
              resize: "vertical"
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#60a5fa" : "#007bff",
            color: "white",
            border: "none",
            padding: "12px 28px",
            borderRadius: 6,
            fontSize: 18,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(0,123,255,0.08)",
            transition: "background 0.2s"
          }}
        >
          {loading ? "Posting..." : "Post Joke"}
        </button>
      </form>
      {error && <p style={{ color: "#e11d48", marginTop: 18 }}>{error}</p>}
      {success && <p style={{ color: "#059669", marginTop: 18 }}>{success}</p>}
    </div>
  );
}

export default PostJoke;
