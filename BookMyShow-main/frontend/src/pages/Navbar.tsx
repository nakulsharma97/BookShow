import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Menu } from "lucide-react";
import { useAuthStore } from "../services/useAuthStore";
import { AuthService } from "../services/auth";

interface UserInfo {
  id: number;
  username: string;
  email: string;
  token: string; // Add token to UserInfo
}

const Navbar: React.FC = () => {
  return (
    <nav
      className="glass-effect"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        padding: "0.75rem 0",
        borderBottom: "1px solid var(--glass-border)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "1.75rem",
            fontWeight: 900,
            color: "var(--text-main)",
            letterSpacing: "-1.5px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          BOOK<span style={{ color: "var(--primary)" }}>MY</span>SHOW
        </Link>

        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "2rem" }} className="nav-links">
            <Link
              to="/"
              style={{
                color: "var(--text-main)",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "0.95rem",
                opacity: 0.8,
              }}
            >
              Movies
            </Link>
            <Link
              to="/"
              style={{
                color: "var(--text-main)",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "0.95rem",
                opacity: 0.8,
              }}
            >
              Theaters
            </Link>
            <Link
              to="/"
              style={{
                color: "var(--text-main)",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "0.95rem",
                opacity: 0.8,
              }}
            >
              Events
            </Link>
          </div>

          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};

const AuthButtons: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);

 useEffect(() => {
  const user = AuthService.getCurrentUser();
  if (user) {
    setCurrentUser({
      id: user.id,
      username: user.username,
      email: user.email,
      token: user.token,
    });
  }
}, []);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    window.location.reload(); // Force reload to clear state
  };

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {currentUser ? (
        <>
          <span style={{ color: "white", fontSize: "0.95rem" }}>
            Welcome, {currentUser.username}
          </span>
          <button
            onClick={handleLogout}
            className="btn-primary"
            style={{ padding: "0.6rem 1.5rem", borderRadius: "100px" }}
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="btn-primary"
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: "100px",
            textDecoration: "none",
          }}
        >
          <User size={18} />
          Login
        </Link>
      )}
      <button
        style={{ background: "none", color: "white", display: "none" }}
        className="mobile-menu"
      >
        <Menu />
      </button>
    </div>
  );
};

export default Navbar;
