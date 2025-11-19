import { promises as fs } from 'fs';
import path from 'path';

/**
 * ContactMessage represents a single contact form submission.
 */
interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
  accepted?: boolean;
  company?: string;
}

/**
 * Formats an ISO date string to a Finnish locale date-time string.
 */
function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('fi-FI', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return isoString;
  }
}

/**
 * Reads contact messages from the JSON file.
 * Returns an empty array if the file doesn't exist or contains invalid JSON.
 */
async function readMessages(): Promise<ContactMessage[]> {
  const filePath = path.join(process.cwd(), 'data', 'contact-messages.json');

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(data);

    if (Array.isArray(parsed)) {
      return parsed as ContactMessage[];
    }

    return [];
  } catch (error) {
    // File doesn't exist or JSON is invalid
    if (error instanceof Error) {
      console.error('Failed to read contact messages:', error.message);
    }
    return [];
  }
}

/**
 * AdminPage displays all contact messages in a read-only table view.
 */
export default async function AdminPage() {
  const messages = await readMessages();

  return (
    <main className="w-full max-w-6xl space-y-6 rounded-2xl bg-white/90 p-10 text-slate-900 shadow-sm">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Viestiloki (admin-näkymä)
        </h1>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-8 text-center">
          <p className="text-slate-600">Ei tallennettuja viestejä.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Päivämäärä
                </th>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Nimi
                </th>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Sähköposti
                </th>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Tyyppi
                </th>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Aihe
                </th>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Viesti
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr
                  key={message.id}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50/50"
                >
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {formatDate(message.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">
                    {message.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <a
                      href={`mailto:${message.email}`}
                      className="text-slate-900 underline hover:text-slate-700"
                    >
                      {message.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {message.type}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {message.subject}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    <div className="max-w-md whitespace-pre-wrap break-words">
                      {message.message}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

