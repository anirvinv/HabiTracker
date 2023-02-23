import "./globals.css";
import Sidebar from "./sidebar";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className="bg-gray-100">
        <div className="flex h-screen w-screen">
          <Sidebar />
          <div className="ml-24 p-8 h-full w-full dark:bg-gray-900">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
