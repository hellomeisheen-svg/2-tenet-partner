import bcrypt from 'bcryptjs';
import * as cookie from 'cookie';
import { query } from './db.server';

const SESSION_COOKIE_NAME = 'tenet_admin_session';

export interface SessionData {
  userId: string;
  email: string;
  expires: number;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function createSessionCookie(session: SessionData) {
  const value = Buffer.from(JSON.stringify(session)).toString('base64');
  
  return cookie.stringifySetCookie({
    name: SESSION_COOKIE_NAME,
    value,
    httpOnly: true,
    secure: process.env['NODE_ENV'] === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 12 * 60 * 60, // 12 hours in seconds
  });
}

export function getSession(request: Request): SessionData | null {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;

  const cookies = cookie.parseCookie(cookieHeader);
  const sessionValue = cookies[SESSION_COOKIE_NAME];
  if (!sessionValue) return null;

  try {
    const session = JSON.parse(Buffer.from(sessionValue, 'base64').toString('utf-8')) as SessionData;
    if (Date.now() > session.expires) {
      return null;
    }
    return session;
  } catch (e) {
    return null;
  }
}

export function destroySessionCookie() {
  return cookie.stringifySetCookie({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env['NODE_ENV'] === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function requireAdmin(request: Request) {
  const session = getSession(request);
  if (!session) {
    throw new Response('Unauthorized', { status: 401 });
  }
  return session;
}
