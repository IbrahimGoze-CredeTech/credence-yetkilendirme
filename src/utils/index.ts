import { Yetki } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isYetkiArray = (data: any): data is Yetki[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item.yetkiId === "number" &&
        typeof item.yetkiAdi === "string" &&
        (typeof item.siniflandirma === "string" || item.siniflandirma === null) // Allow `null` for siniflandirma if needed
    )
  );
};
