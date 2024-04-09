"use client";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import ShowProjects from "@/components/templates/ShowProjects";

const Index = () => {
	return (
		<SessionAuth>
			<ShowProjects />
		</SessionAuth>
	);
};

export default Index;
