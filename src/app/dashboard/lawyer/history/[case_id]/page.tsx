"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function CaseDetail({ params }: { params: Promise<{ case_id: string }> }) {
  const { data: session } = useSession();
  const { case_id } = use(params); // Properti params di-"unwrap"
  const [documents, setDocuments] = useState<any[]>([]);
  const [caseDetails, setCaseDetails] = useState<any[]>([]);
  const [updateDetail, setUpdateDetail] = useState<string>("");
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(""); // Untuk menangani error

  useEffect(() => {
    if (case_id) {
      fetchDocuments();
      fetchCaseDetails();
    }
  }, [case_id]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/documents/${case_id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`, // Tambahkan token jika diperlukan
        },
      });
      setDocuments(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setErrorMessage("Unauthorized: Harap periksa token autentikasi.");
      } else {
        console.error("Error fetching documents:", error);
        setErrorMessage("Gagal memuat dokumen.");
      }
    }
  };

  const fetchCaseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/case-detail/${case_id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`, 
        },
      });
      setCaseDetails(response.data);

      // Cek jika ada status "closed"
      const closedStatus = response.data.some((detail: any) =>
        detail.updates.some((update: any) => update.status === "closed")
      );
      setIsClosed(closedStatus);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setErrorMessage("Unauthorized: Harap periksa token autentikasi.");
      } else {
        console.error("Error fetching case details:", error);
        setErrorMessage("Gagal memuat detail kasus.");
      }
    }
  };

  const handleCreateUpdate = async (statusValue: string) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/case-update/",
        {
          document_id: documents[0]?.document_id || null, // Hindari error jika dokumen kosong
          update_detail: updateDetail,
          status: statusValue,  
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`, 
          },
        }
      );
      setUpdateDetail(""); // Reset form
      fetchCaseDetails(); // Refresh data
    } catch (error) {
      console.error("Error creating update:", error);
      setErrorMessage("Gagal menambahkan update.");
    }
  };

  return (
    <div className="mx-3">
      <h2 className="text-2xl font-semibold text-primary mb-4">Detail Kasus</h2>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      {/* List Files */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Files</h3>
        {documents.length > 0 ? (
          <ul>
            {documents.map((doc) => (
              <li key={doc.document_id}>
                <a
                  href={`http://localhost:8000${doc.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {doc.file_name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada file terkait.</p>
        )}
      </div>

      {/* List Case Details */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Case Updates</h3>
        {caseDetails.length > 0 ? (
          caseDetails.map((detail: any) => (
            <div key={detail.document_id} className="mb-4">
              <h4 className="font-semibold"></h4>
              <ul className="ml-4">
                {detail.updates.map((update: any) => (
                  <li key={update.case_update_id}>
                    <span className="font-medium">Detail:</span> {update.update_detail} |{" "}
                    <span className="font-medium">Status:</span>{" "}
                    <span className="text-gray-700">{update.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Tidak ada update kasus.</p>
        )}
      </div>

      {/* Form Input Update */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Tambah Update Kasus</h3>
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={3}
          placeholder="Isi detail pembaruan..."
          value={updateDetail}
          onChange={(e) => setUpdateDetail(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleCreateUpdate("on-progress")}
            disabled={!updateDetail.trim()}
          >
            Update
          </button>
          <button
            className={`${
              isClosed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white px-4 py-2 rounded`}
            onClick={() => handleCreateUpdate("closed")}
            disabled={isClosed || !updateDetail.trim()}
          >
            Finish
          </button>
        </div>
        {isClosed && (
          <p className="text-red-500 mt-2">
            Kasus sudah selesai, tidak dapat melakukan pembaruan lagi.
          </p>
        )}
      </div>
    </div>
  );
}
