"use client";
import { GlobalStyles, LoadingSpinner } from "d-system";
import { SuperTokensProvider } from "@/providers/supertokensProvider";
import { UserCtxProvider } from "@/context/UserCtx";
import { ProjectsCtxProvider } from "@/context/ProjectsCtx";
import { StagesCtxProvider } from "@/context/StagesCtx";
import { TaskCtxProvider } from "@/context/TaskCtx";
import { PomodorosCtxProvider } from "@/context/PomodorosCtx";
import HeaderComponent from "@/components/atoms/Header";
import { StaticImagesPath } from "@/constants";
import Sitemap from "@/components/molecules/Sitemap";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <title>Pomodoros app</title>
        <link
          rel="icon"
          type="image/png"
          href={`${StaticImagesPath}Tomato.png`}
        />
      </head>
      <body>
        <div id="__next">
          <SuperTokensProvider>
            <UserCtxProvider>
              <ProjectsCtxProvider>
                <StagesCtxProvider>
                  <TaskCtxProvider>
                    <PomodorosCtxProvider>
                      <GlobalStyles header={<HeaderComponent />} footer={false}>
                        <Suspense fallback={<LoadingSpinner size="small" />}>
                          <Sitemap />
                          {children}
                        </Suspense>
                      </GlobalStyles>
                    </PomodorosCtxProvider>
                  </TaskCtxProvider>
                </StagesCtxProvider>
              </ProjectsCtxProvider>
            </UserCtxProvider>
          </SuperTokensProvider>
        </div>
      </body>
    </html>
  );
}
