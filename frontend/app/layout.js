import "./globals.css";
import Sidebar from "./sidebar";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <div className="flex h-full w-full">
          <Sidebar />
          <div className="ml-24 p-8 h-full w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
