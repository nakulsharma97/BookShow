import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Menu } from "lucide-react";
import { useAuthStore } from "../services/useAuthStore"; // Corrected import path

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
  const { user, logout, initializeAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize auth state from localStorage when component mounts
    // This ensures the user state is loaded on initial render or page refresh
    initializeAuth();
  }, [initializeAuth]); // Dependency array includes initializeAuth to prevent re-running unnecessarily

  const handleLogout = () => {
    logout(); // Call the logout action from Zustand
    navigate("/login"); // Redirect to login page after logout
    // No need for window.location.reload() if your app correctly reacts to state changes
    // The Navbar will re-render automatically because `user` state changes in Zustand
  };

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {user ? ( // Use the user from Zustand store
        <>
          {/* Avatar with initial */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "var(--primary)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: "1rem",
              marginRight: "0.5rem",
            }}
          >
            {(user.username || user.email)?.charAt(0).toUpperCase()}
          </div>
          <button
            onClick={handleLogout}
            className="btn-primary"
            style={{ padding: "0.6rem 1.5rem", borderRadius: "100px" }}
          >
            Logout
          </button>
        </>
      ) :
        (
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
