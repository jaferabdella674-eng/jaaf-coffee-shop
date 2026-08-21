import React, {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  // ================= LOAD USER =================
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("Registereduser");

      return savedUser
        ? JSON.parse(savedUser)
        : null;

    } catch (error) {
      console.error(
        "Error loading user:",
        error
      );

      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= SIGN UP =================
  const signup = (
    name,
    email,
    phone,
    password
  ) => {

    setLoading(true);
    setError("");

    try {

      if (
        !name.trim() ||
        !email.trim() ||
        !phone.trim() ||
        !password.trim()
      ) {
        throw new Error(
          "All fields are required."
        );
      }

      const savedUser =
        localStorage.getItem(
          "Registereduser"
        );

      const existingUser = savedUser
        ? JSON.parse(savedUser)
        : null;

      if (
        existingUser &&
        existingUser.email ===
          email.trim().toLowerCase()
      ) {
        throw new Error(
          "Email already exists."
        );
      }

      const newUser = {
        id: Date.now(),

        name: name.trim(),

        email: email
          .trim()
          .toLowerCase(),

        phone: phone.trim(),

        password,

        address: "",

        bio: "",

        profileImage: "",

        createdAt:
          new Date().toISOString(),
      };

      localStorage.setItem(
        "Registereduser",
        JSON.stringify(newUser)
      );

      setUser(newUser);

      return {
        success: true,
        user: newUser,
      };

    } catch (err) {

      setError(err.message);

      return {
        success: false,
        error: err.message,
      };

    } finally {

      setLoading(false);

    }
  };

  // ================= LOGIN =================
  const login = (
    email,
    password
  ) => {

    setLoading(true);
    setError("");

    try {

      const savedUser =
        localStorage.getItem(
          "Registereduser"
        );

      if (!savedUser) {

        const message =
          "No account found. Please sign up first.";

        setError(message);

        return {
          success: false,
          error: message,
        };
      }

      const registeredUser =
        JSON.parse(savedUser);

      if (
        registeredUser.email !==
          email.trim().toLowerCase() ||
        registeredUser.password !==
          password
      ) {

        const message =
          "Invalid email or password.";

        setError(message);

        return {
          success: false,
          error: message,
        };
      }

      setUser(registeredUser);

      return {
        success: true,
        user: registeredUser,
      };

    } catch (err) {

      const message =
        err instanceof Error
          ? err.message
          : "Login failed.";

      setError(message);

      return {
        success: false,
        error: message,
      };

    } finally {

      setLoading(false);

    }
  };

  // ================= UPDATE PROFILE =================
  const updateProfile = (updates) => {

    if (!user) {

      return {
        success: false,
        error: "No user is logged in.",
      };
    }

    const updatedUser = {
      ...user,
      ...updates,
    };

    localStorage.setItem(
      "Registereduser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    return {
      success: true,
      user: updatedUser,
    };
  };

  // ================= SIGN OUT =================
  const signout = () => {

    setUser(null);

    setError("");

    // Remove only logged-in user
    // from application state.
    // Registered account remains in localStorage.
  };

  // ================= PROVIDER =================
  return (
    <AuthContext.Provider
      value={{
        user,

        loading,

        error,

        signup,

        login,

        updateProfile,

        signout,

        // aliases
        logout: signout,
        updateUserProfile: updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ================= CUSTOM HOOK =================
export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}

export default AuthContext;