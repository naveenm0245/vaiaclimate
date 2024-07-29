import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import pdfParse from "pdf-parse";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export const generateSlug = (text: string) => {
  return text
    .toString() // Convert to string
    .normalize("NFD") // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove remaining accents
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+/, "") // Trim starting hyphen
    .replace(/-+$/, ""); // Trim ending hyphen
};

// export const parsePDF = async (pdfBuffer: Buffer): Promise<string> => {
//   const data = await pdfParse(pdfBuffer);
//   return data.text;
// };