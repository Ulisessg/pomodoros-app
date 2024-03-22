'use client'
import { GlobalStyles } from "d-system";
import { SessionProvider } from "./Providers";
import { ProjectsCtxProvider } from "@/context/ProjectsCtx";
import { StagesCtxProvider } from "@/context/StagesCtx";

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
        <ProjectsCtxProvider>
          <StagesCtxProvider>
            <body>
              <div id="__next">
                <GlobalStyles footer={false}>
                  {children}
                </GlobalStyles>
              </div>
            </body>
          </StagesCtxProvider>
        </ProjectsCtxProvider>
      </SessionProvider>
    </html>
  );
}
