import { clsx, type ClassValue } from "clsx"
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
  if (!event.target.files || event.target.files.length === 0) {
    return { files: null, displayUrl: "" };
  }

  const dataTransfer = new DataTransfer();
  Array.from(event.target.files).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files[0]);

  return { files, displayUrl };
}