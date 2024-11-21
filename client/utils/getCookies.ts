import Cookies from "js-cookie";

import User from "@interfaces/User";

import { encrypt, decrypt } from "./getEncryption";

const { get, set, remove } = Cookies;

const _ENCRYPTION_NAME = process.env.NEXT_PUBLIC_ENCRYPTION_NAME!;

export const getCookie = (): User | null => {
  const encryption = get(_ENCRYPTION_NAME);
  return encryption ? decrypt(encryption) : null;
};

export const setCookie = (credentials: User) => {
  const encryption = encrypt(credentials);

  set(_ENCRYPTION_NAME, encryption, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    expires: 30,
    path: "/",
  });
};

export const removeCookie = () => {
  remove(_ENCRYPTION_NAME, {
    path: "/",
  });
};

export const isAuthenticated = () => getCookie() !== null;
