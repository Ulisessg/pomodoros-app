import { Header, Link } from "d-system";
import React, { FC } from "react";

const HeaderComponent: FC = () => {
	return (
		<Header>
			<Link href="/" text="Home" />
		</Header>
	);
};

export default HeaderComponent;
