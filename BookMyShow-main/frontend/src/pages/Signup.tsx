import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthService } from "../services/auth";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Signup form submitted, attempting to navigate to /login");
    e.preventDefault();
    setMessage("");
    setLoading(true);
    setErrors({});

    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!name) newErrors.name = "Full Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      await AuthService.signup({ name, email, password });
      setMessage("Registration successful! Please login.");
      navigate("/login");
    } catch (error: any) {
      setMessage(error.message || "Registration failed.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />

      <div
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
            maxWidth: "500px",
            padding: "3rem",
            borderRadius: "32px",
            boxShadow: "var(--shadow-premium)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h1
              style={{
                fontSize: "2.5rem",
                marginBottom: "0.75rem",
                letterSpacing: "-1px",
              }}
            >
              Create Account
            </h1>
            <p style={{ color: "var(--text-muted)" }}>
              Join thousands of cinema lovers today
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
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
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <User
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
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                {errors.name && (
                  <p
                    style={{
                      color: "var(--primary)",
                      fontSize: "0.8rem",
                      marginTop: "0.25rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
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
                gap: "0.6rem",
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
                Password
              </label>
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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "0.5rem",
                marginLeft: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                id="terms"
                style={{
                  accentColor: "var(--primary)",
                  width: "18px",
                  height: "18px",
                }}
              />
              <label
                htmlFor="terms"
                style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}
              >
                I agree to the{" "}
                <Link
                  to="/"
                  style={{ color: "var(--primary)", textDecoration: "none" }}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/"
                  style={{ color: "var(--primary)", textDecoration: "none" }}
                >
                  Privacy Policy
                </Link>
              </label>
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
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Create Account"
              )}
              {!loading && <ArrowRight size={18} />}
            </button>
            {message && (
              <p
                style={{
                  color: message.includes("Error")
                    ? "var(--primary)"
                    : "var(--accent)",
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              >
                {message}
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
              OR SIGN UP WITH
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
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--primary)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
