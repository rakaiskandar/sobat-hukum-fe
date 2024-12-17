"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface UserCountData {
  role: string;
  count: number;
}

interface CaseCountData {
  name: string;
  count: number;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [userCount, setUserCount] = useState<UserCountData[]>([]); 
  const [caseCount, setCaseCount] = useState<CaseCountData[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data for admin (only for admin)
  const fetchUserData = async () => {
    if (!session?.user?.accessToken) {
      setError("No access token available.");
      setLoading(false);
      return;
    }

    try {
      const usersResponse = await axios.get("http://127.0.0.1:8000/api/v1/users/count", {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      });
      setUserCount(usersResponse.data); // Directly set the simplified response
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
    }
  };

  // Fetch case data (for both admin and non-admin users)
  const fetchCaseData = async () => {
    if (!session?.user?.accessToken) {
      setError("No access token available.");
      setLoading(false);
      return;
    }

    try {
      const casesResponse = await axios.get("http://127.0.0.1:8000/api/v1/cases/count", {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      });
      setCaseCount(casesResponse.data);
    } catch (err) {
      console.error("Error fetching case data:", err);
      setError("Failed to fetch case data.");
    }
  };

  useEffect(() => {
    if (session) {
      // Fetch data based on user role
      if (session.user.role === "admin") {
        fetchUserData(); // Fetch user data for admins
      }
      fetchCaseData(); // Fetch case data for both admin and non-admin
      setLoading(false); // Set loading to false if the user is not admin
    }
  }, [session]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-3">
      <h1 className="text-2xl font-bold text-primary mb-4">Dashboard</h1>

      {session?.user.role === "admin" ? (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-secondary">Jumlah Pengguna</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userCount}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>

          <h2 className="text-lg font-semibold text-secondary">Jumlah Kasus Yang Diajukan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={caseCount}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#F5A623" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-secondary">Jumlah Kasus Yang Diajukan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={caseCount}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#F5A623" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
