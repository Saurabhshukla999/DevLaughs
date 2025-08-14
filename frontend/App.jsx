import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import PostJoke from "./PostJoke";
import ReadJokes from "./ReadJokes";

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
        <nav style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 0",
          marginBottom: 32,
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}>
          <div style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span style={{ fontWeight: 700, fontSize: 28, color: "#007bff", letterSpacing: 1 }}>😄 Jokefy</span>
            <div>
              <Link to="/" style={{
                marginRight: 24,
                textDecoration: "none",
                color: "#222",
                fontWeight: 500,
                fontSize: 18,
                padding: "6px 12px",
                borderRadius: 6,
                transition: "background 0.2s",
              }}>Read Jokes</Link>
              <Link to="/post" style={{
                textDecoration: "none",
                color: "#fff",
                background: "#007bff",
                fontWeight: 500,
                fontSize: 18,
                padding: "6px 18px",
                borderRadius: 6,
                transition: "background 0.2s",
              }}>Post Joke</Link>
            </div>
          </div>
        </nav>
        <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
          <Routes>
            <Route path="/" element={<ReadJokes />} />
            <Route path="/post" element={<PostJoke />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
