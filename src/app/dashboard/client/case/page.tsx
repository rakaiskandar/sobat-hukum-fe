"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function User() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null); // State untuk file upload
  const [formData, setFormData] = useState({
    title: "",
    case_type: "",
    description: "",
    is_anonymous: false,
  }); // State untuk form input
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Tambahkan state loading

  // Handle Input Change untuk form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  // Reset form dan file state
  const resetForm = () => {
    setFormData({
      title: "",
      case_type: "",
      description: "",
      is_anonymous: false,
    });
    setFile(null);
    setLoading(false);
  };

  // Handle Submit untuk upload data + file
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Aktifkan loading state
    setFormSuccess(null);
    setError(null);

    if (!file) {
      setError("Please select a file to upload.");
      setLoading(false);
      return;
    }

    try {
      // --- Step 1: Submit Case Data ---
      const caseFormData = new FormData();
      caseFormData.append("title", formData.title);
      caseFormData.append("case_type", formData.case_type);
      caseFormData.append("description", formData.description);
      caseFormData.append("is_anonymous", String(formData.is_anonymous));
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

      const caseId = caseResponse.data.case_id; // Ambil case ID dari respons

      // --- Step 2: Submit File Document ---
      const fileFormData = new FormData();
      fileFormData.append("file", file);
      fileFormData.append("case_id", caseId); // Hubungkan dengan case ID

      const documentResponse = await axios.post(
        "http://127.0.0.1:8000/api/v1/document/",
        fileFormData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // --- Jika berhasil ---
      if (caseResponse.status === 201 && documentResponse.status === 201) {
        setFormSuccess("Case and file uploaded successfully!");
        resetForm(); // Reset form state
      } else {
        throw new Error("Failed to upload case or document.");
      }
    } catch (error: any) {
      console.error("Error uploading case and file:", error);
      setError(
        error.response?.data?.detail || "An error occurred while uploading data."
      );
    } finally {
      setLoading(false); // Matikan loading state
    }
  };

  return (
    <div className="mx-3">
      {/* Section: Form Input + File Upload */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-primary mb-3">Upload Case dan Dokumen</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="case_type"
            placeholder="Case Type"
            value={formData.case_type}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          ></textarea>
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
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block mt-1"
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading} // Disable tombol saat loading
            className={`${
              loading ? "bg-gray-400" : "bg-primary hover:bg-blue-700"
            } text-white py-2 px-4 rounded transition`}
          >
            {loading ? "Uploading..." : "Submit Case & Upload File"}
          </button>
          {formSuccess && <p className="text-green-500">{formSuccess}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
