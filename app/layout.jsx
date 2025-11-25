import Header from "@/components/Header";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="container mx-auto mt-5 px-[15px]">
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </div>
      </body>
    </html>
  );
}
