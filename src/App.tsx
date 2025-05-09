import "./App.css";
import SearchBar from "./SearchBar";
import PageTree from "./PageTree";
import TicTacToe from "./TicTacToe";
import BarChartContainer from "./BarChart";
import AvatarPicker from "./AvatarPicker";
import BlurImage from "./BlurImage";
import Dialog from "./Dialog";
import Clock from "./Clock";
import SnakeGame from "./SnakeGame";
import { useState } from "react";

const widgets = [
	"snake",
	"clock",
	"dialog",
	"searchBar",
	"pageTree",
	"ticTacToe",
	"barChart",
	"avatarPicker",
	"jiraIssue",
	"blurImage",
] as const;
type Widget = (typeof widgets)[number];

function App() {
	const [displays, setDisplays] = useState<Array<Widget>>([]);

	return (
		<div className="app">
			<div
				style={{
					textAlign: "center",
					display: "flex",
					width: "60%",
				}}
			>
				{widgets.map((w) => {
					return (
						<>
							<input
								type="checkbox"
								id={w}
								name={w}
								value={w}
								onChange={(e) => {
									console.log("11", e.currentTarget.checked, w);
									if (e.currentTarget.checked) {
										if (!displays.includes(w)) {
											setDisplays([...displays, w]);
										}
									} else {
										setDisplays((curr) => {
											const newArr = curr.filter((item) => item !== w);
											return newArr;
										});
									}
								}}
							/>
							<label htmlFor={w}>{w}</label>
						</>
					);
				})}
			</div>
			{displays.includes("snake") && <SnakeGame />}
			{displays.includes("clock") && <Clock />}
			{displays.includes("dialog") && <Dialog />}
			{displays.includes("searchBar") && <SearchBar />}
			{displays.includes("pageTree") && <PageTree />}
			{displays.includes("ticTacToe") && <TicTacToe />}
			{displays.includes("barChart") && <BarChartContainer />}
			{displays.includes("avatarPicker") && <AvatarPicker />}
			{displays.includes("jiraIssue") && <JiraIssueView />}
			{displays.includes("blurImage") && <BlurImage />}
		</div>
	);
}

/**
 * Jira issue view
 *
 */

const JiraIssueView = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = (event: any) => {
		window.history.pushState({}, "", "/test");
		const formData = new FormData(event.currentTarget);

		const title = formData.get("title");
		const description = formData.get("description");

		console.log("Title:", title);
		console.log("Description:", description);
		event.preventDefault();
	};

	return (
		<div>
			<form onSubmit={handleSubmit} noValidate>
				<div>
					<label htmlFor="title">Title:</label>
					<input id="title" name="title" required aria-required />
				</div>
				<div>
					<label htmlFor="description">Description:</label>
					<input id="description" name="description" />
				</div>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default App;
