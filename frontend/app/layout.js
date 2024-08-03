import "./globals.css";

export const metadata = {
  title: "ecommerce-app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <body>
            <main className="text-header-footer font-petrov">{children}</main>
      </body>
    </html>
  );
}