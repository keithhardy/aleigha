export type PageDetails = {
  metadata: {
    title: string;
  };
  header: string;
  description?: string;
  backLink?: {
    text: string;
    href: string;
  };
  callToAction?: {
    text: string;
    href: string;
  };
};
