import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Freelance Marketplace",
  description: "Find and hire talented freelancers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
