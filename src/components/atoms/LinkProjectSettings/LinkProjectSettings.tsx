import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { StaticImagesPath } from "@/constants";
import { theme } from "d-system";

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

const rotateAnimation = keyframes`
	to {
		transform: rotate(360deg);
	}
`;

const LinkStyles = styled(Link)`
	justify-self: end;
	margin: ${theme.spacing}px 0px;
	display: flex;
	justify-content: center;
	align-content: center;
	animation: ${rotateAnimation} 1s 2;
	animation-delay: 0.5s;

	&:hover,
	&:focus {
		animation: ${rotateAnimation} 1s;
	}
`;

export default LinkProjectSettings;

interface LinkProjectSettingsProps {
	projectId: number;
}
