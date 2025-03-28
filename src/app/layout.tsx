import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import BottomNav from "@/components/BottomNav";
import { CaseProvider } from "@/context/CaseContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JusticeNow",
  description: "Legal assistant for pro se litigants",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <CaseProvider>
            <main className="min-h-screen pb-24"> {/* leave space for bottom nav */}
              {children}
            </main>
          </CaseProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
