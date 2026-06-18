import { useState, type FormEvent } from "react";
import type { JoinPayload, RequestResult } from "../types";

type Props = {
  onNewsletterSubmit: (payload: JoinPayload) => Promise<RequestResult>;
};

type StatusState = {
  kind: "idle" | "success" | "error";
  message: string;
};

export default function Footer({ onNewsletterSubmit }: Props) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<StatusState>({ kind: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await onNewsletterSubmit({
        name: form.name,
        email: form.email,
        audience_type: "Newsletter",
        country: "",
        organisation: "",
      });

      setStatus({ kind: "success", message: response.message });
      setForm({ name: "", email: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to subscribe right now.";
      setStatus({ kind: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <footer className="site-footer">
      <div className="section-inner footer-grid">
        <div>
          <h3>About the movement</h3>
          <p>
            From Voices to Discovery is a movement powered by Afromics to build belief, participation and
            shared ownership in the future of representative medicine.
          </p>
        </div>

        <div>
          <h3>Quick links</h3>
          <div className="footer-links">
            <a href="#movement">The Movement</a>
            <a href="#stories">Stories</a>
            <a href="#project">The Project</a>
            <a href="#join">Join</a>
            <a href="#declaration">Sign The Declaration</a>
            <a href="/why-representation-matters">Why Representation Matters</a>
          </div>
        </div>

        <div>
          <h3>Stay connected</h3>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
            </label>
            {status.kind !== "idle" && (
              <p className={status.kind === "success" ? "form-message success-message" : "form-message error-message"}>{status.message}</p>
            )}
            <button className="button button-primary" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting..." : "Stay In The Loop"}
            </button>
          </form>
        </div>
      </div>
      <div className="footer-bar">From Voices to Discovery is a movement powered by Afromics.</div>
    </footer>
  );
}
