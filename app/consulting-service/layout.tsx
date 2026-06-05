import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Strategic consulting services from Olive & Vine — digital transformation, AI automation, big data analytics, and M&A advisory in Hong Kong.",
  alternates: { canonical: "/consulting-service" },
};

export default function ConsultingServiceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
