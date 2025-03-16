import "./SearchBar.css";

const SearchBar = () => {
	function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
		func: F,
		delay = 1000
	) {
		let timer: ReturnType<typeof setTimeout>;

		return function (...args: Parameters<F>) {
			clearTimeout(timer);
			timer = setTimeout(() => func(...args), delay);
		};
	}

	const handleClick = (value: string) => {
		console.log(value);
	};

	const debouncedHandleClick = debounce(handleClick);

	return (
		<div className="input-group">
			<fieldset>
				<legend>Search bar</legend>
				<input
					type="text"
					placeholder=""
					onInput={(event) => {
						const value = event.currentTarget.value;
						console.log("===", value);
						debouncedHandleClick(value);
					}}
				/>
			</fieldset>
		</div>
	);
};

export default SearchBar;
