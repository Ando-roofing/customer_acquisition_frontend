import axios from "axios";
import { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/accounts/user/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [token]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>User Profile</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
      <p><strong>Company:</strong> {user.company_name}</p>
      <p><strong>Position:</strong> {user.position}</p>
      <p><strong>Zone:</strong> {user.zone}</p>
      <p><strong>Branch:</strong> {user.branch?.name}</p>
      <p><strong>Contact:</strong> {user.contact}</p>
      <p><strong>Date Joined:</strong> {new Date(user.date_joined).toLocaleString()}</p>
    </div>
  );
}

export default UserProfile;
