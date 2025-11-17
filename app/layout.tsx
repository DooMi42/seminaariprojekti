import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seminaarityö: Yhteydenottolomake",
  description: "Seminaarityön yhteydenottolomakeen etusivu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
