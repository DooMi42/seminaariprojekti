"use client";

import { ChangeEvent, FormEvent, ReactNode, useState } from "react";

type ContactType = "" | "Yleinen kysymys" | "Palaute" | "Bugi-ilmoitus";

type FormFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: ContactType;
  accepted: boolean;
  company: string;
};

type ValidationErrors = Partial<Record<keyof FormFields, string>>;

type FormState = {
  fields: FormFields;
  errors: ValidationErrors;
};

type StatusMessage =
  | {
      type: "success" | "error";
      message: string;
    }
  | null;

const createInitialFields = (): FormFields => ({
  name: "",
  email: "",
  subject: "",
  message: "",
  type: "",
  accepted: false,
  company: "",
});

const createInitialState = (): FormState => ({
  fields: createInitialFields(),
  errors: {},
});

/**
 * ContactForm renders a validated contact form with basic UX enhancements.
 */
export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>(() => createInitialState());
  const [status, setStatus] = useState<StatusMessage>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField =
    (field: keyof FormState["fields"]) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormState((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          [field]: event.target.type === "checkbox" ? (event.target as HTMLInputElement).checked : event.target.value,
        },
        errors: {
          ...prev.errors,
          [field]: "",
        },
      }));
      setStatus(null);
    };

  const validate = (): boolean => {
    const { fields } = formState;
    const nextErrors: ValidationErrors = {};

    if (!fields.name.trim()) nextErrors.name = "Nimi on pakollinen.";
    if (!fields.email.trim()) {
      nextErrors.email = "Sähköposti on pakollinen.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      nextErrors.email = "Sähköpostiosoite ei kelpaa.";
    }
    if (!fields.subject.trim()) nextErrors.subject = "Aihe on pakollinen.";
    if (!fields.message.trim()) nextErrors.message = "Viesti on pakollinen.";
    if (!fields.type) nextErrors.type = "Valitse yhteydenoton tyyppi.";
    if (!fields.accepted) nextErrors.accepted = "Hyväksythän tietojen käsittelyn.";
    if (fields.company.trim()) nextErrors.company = "Älä täytä tätä kenttää.";

    setFormState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        ...nextErrors,
      },
    }));

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const isValid = validate();
    if (!isValid) {
      setStatus({ type: "error", message: "Tarkista korostetut kentät." });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState.fields),
      });

      if (!response.ok) {
        throw new Error("Palvelin palautti virheen");
      }

      setStatus({
        type: "success",
        message: "Kiitos viestistäsi! Palaamme pian asiaan.",
      });
      setFormState(createInitialState());
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus({
        type: "error",
        message: "Lähetys epäonnistui. Yritäthän uudelleen hetken kuluttua.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (field: keyof ValidationErrors) =>
    formState.errors[field] ? (
      <p className="text-sm text-red-600">{formState.errors[field]}</p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-slate-200 bg-white/90 p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="Nimi"
          htmlFor="name"
          error={fieldError("name")}
          input={
            <input
              id="name"
              name="name"
              type="text"
              value={formState.fields.name}
              onChange={updateField("name")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
              placeholder="Etunimi ja sukunimi"
            />
          }
        />
        <FormField
          label="Sähköposti"
          htmlFor="email"
          error={fieldError("email")}
          input={
            <input
              id="email"
              name="email"
              type="email"
              value={formState.fields.email}
              onChange={updateField("email")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
              placeholder="nimi@esimerkki.fi"
            />
          }
        />
        <FormField
          label="Yhteydenoton tyyppi"
          htmlFor="type"
          error={fieldError("type")}
          input={
            <select
              id="type"
              name="type"
              value={formState.fields.type}
              onChange={updateField("type")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
            >
              <option value="">Valitse</option>
              <option value="Yleinen kysymys">Yleinen kysymys</option>
              <option value="Palaute">Palaute</option>
              <option value="Bugi-ilmoitus">Bugi-ilmoitus</option>
            </select>
          }
        />
        <FormField
          label="Aihe"
          htmlFor="subject"
          error={fieldError("subject")}
          input={
            <input
              id="subject"
              name="subject"
              type="text"
              value={formState.fields.subject}
              onChange={updateField("subject")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
              placeholder="Lyhyt kuvaus aiheesta"
            />
          }
        />
      </div>

      <FormField
        label="Viesti"
        htmlFor="message"
        error={fieldError("message")}
        input={
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formState.fields.message}
            onChange={updateField("message")}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
            placeholder="Kerro lyhyesti miten voimme auttaa."
          />
        }
      />

      <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50/60 px-4 py-3">
        <label className="inline-flex items-center gap-3 text-sm text-slate-700">
          <span className="relative inline-flex items-center">
            <input
              type="checkbox"
              name="accepted"
              checked={formState.fields.accepted}
              onChange={updateField("accepted")}
              className="peer h-5 w-5 appearance-none rounded border border-slate-300 bg-white transition-colors checked:border-slate-900 checked:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            />
            <svg
              viewBox="0 0 20 20"
              className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
              aria-hidden="true"
            >
              <path
                d="M5 10l3 3 7-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>Hyväksyn tietojeni käsittelyn tämän lomakkeen perusteella.</span>
        </label>
        {fieldError("accepted")}
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company">Yritys</label>
        <input
          id="company"
          name="company"
          type="text"
          value={formState.fields.company}
          onChange={updateField("company")}
          tabIndex={-1}
          autoComplete="off"
        />
        {fieldError("company")}
      </div>

      {status && (
        <p
          className={`text-sm ${
            status.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-700"
      >
        {isSubmitting ? "Lähetetään..." : "Lähetä viesti"}
      </button>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  htmlFor: string;
  input: ReactNode;
  error?: ReactNode | null;
};

function FormField({ label, htmlFor, input, error }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-800"
      >
        {label}
      </label>
      {input}
      {error}
    </div>
  );
}

