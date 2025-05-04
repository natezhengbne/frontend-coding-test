import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right";

const SnakeGame = () => {
	const xNodeCount = 15;
	const yNodeCount = 10;

	const nodes = [...Array(xNodeCount * yNodeCount).keys()];

	const [snake, setSnake] = useState([0, 1, 2, 3, 4]);
	const [isGameOver, setIsGameOver] = useState(false);

	const directionRef = useRef<Direction>("right");
	const keyBoardHitTimeRef = useRef<number | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const getOppositeDirection = (dir: Direction): Direction => {
		const opposites: Record<Direction, Direction> = {
			up: "down",
			down: "up",
			left: "right",
			right: "left",
		};
		return opposites[dir];
	};

	const checkHitBoundary = (
		headNode: number,
		direction: Direction
	): boolean => {
		if (direction === "up" && headNode < xNodeCount) return true;
		if (direction === "down" && headNode >= xNodeCount * (yNodeCount - 1))
			return true;
		if (direction === "left" && headNode % xNodeCount === 0) return true;
		if (direction === "right" && (headNode + 1) % xNodeCount === 0) return true;

		return false;
	};

	const findNextHeadNode = (headNode: number, direction: Direction): number => {
		if (direction === "up") return headNode - xNodeCount;
		if (direction === "down") return headNode + xNodeCount;
		if (direction === "left") return headNode - 1;
		if (direction === "right") return headNode + 1;
		return -1;
	};

	useEffect(() => {
		const renderSnake = () => {
			setSnake((prevSnake) => {
				if (isGameOver) {
					clearInterval(timerRef.current!);
					return prevSnake;
				}

				const direction = directionRef.current;
				const headNode = prevSnake[prevSnake.length - 1];
				const nextHeadNode = findNextHeadNode(headNode, direction);

				const isHitBody = snake.includes(nextHeadNode);
				if (
					nextHeadNode < 0 ||
					nextHeadNode > xNodeCount * yNodeCount ||
					checkHitBoundary(headNode, direction) ||
					isHitBody
				) {
					setIsGameOver(true);
					clearInterval(timerRef.current!);
					return prevSnake;
				}

				return [...prevSnake.slice(1), nextHeadNode];
			});
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			const keyName = event.key;
			if (keyName.startsWith("Arrow")) {
				const newDir = keyName.substring(5).toLowerCase() as Direction;
				const currentDir = directionRef.current;

				if (
					newDir !== currentDir &&
					newDir !== getOppositeDirection(currentDir)
				) {
					directionRef.current = newDir;
				} else {
					return;
				}

				keyBoardHitTimeRef.current = Date.now();
				renderSnake();

				event.stopPropagation();
				event.preventDefault();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		timerRef.current = setInterval(() => {
			if (
				keyBoardHitTimeRef.current === null ||
				Date.now() - keyBoardHitTimeRef.current > 200
			) {
				renderSnake();
			}
		}, 300);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isGameOver]);

	return (
		<div style={{ padding: "30px" }}>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${xNodeCount}, 50px)`,
				}}
			>
				{nodes.map((nodeId) => {
					const partOfSnake = snake.includes(nodeId);

					return (
						<div
							style={{
								backgroundColor: "lightblue",
								width: "50px",
								height: "50px",
								border: "1px solid #ddd",
							}}
							key={nodeId}
						>
							{partOfSnake && (
								<div
									style={{
										width: "max-content",
										height: "10px",
										backgroundColor: isGameOver ? "red" : "unset",
									}}
								>
									s
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SnakeGame;
