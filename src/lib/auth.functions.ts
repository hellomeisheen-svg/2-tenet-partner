import { createServerFn } from '@tanstack/react-start';
import { getSession } from './auth.server';
import { getWebRequest } from '@tanstack/react-start/server';

export const getAuthSession = createServerFn({ method: 'GET' })
  .handler(async () => {
    const request = getWebRequest();
    if (!request) return null;
    return getSession(request);
  });
