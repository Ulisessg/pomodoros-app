import SuperTokens from "supertokens-node";
import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
	return {
		framework: "custom",
		supertokens: {
			connectionURI: process.env.AUTH_URI as string,
			apiKey: process.env.AUTH_API_KEY as string,
		},
		appInfo,
		recipeList: [EmailPasswordNode.init(), SessionNode.init()],
		isInServerlessEnv: true,
	};
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
	if (!initialized) {
		SuperTokens.init(backendConfig());
		initialized = true;
	}
}
