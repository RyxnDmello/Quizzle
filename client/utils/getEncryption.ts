import { AES, format, enc } from "crypto-js";

import User from "@interfaces/User";

const _ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;

export const encrypt = (credentials: User): string => {
  const encryption = AES.encrypt(JSON.stringify(credentials), _ENCRYPTION_KEY);
  return encryption.toString(format.OpenSSL);
};

export const decrypt = (data: string): User | null => {
  try {
    const decryption = AES.decrypt(data, _ENCRYPTION_KEY);
    return JSON.parse(decryption.toString(enc.Utf8));
  } catch (error) {
    return null;
  }
};
