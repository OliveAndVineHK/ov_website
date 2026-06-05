import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax",
  description:
    "Expert tax services by Olive & Vine — corporate tax filing, VAT advisory, dividend planning, and tax compliance for Hong Kong businesses.",
  alternates: { canonical: "/tax-service" },
};

export default function TaxServiceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
