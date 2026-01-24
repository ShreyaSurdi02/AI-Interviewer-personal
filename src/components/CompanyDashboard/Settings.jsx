import { useEffect, useState } from "react";

export default function Settings() {
  /* ================= STATE ================= */
  const [profile, setProfile] = useState({
    companyName: "",
    email: "",
    phone: "",
    website: "",
    password: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("company_profile")) || {};
    setProfile({
      companyName: stored.companyName || "",
      email: stored.email || "",
      phone: stored.phone || "",
      website: stored.website || "",
      password: stored.password || "admin123", // default
    });
  }, []);

  /* ================= SAVE PROFILE ================= */
  const saveProfile = () => {
    if (!profile.companyName || !profile.email) {
      alert("Company name and email are required");
      return;
    }

    localStorage.setItem(
      "company_profile",
      JSON.stringify(profile)
    );

    alert("Company profile updated successfully");
  };

  /* ================= CHANGE PASSWORD ================= */
  const changePassword = () => {
    if (currentPassword !== profile.password) {
      alert("Current password is incorrect");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const updated = { ...profile, password: newPassword };

    setProfile(updated);
    localStorage.setItem(
      "company_profile",
      JSON.stringify(updated)
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    alert("Password changed successfully");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* ================= COMPANY PROFILE ================= */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Company Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Company Name"
            value={profile.companyName}
            onChange={(e) =>
              setProfile({
                ...profile,
                companyName: e.target.value,
              })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Email"
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Phone"
            value={profile.phone}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value,
              })
            }
          />

          <input
            className="border p-2 rounded"
            placeholder="Website"
            value={profile.website}
            onChange={(e) =>
              setProfile({
                ...profile,
                website: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={saveProfile}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Save Profile
        </button>
      </div>

      {/* ================= CHANGE PASSWORD ================= */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Change Password
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="password"
            className="border p-2 rounded"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            className="border p-2 rounded"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            className="border p-2 rounded"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />
        </div>

        <button
          onClick={changePassword}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
