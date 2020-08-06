import { Buffer } from 'buffer';

import { LoginMeta } from 'types/store/LoginState';

function encodeBase64(str: string) {
  return Buffer.from(str).toString('base64');
}

export function createBasicToken(credentials: LoginMeta): string {
  return `Basic ${encodeBase64(
    `${credentials.email}:${credentials.password}`
  )}`;
}
