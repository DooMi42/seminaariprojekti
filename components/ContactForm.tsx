 "use client";

import { FormEvent } from "react";

/**
 * ContactForm renders a minimal contact form with Finnish labels.
 * It keeps styling neutral to match the application's tone.
 */
export default function ContactForm() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-slate-200 bg-white/90 p-6 shadow-sm"
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-800">
                    Nimi
                </label>
        <input
                    id="name"
                    name="name"
                    type="text"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                    placeholder="Etunimi ja sukunimi"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-800">
                    Sähköposti
                </label>
        <input
                    id="email"
                    name="email"
                    type="email"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                    placeholder="nimi@esimerkki.fi"
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-800">
                    Viesti
                </label>
        <textarea
                    id="message"
                    name="message"
                    rows={4}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                    placeholder="Kerro lyhyesti miten voimme auttaa."
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
                Lähetä viesti
            </button>
        </form>
    );
}

