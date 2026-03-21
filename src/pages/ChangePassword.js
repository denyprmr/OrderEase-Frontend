import React, { useState } from "react";
import { updatePassword } from "../api/api";

function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.currentPassword || !form.newPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await updatePassword(form);
      alert("Password updated successfully!");

      // reset form
      setForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      alert("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Change Password 🔒</h2>

      <div className="profile-card">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;