import { Magic } from "magic-sdk";

const createMagic = () => {
  const key = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY!;
  if (typeof window !== "undefined") {
    return new Magic(key);
  }
};

export const magic = createMagic();
