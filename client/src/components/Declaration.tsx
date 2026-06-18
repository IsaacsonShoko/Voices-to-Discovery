import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "../api";
import { useScrollReveal } from "../hooks/useScrollReveal";
import type { RequestResult, SignatoryPayload } from "../types";

const roleOptions = ["Community member", "Patient", "Researcher", "Doctor", "Student", "Policymaker", "Philanthropist", "Other"];

type StatusState = {
  kind: "idle" | "success" | "error";
  message: string;
};

export default function Declaration() {
  const reveal = useScrollReveal();
  const [count, setCount] = useState<number | null>(null);
  const [countError, setCountError] = useState("");
  const [form, setForm] = useState<SignatoryPayload>({
    name: "",
    email: "",
    country: "",
    role: roleOptions[0],
  });
  const [status, setStatus] = useState<StatusState>({ kind: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadCount() {
      try {
        const response = await apiRequest<{ count: number }>("/api/signatories/count");
        setCount(response.count);
        setCountError("");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to load the declaration count.";
        setCount(null);
        setCountError(message);
      }
    }

    void loadCount();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiRequest<RequestResult & { count: number }>("/api/signatories", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setCount(response.count);
      setStatus({ kind: "success", message: `${form.name}, your voice has been added.` });
      setForm({
        name: "",
        email: "",
        country: "",
        role: roleOptions[0],
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit the declaration.";
      setStatus({ kind: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.section {...reveal} className="section declaration-section" id="declaration">
      <div className="declaration-rule" aria-hidden="true" />
      <div className="section-inner narrow-stack centered-stack">
        <p className="eyebrow">The From Voices To Discovery Declaration</p>
        <div className="declaration-copy">
          <p>We believe:</p>
          <p>Every voice matters.</p>
          <p>Every community deserves representation.</p>
          <p>Every discovery should benefit humanity.</p>
          <p>Science should be inclusive.</p>
          <p>Innovation should be ethical.</p>
          <p>Communities should share in the value they create.</p>
          <p>The future of medicine should belong to everyone.</p>
          <p>We commit to building that future together.</p>
        </div>

        <p className="counter-line">
          {count === null ? "Loading the declaration count..." : `${count.toLocaleString()} voices have signed this declaration.`}
        </p>
        {countError && <p className="small-note centered">{countError}</p>}

        <form className="declaration-form" onSubmit={handleSubmit}>
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
            Country
            <input value={form.country} onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))} />
          </label>
          <label>
            I am a
            <select value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>

          {status.kind !== "idle" && (
            <p className={status.kind === "success" ? "form-message success-message" : "form-message error-message"}>{status.message}</p>
          )}

          <button className="button button-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Sign The Declaration"}
          </button>
        </form>
      </div>
    </motion.section>
  );
}
