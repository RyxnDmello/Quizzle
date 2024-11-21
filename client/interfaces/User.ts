export type USER = "CREATOR" | "ATTENDEE";

export default interface User {
  type?: USER;
  id?: string;
  name?: string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
}
