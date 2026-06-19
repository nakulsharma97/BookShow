import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { Mail, Lock, ArrowRight, User } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuthStore } from "../services/useAuthStore"; // Corrected import path

const Login: React.FC = () => {
  console.log("Login component rendered"); // Added for debugging
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const { loading, error, login } = useAuthStore(); // Only destructure what the hook provides
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await login(email, password); // Call the login action from the store
      const from = location.state?.from?.pathname || "/"; // Get the path from location state or default to home
      navigate(from, { replace: true }); // Redirect to the original path
    } catch (error: any) {
      console.error("Login error:", error);
      // The error is already set in the store by the login action, no need to set it again here.
    } 
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />

      <div
        // Added for debugging:
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8rem 2rem 4rem",
          background:
            "radial-gradient(circle at top right, rgba(225, 29, 72, 0.05), transparent 40%), radial-gradient(circle at bottom left, rgba(225, 29, 72, 0.05), transparent 40%)",
        }}
      >
        <div
          className="glass-effect animate-fade"
          style={{
            width: "100%",
            maxWidth: "450px",
            padding: "3rem",
            borderRadius: "32px",
            boxShadow: "var(--shadow-premium)",
          }}
        >
          <h1>Login Page (Debugging)</h1> {/* Added for debugging */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h1
              style={{
                fontSize: "2.5rem",
                marginBottom: "0.75rem",
                letterSpacing: "-1px",
              }}
            >
              Welcome Back
            </h1>
            <p style={{ color: "var(--text-muted)" }}>
              Enter your credentials to access your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  marginLeft: "0.5rem",
                }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={18}
                  style={{
                    position: "absolute",
                    left: "1.25rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "1rem 1rem 1rem 3.5rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "16px",
                    color: "white",
                    outline: "none",
                    transition: "var(--transition)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--primary)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--glass-border)")
                  }
                />
                {errors.email && (
                  <p
                    style={{
                      color: "var(--primary)",
                      fontSize: "0.8rem",
                      marginTop: "0.25rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 0.5rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "var(--text-muted)",
                  }}
                >
                  Password
                </label>
                <Link
                  to="/"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--primary)",
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: "1.25rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "1rem 1rem 1rem 3.5rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "16px",
                    color: "white",
                    outline: "none",
                    transition: "var(--transition)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--primary)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--glass-border)")
                  }
                />
                {errors.password && (
                  <p
                    style={{
                      color: "var(--primary)",
                      fontSize: "0.8rem",
                      marginTop: "0.25rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: "100%",
                marginTop: "1rem",
                borderRadius: "16px",
                justifyContent: "center",
              }}
            >
              {" "}
              {loading ? "Signing In..." : "Sign In"}{" "}
              {!loading && <ArrowRight size={18} />}{" "}
            </button>
            {error && (
              <p
                style={{
                  color: "var(--primary)",
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              >
                {error}
              </p>
            )}
          </form>
          <div
            style={{
              margin: "2rem 0",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "var(--glass-border)",
              }}
            ></div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              OR CONTINUE WITH
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "var(--glass-border)",
              }}
            ></div>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              className="btn-glass"
              style={{ flex: 1, borderRadius: "16px", padding: "0.75rem" }}
            >
              <User size={18} />
              GitHub
            </button>
            <button
              className="btn-glass"
              style={{ flex: 1, borderRadius: "16px", padding: "0.75rem" }}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                width="18"
                height="18"
                alt="Google"
              />
              Google
            </button>
          </div>
          <p
            style={{
              textAlign: "center",
              marginTop: "2.5rem",
              color: "var(--text-muted)",
              fontSize: "0.95rem",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "var(--primary)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
