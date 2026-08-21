import React from "react";
import { useAuth } from "../Context/AuthContext";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiCamera,
  FiSave,
  FiLogOut,
  FiX,
} from "react-icons/fi";

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Profile() {
  const {
    user,
    signout,
    updateUserProfile,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const fileInputRef = React.useRef(null);

  const [isEditing, setIsEditing] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    profileImage: user?.profileImage || "",
  });

  // =========================
  // UPDATE FORM WHEN USER CHANGES
  // =========================

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  // =========================
  // REDIRECT IF NOT LOGGED IN
  // =========================

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // =========================
  // HANDLE INPUT
  // =========================

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  }

  // =========================
  // HANDLE PROFILE IMAGE
  // =========================

  function handleImage(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      setMessage("Please choose a valid image file.");
      return;
    }

    // Maximum 2MB
    if (file.size > 2 * 1024 * 1024) {
      setMessage("Image must be smaller than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));

      setMessage("");
    };

    reader.readAsDataURL(file);
  }

  // =========================
  // SAVE PROFILE
  // =========================
function handleSave(e) {
  e.preventDefault();

  if (!formData.name.trim()) {
    setMessage("Name is required.");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    updateUserProfile({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      profileImage: formData.profileImage,
    });

    setIsEditing(false);
    setMessage("Profile updated successfully.");
  } catch (error) {
    console.error("Profile update error:", error);
    setMessage("Failed to update profile.");
  } finally {
    setLoading(false);
  }
}

  // =========================
  // CANCEL EDIT
  // =========================

  function handleCancel() {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      profileImage: user.profileImage || "",
    });

    setMessage("");
    setIsEditing(false);
  }

  // =========================
  // SIGN OUT
  // =========================

  function handleSignOut() {
    signout();

    const redirectTo =
      location.state?.from?.pathname || "/login";

    navigate(redirectTo, {
      replace: true,
    });
  }

  // =========================
  // PROFILE NAME
  // =========================

  const profileName =
    user.name?.trim() || "User";

  const profileInitial =
    profileName.charAt(0).toUpperCase();

  // =========================
  // JSX
  // =========================

  return (
    <section className="min-h-screen bg-gradient-to-b from-coffee-cream to-white py-10 px-4">

      <div className="max-w-2xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="relative flex items-center justify-center mb-8">

          <h1 className="text-3xl md:text-4xl font-bold text-coffee-brown text-center">
            My Profile
          </h1>

          {!isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(true);
                setMessage("");
              }}
              className="absolute right-0 flex items-center gap-2 bg-orange-400 text-white px-5 py-2.5 rounded-xl hover:bg-gray-600 transition shadow-md cursor-pointer"
            >
              <FiEdit2 />
              Edit
            </button>
          )}

        </div>

        {/* ================= PROFILE CARD ================= */}

        <div className="bg-white border border-orange-100 shadow-lg rounded-3xl p-6 md:p-8">

          {/* ================= PROFILE HEADER ================= */}

          <div className="flex flex-col items-center mb-8">

            {/* BIG PROFILE IMAGE */}

            <div className="w-28 h-28 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">

              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                profileInitial
              )}

            </div>

            {/* NAME */}

            <h2 className="text-2xl font-bold mt-4 text-coffee-brown text-center">
              {profileName}
            </h2>

            {/* EMAIL */}

            <p className="text-gray-500 mt-1 text-center">
              {user.email}
            </p>

          </div>

          {/* ================= MESSAGE ================= */}

          {message && (
            <div
              className={`mb-5 px-4 py-3 rounded-xl text-sm text-center ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSave}
            className="space-y-5"
          >

            {/* ================= PROFILE PICTURE ================= */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Profile Picture
              </label>

              <div className="flex items-center gap-4">

                {/* SMALL PREVIEW */}

                <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-500 text-white flex items-center justify-center text-xl font-bold">

                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    profileInitial
                  )}

                </div>

                {/* CHOOSE PHOTO */}

                <button
                  type="button"
                  disabled={!isEditing}
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className={`flex items-center gap-2 border px-4 py-2 rounded-xl font-semibold transition ${
                    isEditing
                      ? "border-orange-500 text-orange-500 hover:bg-orange-50"
                      : "border-gray-300 text-gray-400 cursor-pointer"
                  }`}
                >
                  <FiCamera />
                  Choose Photo
                </button>

                {/* HIDDEN FILE INPUT */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />

              </div>

              {isEditing && (
                <p className="text-xs text-gray-500 mt-2">
                  Maximum image size: 2MB
                </p>
              )}

            </div>

            {/* ================= NAME ================= */}

            <div>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FiUser />
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-100 disabled:text-gray-500"
              />

            </div>

            {/* ================= EMAIL ================= */}

            <div>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FiMail />
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
              />

            </div>

            {/* ================= PHONE ================= */}

            <div>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FiPhone />
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-100"
              />

            </div>

            {/* ================= ADDRESS ================= */}

            <div>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FiMapPin />
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                placeholder="Enter your address"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-100"
              />

            </div>

            {/* ================= SAVE / CANCEL ================= */}

            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-3 pt-3">

                {/* SAVE */}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                >
                  <FiSave />

                  {loading
                    ? "Saving..."
                    : "Save Changes"}
                </button>

                {/* CANCEL */}

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                >
                  <FiX />
                  Cancel
                </button>

              </div>
            )}

            {/* ================= SIGN OUT ================= */}

            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition mt-6"
            >
              <FiLogOut />
              Sign Out
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Profile;