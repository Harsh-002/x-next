import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileHeader from "@/components/layout/MobileHeader";
import SideNavbar from "@/components/layout/SideNavbar";
import Toolbar from "@/components/layout/Toolbar";
import RightSidebar from "@/components/layout/RightSidebar";
import Providers from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X-Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="mx-0 lg:max-w-full flex flex-col bg-white min-h-screen">
            <MobileHeader />
            <div className="flex flex-1 md:h-screen w-full">
              <SideNavbar />
              <main className="mt-14 w-full overflow-y-auto border-r border-gray-200 pb-16 md:mt-0 md:w-2/3 md:pb-0 xl:w-3/5">
                {children}
              </main>
              <RightSidebar />
            </div>
            <Toolbar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
