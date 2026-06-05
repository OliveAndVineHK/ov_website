import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR",
  description:
    "HR and payroll services by Olive & Vine — MPF administration, leave policy compliance, IR56 filing, and employment regulation advisory in Hong Kong.",
  alternates: { canonical: "/hr-service" },
};

export default function HrServiceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
