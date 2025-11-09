export const GA_ID = "G-8VN6NBHB2E"; // same ID

export const pageview = (url: string) => {
  if (typeof window === "undefined") return;
  (window as Window & typeof globalThis & { gtag: any }).gtag("config", GA_ID, {
    page_path: url,
  });
};
