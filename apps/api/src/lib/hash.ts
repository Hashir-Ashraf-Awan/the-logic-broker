import { createHash } from 'node:crypto';

/** SHA-256 hash; used for lightly anonymising IPs in audit/contact rows. */
export function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}
