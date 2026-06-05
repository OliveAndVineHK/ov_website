import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounting",
  description:
    "Professional accounting services by Olive & Vine — bookkeeping, financial reporting, and Xero advisory for businesses in Hong Kong.",
  alternates: { canonical: "/accounting-service" },
};

export default function AccountingServiceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
