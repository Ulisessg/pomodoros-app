import { StaticImagesPath } from "@/constants";
import { Header, theme } from "d-system";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import styled from "styled-components";

const HeaderComponent: FC = () => {
	return (
		<HeaderStyles>
			<Link href="/" aria-label="Inicio">
				<Image
					alt="Tomato img"
					src={`${StaticImagesPath}tomato-header.png`}
					width={45}
					height={40}
				/>
			</Link>
			<p>Version: {process.env.NEXT_PUBLIC_VERSION}</p>
		</HeaderStyles>
	);
};

const HeaderStyles = styled(Header)`
	align-items: center;
	justify-content: space-between;
	grid-auto-flow: column;
	// Make version full visible
	& p {
		margin-right: ${theme.spacing * 3}px;
	}
`;

export default HeaderComponent;
