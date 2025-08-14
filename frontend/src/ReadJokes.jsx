import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";

function ReadJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJokes();
    // eslint-disable-next-line
  }, []);

  const fetchJokes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/`);
      setJokes(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch jokes ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 32, color: "#007bff" }}>Latest Jokes</h2>
      {loading && <p style={{ color: "#888", fontSize: 18 }}>Loading jokes...</p>}
      {error && <p style={{ color: "#e11d48", fontSize: 18 }}>{error}</p>}
      {!loading && jokes.length === 0 && !error && (
        <p style={{ color: "#666", fontStyle: "italic", fontSize: 18 }}>No jokes yet. Be the first to share one! 😊</p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {jokes.map((joke) => (
          <div
            key={joke._id}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: 28,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              marginBottom: 0
            }}
          >
            <p style={{ fontSize: 20, marginBottom: 12, color: "#222" }}>&ldquo;{joke.joke}&rdquo;</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#007bff", fontWeight: 600, fontSize: 16 }}>— {joke.author}</span>
              {joke.createdAt && (
                <span style={{ color: "#888", fontSize: 14 }}>
                  {new Date(joke.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReadJokes;
