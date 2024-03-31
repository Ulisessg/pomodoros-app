"use client";
import { GlobalStyles } from "d-system";
import { SessionProvider } from "./Providers";
import { ProjectsCtxProvider } from "@/context/ProjectsCtx";
import { StagesCtxProvider } from "@/context/StagesCtx";
import { TaskCtxProvider } from "@/context/TaskCtx";
import { PomodorosCtxProvider } from "@/context/PomodorosCtx";
import HeaderComponent from "@/components/atoms/Header";

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
						<TaskCtxProvider>
							<PomodorosCtxProvider>
								<body>
									<div id="__next">
										<GlobalStyles header={<HeaderComponent />} footer={false}>
											{children}
										</GlobalStyles>
									</div>
								</body>
							</PomodorosCtxProvider>
						</TaskCtxProvider>
					</StagesCtxProvider>
				</ProjectsCtxProvider>
			</SessionProvider>
		</html>
	);
}
