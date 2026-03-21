import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { getProfile, updateProfile } from "../api/api";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ✅ Redirect safely (no render issues)
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile({
          name: res?.data?.name || "",
          email: res?.data?.email || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  // ✅ Handle update
  const handleUpdate = async () => {
    if (!profile.name || !profile.email) {
      alert("Name and Email cannot be empty");
      return;
    }

    try {
      setSaving(true);
      await updateProfile(profile);
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;
  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <h2>My Profile 👤</h2>

      <div className="profile-card">
        {/* ✅ Name */}
        <p>
          <strong>Name:</strong>{" "}
          {editing ? (
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />
          ) : (
            profile.name
          )}
        </p>

        {/* ✅ Email */}
        <p>
          <strong>Email:</strong>{" "}
          {editing ? (
            <input
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          ) : (
            profile.email
          )}
        </p>

        {/* ✅ Edit / Save Buttons */}
        {editing ? (
          <>
            <button onClick={handleUpdate} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setEditing(false)} disabled={saving}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        )}

        {/* 🔗 ACTION BUTTONS */}
        <div className="profile-actions">
          <Link to="/orders">
            <button>My Orders</button>
          </Link>

          <Link to="/change-password">
            <button>Change Password</button>
          </Link>
        </div>

        {/* 🚪 Logout */}
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;