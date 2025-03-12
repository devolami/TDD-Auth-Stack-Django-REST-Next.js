import { Be_Vietnam_Pro } from "next/font/google";
import Provider from "@/redux/Provider";
import { Setup } from "@/client/auth/utils";
import '../globals.css'
import React from "react";

const ProjectFont = Be_Vietnam_Pro({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ overflowX: "hidden" }} className={ProjectFont.className}>
        <Provider>
          <Setup />
          {children}
        </Provider>
      </body>
    </html>
  );
}
