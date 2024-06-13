import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import AuthProvider from "./components/AuthProvider";
import ActiveStatus from "./components/ActiveStatus";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatly - Chocolatey Chat",
  description: "Chat with friends and family",
  icons: {
    icon: '/favicon.ico', // /public path
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <ToasterContext/>
          <ActiveStatus />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
