import { DateTime } from "luxon";

export const getFormattedDate = (date: string) => {
  return DateTime.fromISO(date).toFormat("dd/MM/yyyy");
};
