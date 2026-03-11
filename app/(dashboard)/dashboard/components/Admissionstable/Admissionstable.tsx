"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from './style.module.css';
import Button from "@/app/components/Button";

const API_URL = "https://jayone-87f0a69e6159.herokuapp.com/api/applications/";

const currentYear = new Date().getFullYear();
const years = ["All", ...Array.from({ length: 5 }, (_, i) => String(currentYear - i))];

type ApplicationStatus = "all" | "pending" | "approved" | "rejected";

interface PaymentId {
  _id: string;
  email: string;
}

interface Application {
  _id: string;
  paymentId: PaymentId;
  token: string;
  surname: string;
  firstName: string;
  otherName: string;
  gender: string;
  dateOfBirthD: string;
  dateOfBirthM: string;
  dateOfBirthY: string;
  placeOfBirth: string;
  nationality: string;
  maritalStatus: string;
  passportPhoto: string;
  idCardNumber: string;
  permanentAddress: string;
  telephone: string;
  email: string;
  isForeignerInGhana: string;
  program: string;
  previousCollege: string;
  yearOfCompletion: string;
  certificateType: string;
  sponsorFullName: string;
  sponsorRelationship: string;
  sponsorOccupation: string;
  sponsorMobile: string;
  sponsorEmail: string;
  fashionExperience: string;
  heardFrom: string;
  applicationStatus: string;
  submittedAt: string;
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  pages: number;
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:  { bg: "#fff8e1", color: "#f59e0b" },
  approved: { bg: "#e8f5e9", color: "#22c55e" },
  rejected: { bg: "#fce4ec", color: "#ef4444" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status.toLowerCase()] ?? { bg: "#f0f0f0", color: "#888" };
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      borderRadius: "999px",
      padding: "3px 14px",
      fontSize: "0.82rem",
      fontWeight: 600,
      textTransform: "capitalize",
      display: "inline-block",
    }}>
      {status}
    </span>
  );
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i}>
          <div style={{
            height: 14,
            borderRadius: 6,
            background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "adm-shimmer 1.4s infinite",
            width: i === 0 ? "40%" : "70%",
          }} />
        </td>
      ))}
    </tr>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{
      display: "flex",
      gap: "0.75rem",
      padding: "0.6rem 0",
      borderBottom: "1px solid var(--color-primary-200)",
    }}>
      <span style={{
        minWidth: 180,
        fontWeight: 600,
        fontSize: "0.8rem",
        color: "#999",
        flexShrink: 0,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
      }}>
        {label}
      </span>
      <span style={{ fontSize: "0.9rem", color: "var(--color-black)", wordBreak: "break-word" }}>
        {value || "—"}
      </span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      margin: "1.4rem 0 0.4rem",
      fontSize: "0.72rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "#bbb",
    }}>
      {children}
    </p>
  );
}

function ApplicationModal({
  application,
  onClose,
  onStatusChange,
  onDelete,
}: {
  application: Application;
  onClose: () => void;
  onStatusChange: (id: string, status: "approved" | "rejected") => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [localStatus, setLocalStatus] = useState(application.applicationStatus);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleStatus = async (status: "approved" | "rejected") => {
    setActionLoading(status);
    await onStatusChange(application._id, status);
    setLocalStatus(status);
    setActionLoading(null);
  };

  const handleDelete = async () => {
    setActionLoading("delete");
    await onDelete(application._id);
    setActionLoading(null);
    onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backdropFilter: "blur(3px)",
      }}
    >
      <div style={{
        background: "#fff",
        borderRadius: 16,
        width: "100%",
        maxWidth: 660,
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 12px 48px rgba(0,0,0,0.2)",
        overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "1.3rem 1.5rem 1.1rem",
          borderBottom: "1px solid var(--color-primary-200)",
          flexShrink: 0,
          gap: "1rem",
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--color-black)" }}>
              {application.firstName} {application.otherName} {application.surname}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.35rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.82rem", color: "#aaa" }}>
                Token: <span style={{ fontFamily: "monospace", color: "#6366f1", fontWeight: 600 }}>{application.token}</span>
              </span>
              <span style={{ color: "#ddd" }}>·</span>
              <StatusBadge status={localStatus} />
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f3f4f6",
              border: "none",
              borderRadius: 8,
              width: 34,
              height: 34,
              fontSize: "1rem",
              cursor: "pointer",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: "auto", padding: "0 1.5rem 1.2rem", flex: 1 }}>

          <SectionHeading>Personal Information</SectionHeading>
          <DetailRow label="Gender" value={application.gender} />
          <DetailRow label="Date of Birth" value={`${application.dateOfBirthD} / ${application.dateOfBirthM} / ${application.dateOfBirthY}`} />
          <DetailRow label="Place of Birth" value={application.placeOfBirth} />
          <DetailRow label="Nationality" value={application.nationality} />
          <DetailRow label="Marital Status" value={application.maritalStatus} />
          <DetailRow label="ID Card Number" value={application.idCardNumber} />
          <DetailRow label="Foreigner in Ghana" value={application.isForeignerInGhana} />

          <SectionHeading>Contact Details</SectionHeading>
          <DetailRow label="Email" value={application.email} />
          <DetailRow label="Telephone" value={application.telephone} />
          <DetailRow label="Permanent Address" value={application.permanentAddress} />

          <SectionHeading>Academic Information</SectionHeading>
          <DetailRow label="Program" value={application.program} />
          <DetailRow label="Previous College" value={application.previousCollege} />
          <DetailRow label="Year of Completion" value={application.yearOfCompletion} />
          <DetailRow label="Certificate Type" value={application.certificateType} />
          <DetailRow label="Fashion Experience" value={application.fashionExperience} />

          <SectionHeading>Sponsor Information</SectionHeading>
          <DetailRow label="Sponsor Full Name" value={application.sponsorFullName} />
          <DetailRow label="Relationship" value={application.sponsorRelationship} />
          <DetailRow label="Occupation" value={application.sponsorOccupation} />
          <DetailRow label="Mobile" value={application.sponsorMobile} />
          <DetailRow label="Email" value={application.sponsorEmail} />

          <SectionHeading>Application Details</SectionHeading>
          <DetailRow label="Heard From" value={application.heardFrom} />
          <DetailRow label="Payment Email" value={application.paymentId?.email} />
          <DetailRow label="Submitted At" value={new Date(application.submittedAt).toLocaleString("en-GB")} />

        </div>

        {/* Footer actions */}
        <div style={{
          padding: "1rem 1.5rem",
          borderTop: "1px solid var(--color-primary-200)",
          background: "#fafafa",
          flexShrink: 0,
        }}>
          {!confirmDelete ? (
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>

              {/* Approve */}
              <button
                onClick={() => handleStatus("approved")}
                disabled={!!actionLoading || localStatus === "approved"}
                style={{
                  background: localStatus === "approved" ? "#e8f5e9" : "#22c55e",
                  color: localStatus === "approved" ? "#22c55e" : "#fff",
                  border: "1px solid #22c55e",
                  borderRadius: 8,
                  padding: "7px 18px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: (actionLoading || localStatus === "approved") ? "not-allowed" : "pointer",
                  opacity: (actionLoading || localStatus === "approved") ? 0.6 : 1,
                  transition: "all 0.15s",
                }}
              >
                {actionLoading === "approved" ? "Approving…" : "✓ Approve"}
              </button>

              {/* Reject */}
              <button
                onClick={() => handleStatus("rejected")}
                disabled={!!actionLoading || localStatus === "rejected"}
                style={{
                  background: localStatus === "rejected" ? "#fce4ec" : "#fff",
                  color: "#ef4444",
                  border: "1px solid #ef4444",
                  borderRadius: 8,
                  padding: "7px 18px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: (actionLoading || localStatus === "rejected") ? "not-allowed" : "pointer",
                  opacity: (actionLoading || localStatus === "rejected") ? 0.6 : 1,
                  transition: "all 0.15s",
                }}
              >
                {actionLoading === "rejected" ? "Rejecting…" : "✕ Reject"}
              </button>

              {/* Delete — pushed to the right */}
              <button
                onClick={() => setConfirmDelete(true)}
                disabled={!!actionLoading}
                style={{
                  marginLeft: "auto",
                  background: "none",
                  color: "#bbb",
                  border: "1px solid #e5e5e5",
                  borderRadius: 8,
                  padding: "7px 18px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                🗑 Delete
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.88rem", color: "#ef4444", fontWeight: 600 }}>
                Delete this application permanently?
              </span>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{
                  marginLeft: "auto",
                  background: "#f3f4f6",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 18px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={actionLoading === "delete"}
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 18px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  opacity: actionLoading === "delete" ? 0.6 : 1,
                }}
              >
                {actionLoading === "delete" ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdmissionsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [yearFilter, setYearFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus>("all");
  const [search, setSearch] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const fetchApplications = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL, { params: { page: p, limit: 10 } });
      const { data, pagination: pg } = res.data;
      setApplications(Array.isArray(data) ? data : []);
      setPagination(pg);
    } catch {
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications(page);
  }, [page, fetchApplications]);

  const handleStatusChange = async (id: string, status: "approved" | "rejected") => {
    try {
      await axios.patch(`${API_URL}${id}`, { applicationStatus: status });
      // Update both the list and the open modal's data
      setApplications(prev =>
        prev.map(a => a._id === id ? { ...a, applicationStatus: status } : a)
      );
    } catch {
      alert("Failed to update status. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      setApplications(prev => prev.filter(a => a._id !== id));
      setPagination(prev => ({ ...prev, total: prev.total - 1 }));
    } catch {
      alert("Failed to delete application. Please try again.");
    }
  };

  const filtered = applications.filter((a) => {
    const appYear = new Date(a.createdAt).getFullYear().toString();
    if (yearFilter !== "All" && appYear !== yearFilter) return false;
    if (statusFilter !== "all" && a.applicationStatus.toLowerCase() !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const fullName = `${a.firstName} ${a.surname}`.toLowerCase();
      if (!fullName.includes(q) && !a.email.toLowerCase().includes(q) && !a.token.includes(q)) return false;
    }
    return true;
  });

  return (
    <>
      <style>{`
        @keyframes adm-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Details Modal */}
      {selectedApplication && (
        <ApplicationModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}

      {/* Filters */}
      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>Search:</span>
        <input
          className={styles.filterSelect}
          placeholder="Name, email, or token…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ minWidth: 220 }}
        />
        <span className={styles.filterLabel}>Year:</span>
        <select
          className={styles.filterSelect}
          value={yearFilter}
          onChange={e => setYearFilter(e.target.value)}
        >
          {years.map(y => <option key={y}>{y}</option>)}
        </select>
        <span className={styles.filterLabel}>Status:</span>
        <select
          className={styles.filterSelect}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as ApplicationStatus)}
        >
          {(["all", "pending", "approved", "rejected"] as ApplicationStatus[]).map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <span style={{ marginLeft: "auto", fontSize: "0.85rem", color: "var(--color-black)", opacity: 0.5 }}>
          {loading ? "Loading…" : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Program</th>
            <th>Token</th>
            <th>Status</th>
            <th>Submitted</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          ) : error ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", color: "#ef4444", padding: "2rem" }}>
                {error}&nbsp;
                <button
                  onClick={() => fetchApplications(page)}
                  style={{
                    background: "none",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    borderRadius: 6,
                    padding: "4px 12px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  Retry
                </button>
              </td>
            </tr>
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: "2.5rem", opacity: 0.4 }}>
                No applications found.
              </td>
            </tr>
          ) : (
            filtered.map((a, idx) => (
              <tr key={a._id}>
                <td style={{ opacity: 0.4, fontSize: "0.85rem" }}>{(page - 1) * 10 + idx + 1}</td>
                <td style={{ fontWeight: 600 }}>{a.firstName} {a.surname}</td>
                <td>{a.telephone}</td>
                <td style={{ textTransform: "capitalize" }}>{a.program}</td>
                <td style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>{a.token}</td>
                <td><StatusBadge status={a.applicationStatus} /></td>
                <td style={{ whiteSpace: "nowrap", opacity: 0.6 }}>
                  {new Date(a.submittedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => setSelectedApplication(a)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {!loading && !error && pagination.pages > 1 && (
        <div className={styles.filterRow} style={{ marginTop: "1.2rem", marginBottom: 0 }}>
          <span style={{ fontSize: "0.85rem", opacity: 0.5 }}>
            Page {pagination.page} of {pagination.pages} · {pagination.total} total
          </span>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
            <button
              className={styles.filterSelect}
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              style={{ cursor: page <= 1 ? "not-allowed" : "pointer", opacity: page <= 1 ? 0.4 : 1 }}
            >
              ← Prev
            </button>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
              .filter(p => Math.abs(p - page) <= 2)
              .map(p => (
                <button
                  key={p}
                  className={styles.filterSelect}
                  onClick={() => setPage(p)}
                  style={{
                    cursor: "pointer",
                    background: p === page ? "var(--color-primary-50)" : undefined,
                    fontWeight: p === page ? 700 : 400,
                    borderColor: p === page ? "var(--color-primary-200)" : undefined,
                  }}
                >
                  {p}
                </button>
              ))}
            <button
              className={styles.filterSelect}
              disabled={page >= pagination.pages}
              onClick={() => setPage(p => p + 1)}
              style={{
                cursor: page >= pagination.pages ? "not-allowed" : "pointer",
                opacity: page >= pagination.pages ? 0.4 : 1,
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
}