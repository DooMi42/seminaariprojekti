import ContactForm from "@/components/ContactForm";

/**
 * ContactPage shows the Finnish heading, short intro and contact form.
 */
export default function ContactPage() {
  return (
    <main className="w-full max-w-3xl space-y-6 rounded-2xl bg-white/90 p-10 text-slate-900 shadow-sm">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Ota yhteyttä tiimiimme
        </h1>
        <p className="text-base text-slate-600">
          Kerro lyhyesti asiasi, niin palaamme sinulle mahdollisimman pian.
        </p>
      </div>
      <ContactForm />
    </main>
  );
}

