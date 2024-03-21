'use client'
import { GlobalStyles } from "d-system";
import { SessionProvider } from "./Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <title>Pomodoros app</title>
      </head>
      <SessionProvider>
          <body>
            <div id="__next">
              <GlobalStyles footer={false}>
                {children}
              </GlobalStyles>
            </div>
          </body>
      </SessionProvider>
    </html>
  );
}
