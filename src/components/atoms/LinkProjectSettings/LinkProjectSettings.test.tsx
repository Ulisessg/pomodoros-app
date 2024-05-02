import { expect } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LinkProjectSettings from "./LinkProjectSettings";

describe("Link To Project Settings", () => {
	it("Should render correct project settings link", () => {
		render(<LinkProjectSettings projectId={23} />);
		const link = screen.getByRole("link") as HTMLAnchorElement;
		expect(link.href).toBe("http://localhost/project/23/settings");
	});
});
