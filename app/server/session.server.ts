import { createCookieSessionStorage, type Session } from '@remix-run/node';

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({ 
    cookie: { 
      sameSite: "lax",
      secrets: ["s3cret1"], 
      name: '_mail_tracker_session', 
    } 
  });

export const serverSession = { 
  getSession(req: Request) {
    return getSession(req.headers.get('Cookie'));
  },

  async commitSession(session: Session) {
    return {
      'Set-Cookie': await commitSession(session),
    };
  },

  destroySession 
};
