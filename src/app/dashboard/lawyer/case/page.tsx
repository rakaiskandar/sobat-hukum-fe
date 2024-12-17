"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";

export default function CaseApprove() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [caseData, setCaseData] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data kasus dari API
  const getCase = async () => {
    try {
      setError(null);
      setLoading(true);

      const res = await axios.get(
        "http://127.0.0.1:8000/api/v1/cases/assign/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      const filteredCases = Array.isArray(res.data)
        ? res.data.filter((caseItem: any) => caseItem.status !== "approved")
        : res.data.results.filter(
            (caseItem: any) => caseItem.status !== "approved"
          );

      setCaseData(filteredCases);

      // Jika ada kasus, fetch dokumen terkait
      if (filteredCases.length > 0) {
        fetchDocuments(filteredCases.map((caseItem: any) => caseItem.case_id));
      } else {
        setDocuments([]);
      }
    } catch (err: any) {
      console.error("Error fetching case data:", err);
      setError(err?.response?.data?.message || "Failed to fetch case data");
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async (caseIds: string[]) => {
    try {
      const responses = await Promise.all(
        caseIds.map((caseId) =>
          axios.get(`http://localhost:8000/api/v1/documents/${caseId}/`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.accessToken}`,
            },
          })
        )
      );
      const allDocuments = responses.flatMap((response) => response.data);
      setDocuments(allDocuments);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setDocuments([]);
    }
  };

  // Fungsi untuk approve case
  const approveCase = async (caseId: string) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/v1/cases/${caseId}/approve/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      setCaseData((prev) =>
        prev.filter((caseItem) => caseItem.case_id !== caseId)
      );

      setDocuments((prev) =>
        prev.filter((doc) => !caseId.includes(doc.case_id))
      );
    } catch (err: any) {
      console.error("Error approving case:", err);
      setError(err?.response?.data?.message || "Failed to approve case");
    }
  };

  useEffect(() => {
    getCase();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Menangani kondisi saat data kosong
  if (caseData.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold">
          Tidak ada kasus yang diajukan ke Anda.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-wrap gap-4">
      <h2 className="text-2xl font-semibold text-primary mb-3">Laman Kasus</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {caseData.map((caseItem, index) => (
          <Card key={index} className="w-[350px]">
            <CardHeader>
              <CardTitle>Case</CardTitle>
              <CardDescription>Details of the case.</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`title-${index}`}>Title</Label>
                    <div>{caseItem.title || "---"}</div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <h3 className="text-xl font-medium mb-2">Files</h3>
                    {documents.some(
                      (doc) => doc.case_id === caseItem.case_id
                    ) ? (
                      <ul>
                        {documents
                          .filter((doc) => doc.case_id === caseItem.case_id)
                          .map((doc) => (
                            <li key={doc.document_id}>
                              <a
                                href={`${doc.file_path}`}
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
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`created_by-${index}`}>Created By</Label>
                    <div>
                      {caseItem.is_anonymous
                        ? "---"
                        : caseItem.created_by || "---"}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`created_at-${index}`}>Created At</Label>
                    <div>
                      {dayjs(caseItem.created_at).format("dddd, D MMMM YYYY") ||
                        "---"}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`case_type-${index}`}>Case Type</Label>
                    <div>{caseItem.case_type || "---"}</div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <div>{caseItem.description || "---"}</div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`is_anonymous-${index}`}>
                      Is Anonymous
                    </Label>
                    <div>{caseItem.is_anonymous ? "Yes" : "No"}</div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`status-${index}`}>Status</Label>
                    <div className="text-gray-600 font-bold">
                      {caseItem.status || "---"}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => approveCase(caseItem.case_id)}
                  >
                    Approve Case
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
