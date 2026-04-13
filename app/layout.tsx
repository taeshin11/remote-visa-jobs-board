import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RemoteVisaJobsBoard — Remote Jobs with Visa Sponsorship",
  description: "Find remote jobs with visa sponsorship. Filter by country, role, and visa type. H1B, Skilled Worker, Blue Card and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#f5f3ff] text-[#1e1b4b]">{children}</body>
    </html>
  );
}
