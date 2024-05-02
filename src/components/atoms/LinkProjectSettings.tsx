import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { StaticImagesPath } from "@/constants";

const LinkProjectSettings: FC<LinkProjectSettingsProps> = ({ projectId }) => {
	return (
		<LinkStyles
			href={`/project/${projectId}/settings`}
			data-project-setting-link
		>
			<Image
				alt="Settings icon"
				src={`${StaticImagesPath}settings-cog-svgrepo-com.svg`}
				width={40}
				height={40}
			/>
		</LinkStyles>
	);
};

const LinkStyles = styled(Link)`
	justify-self: end;
`;

export default LinkProjectSettings;

interface LinkProjectSettingsProps {
	projectId: number;
}
