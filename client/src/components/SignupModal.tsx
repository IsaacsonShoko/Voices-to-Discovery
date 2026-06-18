import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { JoinPayload, RequestResult } from "../types";

const audienceOptions = [
  "Community member",
  "Patient",
  "Researcher",
  "Doctor",
  "Student",
  "Policymaker",
  "Philanthropist",
  "Funder",
  "Healthcare Professional",
  "Other",
];

type Props = {
  isOpen: boolean;
  initialAudienceType?: string;
  onClose: () => void;
  onSubmit: (payload: JoinPayload) => Promise<RequestResult>;
};

type StatusState = {
  kind: "idle" | "success" | "error";
  message: string;
};

export default function SignupModal({ isOpen, initialAudienceType = "", onClose, onSubmit }: Props) {
  const [form, setForm] = useState<JoinPayload>({
    name: "",
    email: "",
    audience_type: "",
    country: "",
    organisation: "",
  });
  const [status, setStatus] = useState<StatusState>({ kind: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pageUrl = useMemo(() => (typeof window === "undefined" ? "#" : window.location.href), []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm({
      name: "",
      email: "",
      audience_type: initialAudienceType,
      country: "",
      organisation: "",
    });
    setStatus({ kind: "idle", message: "" });
  }, [initialAudienceType, isOpen]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await onSubmit(form);
      setStatus({ kind: "success", message: response.message });
      setForm((current) => ({ ...current, name: "", email: "", country: "", organisation: "" }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit the form right now.";
      setStatus({ kind: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="signup-modal-title">
      <div className="modal-card">
        <button className="modal-close" type="button" onClick={onClose}>
          Close
        </button>

        {status.kind === "success" ? (
          <div className="status-panel success-panel">
            <div className="success-check" aria-hidden="true">
              ✓
            </div>
            <h3 id="signup-modal-title">Welcome to the movement.</h3>
            <p>{status.message}</p>
            <a className="button button-primary" href={pageUrl}>
              Share this page
            </a>
          </div>
        ) : (
          <form className="form-stack" onSubmit={handleSubmit}>
            <div>
              <p className="eyebrow">Join The Movement</p>
              <h3 id="signup-modal-title">Register your interest and we will follow up.</h3>
            </div>

            <label>
              Full name
              <input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
            </label>

            <label>
              Email address
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
            </label>

            <label>
              Audience type
              {initialAudienceType ? (
                <input value={form.audience_type} readOnly />
              ) : (
                <select
                  value={form.audience_type}
                  onChange={(event) => setForm((current) => ({ ...current, audience_type: event.target.value }))}
                >
                  <option value="">Select an audience</option>
                  {audienceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </label>

            <label>
              Country
              <input value={form.country} onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))} />
            </label>

            <label>
              Organisation or Institution
              <input
                value={form.organisation}
                onChange={(event) => setForm((current) => ({ ...current, organisation: event.target.value }))}
              />
            </label>

            {status.kind === "error" && <p className="form-message error-message">{status.message}</p>}

            <button className="button button-primary" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
