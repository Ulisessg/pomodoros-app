"use client";
import { Link } from "d-system";
import { usePathname } from "next/navigation";
import React from "react";

const ProjectSettings = () => {
	const path = usePathname();
	return (
		<div>
			ProjectSettings
			<Link href={`${path}/edit-stages`} text="Edit Stages" />
		</div>
	);
};

export default ProjectSettings;
