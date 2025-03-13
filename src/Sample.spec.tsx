import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useState } from "react";

const Sample = () => {
	const [count, setCount] = useState(0);

	return (
		<>
			<p>Test Sample {count}</p>
			<button onClick={() => setCount(count + 1)}>send</button>
		</>
	);
};

it("should render the Sample component correctly", () => {
	render(<Sample />);
	expect(screen.getByText("Test Sample 0")).toBeInTheDocument();
});

it("should display the count number when clicks button", async () => {
	render(<Sample />);
	await userEvent.click(screen.getByText("send"));
	expect(screen.getByText("Test Sample 1")).toBeTruthy();
});
