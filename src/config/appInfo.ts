import { AppInfo } from "supertokens-node/types";

export const appInfo: AppInfo = {
  appName: "Pomodoros App",
  websiteDomain: process.env.NEXT_PUBLIC_AUTH_WEBSITE_DOMAIN as string,
  apiDomain: process.env.NEXT_PUBLIC_AUTH_API_DOMAIN as string,
  apiBasePath: "/api/auth",
  websiteBasePath: "/auth",
};
