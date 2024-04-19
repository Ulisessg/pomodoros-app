import { StaticImagesPath } from "@/constants";
import { Header, theme } from "d-system";
import Link from "next/link";
import React, { FC } from "react";
import styled from "styled-components";

const HeaderComponent: FC = () => {
	return (
		<HeaderStyles>
			<Link href="/" aria-label="Inicio">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					alt="Tomato img"
					src={`${StaticImagesPath}tomato-header.png`}
					width={50}
					height={45}
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
