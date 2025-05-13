import { useState } from "react";
import { FiCircle, FiX } from "react-icons/fi";
import "./TicTacToe.css";

function TicTacToe() {
	const [steps, setSteps] = useState<Array<string>>([]);
	const [winner, setWinner] = useState<Array<string> | undefined>(undefined);
	const columns = 3;
	const rows = 3;
	const winCount = 3;

	const handleClick = (cellId: string) => {
		if (steps.length === columns * rows || winner) {
			return;
		}

		const currentRecord = [...steps, cellId];
		setSteps(currentRecord);

		const winning = checkDirection(currentRecord, cellId);
		if (winning) {
			setWinner(winning);
		}
	};

	const checkDirection = (
		currentRecord: string[],
		cellId: string
	): string[] | false => {
		const position = cellId.split("");
		const x = Number(position[1]);
		const y = Number(position[0]);

		// horizontal x r->l
		if (x + winCount <= rows) {
			const lineNodes = [cellId];
			for (let i = 1; i < winCount; i++) {
				const nextNode = y + "" + (x + i);
				const exist = currentRecord.indexOf(nextNode);
				if (exist >= 0 && exist % 2 === currentRecord.indexOf(cellId) % 2) {
					lineNodes.push(nextNode);
				} else {
					break;
				}
			}

			if (lineNodes.length === winCount) {
				return lineNodes;
			}
		}

		// horizontal -x

		// vertical y

		// vertical -y

		// -xy

		// xy

		// -x-y

		// x-y

		return false;
	};

	const handleRefresh = () => {
		setWinner(undefined);
		setSteps([]);
	};

	return (
		<div className="game-container">
			<table className="table-container">
				{[...Array(rows).keys()].map((rowId) => {
					return (
						<tr key={rowId}>
							{[...Array(columns).keys()].map((columnId) => {
								const cellId = rowId + "" + columnId;
								const stepIndex = steps.findIndex((el) => el === cellId);
								const isBlank = stepIndex < 0;
								const isCircle = !isBlank && stepIndex % 2 === 0;
								const isCross = !isBlank && stepIndex % 2 !== 0;

								const isWin =
									!isBlank && winner?.find((node) => node === cellId);

								return (
									<td
										onClick={() => isBlank && handleClick(cellId)}
										key={columnId}
										className={`cell ${isWin ? "win" : ""}`}
									>
										<div
											style={{
												display: "flex",
												justifyContent: "center",
											}}
										>
											{isCircle && <FiCircle />}
											{isCross && <FiX />}
										</div>
									</td>
								);
							})}
						</tr>
					);
				})}
			</table>
			{/* <div className="grid-container">
				{[...Array(columns * rows).keys()].map((keyId) => {
					const rowId = Math.floor(keyId / rows);
					const columnId =
						keyId >= columns
							? keyId - columns * Math.floor(keyId / columns)
							: keyId;
					console.log("..", keyId, rowId, columnId);
					const cellId = rowId + "" + columnId;
					const stepIndex = steps.findIndex((el) => el === cellId);
					const isBlank = stepIndex < 0;
					const isCircle = !isBlank && stepIndex % 2 === 0;
					const isCross = !isBlank && stepIndex % 2 !== 0;

					const isWin = !isBlank && winner?.find((node) => node === cellId);

					return (
						<div
							id={cellId}
							onClick={() => isBlank && handleClick(cellId)}
							key={cellId}
							className={`grid-item ${isWin ? "win" : ""}`}
						>
							{isCircle && <FiCircle />}
							{isCross && <FiX />}
						</div>
					);
				})}
			</div> */}
			<button style={{ width: "min-content" }} onClick={handleRefresh}>
				{winner ? "Again" : "Clean"}
			</button>
		</div>
	);
}

export default TicTacToe;
