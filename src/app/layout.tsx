import type { Metadata } from "next";
import { Inclusive_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { StreamVideoProvider } from "./providers/StreamVideoProvider";
import NavBar from "@/app/components/Navbar"; // Adjust path accordingly

const inter = Inclusive_Sans({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "FaceTime",
  description: "A video conferencing app for everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <StreamVideoProvider>
            <NavBar />
            <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
          </StreamVideoProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
