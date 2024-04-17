import { Header, Link, theme } from "d-system";
import React, { FC } from "react";
import styled from "styled-components";

const HeaderComponent: FC = () => {
	return (
		<HeaderStyles>
			<Link href="/" text="Home" />
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
