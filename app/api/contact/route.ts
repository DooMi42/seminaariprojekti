import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  type?: unknown;
  accepted?: unknown;
  company?: unknown;
};

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'contact-messages.json');

function methodNotAllowed() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

async function readMessagesFile() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // intentional no-op, will recreate file below
  }
  return [];
}

async function writeMessagesFile(messages: unknown[]) {
  await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(messages, null, 2), 'utf-8');
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return badRequest('Pyynnön runko puuttuu tai on virheellinen.');
  }

  const name = isNonEmptyString(payload.name) ? payload.name.trim() : null;
  if (!name) {
    return badRequest('Nimi on pakollinen.');
  }

  const email = isNonEmptyString(payload.email) ? payload.email.trim() : null;
  if (!email) {
    return badRequest('Sähköposti on pakollinen.');
  }

  const subject = isNonEmptyString(payload.subject) ? payload.subject.trim() : null;
  if (!subject) {
    return badRequest('Aihe on pakollinen.');
  }

  const message = isNonEmptyString(payload.message) ? payload.message.trim() : null;
  if (!message) {
    return badRequest('Viesti on pakollinen.');
  }

  const type = isNonEmptyString(payload.type) ? payload.type.trim() : null;
  if (!type) {
    return badRequest('Viestiin liittyvä tyyppi on pakollinen.');
  }

  if (payload.accepted !== true) {
    return badRequest('Tietosuojan hyväksyntä on pakollinen.');
  }

  const company = typeof payload.company === 'string' ? payload.company.trim() : '';
  if (company.length > 0) {
    return badRequest('Lomake hylätty (epäilty roskaposti).');
  }

  const newMessage = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    email,
    subject,
    message,
    type,
    accepted: true,
    company: '',
  };

  try {
    const messages = await readMessagesFile();
    messages.push(newMessage);
    await writeMessagesFile(messages);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Failed to store contact message', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;

