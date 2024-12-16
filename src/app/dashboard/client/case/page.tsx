"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Case() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    case_type: "",
    description: "",
    is_anonymous: false,
    lawyer_id: "", // Lawyer ID default kosong (opsional)
  });
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lawyers, setLawyers] = useState<{ lawyer_id: string; name: string }[]>(
    []
  );

  // Fetch list lawyer saat komponen di-mount
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/v1/lawyers/list/",
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          }
        );
        setLawyers(res.data);
      } catch (error) {
        console.error("Error fetching lawyers:", error);
        setError("Failed to load lawyers.");
      }
    };

    fetchLawyers();
  }, [session]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      case_type: "",
      description: "",
      is_anonymous: false,
      lawyer_id: "", // Reset lawyer_id
    });
    setFile(null);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormSuccess(null);
    setError(null);

    if (!file) {
      setError("Please select a file to upload.");
      setLoading(false);
      return;
    }

    try {
      const caseFormData = new FormData();
      caseFormData.append("title", formData.title);
      caseFormData.append("case_type", formData.case_type);
      caseFormData.append("description", formData.description);
      caseFormData.append("is_anonymous", String(formData.is_anonymous));
      if (formData.lawyer_id) {
        caseFormData.append("lawyer_id", formData.lawyer_id); // Hanya append jika tidak kosong
      }
      caseFormData.append("file", file);

      const caseResponse = await axios.post(
        "http://127.0.0.1:8000/api/v1/cases/",
        caseFormData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (caseResponse.status === 201) {
        setFormSuccess("Case and file uploaded successfully!");
        resetForm();
      } else {
        throw new Error("Failed to upload case.");
      }
    } catch (error: any) {
      console.error("Error uploading case:", error);
      setError(
        error.response?.data?.detail ||
          "An error occurred while uploading data."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-3">
      <h2 className="text-2xl font-semibold text-primary mb-3">
        Pengajuan Kasus
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="case_type"
          placeholder="Case Type"
          value={formData.case_type}
          onChange={handleInputChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></Textarea>

        {/* Select Lawyer (Opsional) */}
        <label>
          Select Lawyer (Optional):
          <select
            name="lawyer_id"
            value={formData.lawyer_id}
            onChange={handleInputChange}
          >
            <option value="">-- None --</option>
            {lawyers.map((lawyer) => (
              <option key={lawyer.lawyer_id} value={lawyer.lawyer_id}>
                {lawyer.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_anonymous"
            checked={formData.is_anonymous}
            onChange={handleInputChange}
          />
          <span>Submit as Anonymous</span>
        </label>
        <label>
          File Upload:
          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block mt-1"
            required
          />
        </label>
        <Button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-primary hover:bg-blue-700"
          } text-white py-2 px-4 rounded transition`}
        >
          {loading ? "Uploading..." : "Ajukan Kasus"}
        </Button>
        {formSuccess && <p className="text-green-500">{formSuccess}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
