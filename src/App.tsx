import "./App.css";
import SearchBar from "./SearchBar";
import PageTree from "./PageTree";
import TicTacToe from "./TicTacToe";
import BarChartContainer from "./BarChart";
import AvatarPicker from "./AvatarPicker";
import BlurImage from "./BlurImage";

function App() {
	return (
		<div className="app">
			<SearchBar />
			<PageTree />
			<TicTacToe />
			<BarChartContainer />
			<AvatarPicker />
			<JiraIssueView />
			<BlurImage />
		</div>
	);
}

/**
 * Jira issue view
 *
 */

const JiraIssueView = () => {
	const handleSubmit = (event: any) => {
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
