import { PomodorosContainerProvider } from "@/context/PomodorosContainerCtx";
import Pomodoro from "./Pomodoro";
import { FC } from "react";

const PomodoroWrapper: FC<Props> = ({ stoppedAt, duration, type }) => {
	return (
		<PomodorosContainerProvider>
			<Pomodoro
				duration={duration}
				id={23}
				index={0}
				projectId={0}
				stopped_at={stoppedAt}
				title="Prueba 1"
				type={type}
			/>
		</PomodorosContainerProvider>
	);
};

describe("Test pomdoro component", () => {
	/**
	 *
	 * Pomodoro
	 *
	 *
	 */

	it("Should render pomodoro without elapsed time", () => {
		cy.mount(
			<PomodoroWrapper
				duration="00:12:00"
				stoppedAt="00:00:00"
				type="pomodoro"
			/>
		);
		cy.get("p").contains("Prueba 1");
		cy.get("p").contains("00:12:00");
		cy.get("button").contains("▶");
	});
	it("Should render pomodoro with 30 seconds elapsed", () => {
		cy.mount(
			<PomodoroWrapper
				duration="00:12:00"
				stoppedAt="00:11:30"
				type="pomodoro"
			/>
		);
		cy.get("p").contains("00:11:30");
	});

	/**
	 *
	 * Rest
	 *
	 */

	it("Should render rest without elapsed time", () => {
		cy.mount(
			<PomodoroWrapper duration="00:25:00" stoppedAt="00:00:00" type="rest" />
		);
		cy.get("p").contains("Descanso");
		cy.get("p").contains("00:25:00");
		cy.get("button").contains("▶");
	});

	it("Should render rest with 1 minute elapsed", () => {
		cy.mount(
			<PomodoroWrapper duration="00:25:00" stoppedAt="00:24:00" type="rest" />
		);
		cy.get("p").contains("00:24:00");
	});

	/**
	 *
	 * Common
	 *
	 */

	it("Should stop at proper time without elapsed time", () => {
		cy.mount(
			<PomodoroWrapper
				duration="00:00:15"
				stoppedAt="00:00:00"
				type="pomodoro"
			/>
		);

		cy.intercept("patch", "http://localhost:8080/pomodoros/api/pomodoros", {
			body: null,
			statusCode: 204,
		});

		const playStopButton = cy.get("button");
		playStopButton.click();
		cy.wait(2000);
		playStopButton.click();
		cy.get("p").contains("00:00:13");
	});

	it("Should stop at proper time with elapsed time", () => {
		cy.mount(
			<PomodoroWrapper
				duration="00:00:15"
				stoppedAt="00:00:09"
				type="pomodoro"
			/>
		);
		cy.intercept("patch", "http://localhost:8080/pomodoros/api/pomodoros", {
			body: null,
			statusCode: 204,
		});

		const playStopButton = cy.get("button");
		playStopButton.click();
		cy.wait(2000);
		playStopButton.click();
		cy.get("p").contains("00:00:07");
	});

	it("Should stop at 00:00:00 and reset duration time", () => {
		cy.mount(
			<PomodoroWrapper
				duration="00:00:01"
				stoppedAt="00:00:00"
				type="pomodoro"
			/>
		);
		cy.intercept("patch", "http://localhost:8080/pomodoros/api/pomodoros", {
			body: null,
			statusCode: 204,
		});

		cy.get("button").click();
		cy.wait(1000);
		cy.get("p").contains("00:00:01");
	});
});

interface Props {
	stoppedAt: string;
	duration: string;
	type: "pomodoro" | "rest";
}
