import { useCallback, useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right";

const SnakeGame = () => {
	const xNodeCount = 35;
	const yNodeCount = 30;

	const nodes = [...Array(xNodeCount * yNodeCount).keys()];
	const initPosition = Array.from(
		{ length: 5 },
		(_, index) => Math.floor(yNodeCount / 3) * xNodeCount + 2 + index
	);

	const [snake, setSnake] = useState(initPosition);
	const [foods, setFoods] = useState<number[]>();
	const [score, setScore] = useState<number>(0);

	const [isGameOver, setIsGameOver] = useState(false);
	const [gameStatus, setGameStatus] = useState<
		"started" | "paused" | "waiting"
	>("waiting");

	const directionRef = useRef<Direction>("right");
	const timerRef = useRef<number | null>(null);
	const lastTimeRef = useRef<number>(0);

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

	const calcSnake = useCallback(() => {
		setSnake((prevSnake) => {
			const direction = directionRef.current;
			const headNode = prevSnake[prevSnake.length - 1];
			const nextHeadNode = findNextHeadNode(headNode, direction);

			const isHitBody = prevSnake.includes(nextHeadNode);
			console.log("1  ", isHitBody, direction, headNode, nextHeadNode);
			if (
				nextHeadNode < 0 ||
				nextHeadNode >= xNodeCount * yNodeCount ||
				checkHitBoundary(headNode, direction) ||
				isHitBody
			) {
				setIsGameOver(true);
				cancelAnimationFrame(timerRef.current!);
				return prevSnake;
			}

			return [...prevSnake.slice(1), nextHeadNode];
		});
	}, []);

	const gameLoop = useCallback(
		(currentTime: number) => {
			if (!lastTimeRef.current) lastTimeRef.current = currentTime;
			const deltaTime = currentTime - lastTimeRef.current;

			if (deltaTime >= 150) {
				calcSnake();
				lastTimeRef.current = currentTime;
			}

			timerRef.current = requestAnimationFrame(gameLoop);
		},
		[calcSnake]
	);

	const handleGameStatus = useCallback(() => {
		if (gameStatus === "paused" || gameStatus === "waiting") {
			setGameStatus("started");
			timerRef.current = requestAnimationFrame(gameLoop);
			return;
		}

		if (gameStatus === "started") {
			setGameStatus("paused");
			cancelAnimationFrame(timerRef.current!);
		}
	}, [gameLoop, gameStatus]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (isGameOver) {
				return;
			}
			const keyName = event.key;
			if (keyName === " " && ["paused", "started"].includes(gameStatus)) {
				handleGameStatus();
				return;
			}
			if (keyName.startsWith("Arrow")) {
				if (gameStatus === "waiting" || gameStatus === "paused") {
					handleGameStatus();
					return;
				}
				event.preventDefault();
				const newDir = keyName.substring(5).toLowerCase() as Direction;
				const currentDir = directionRef.current;

				if (
					newDir !== currentDir &&
					newDir !== getOppositeDirection(currentDir)
				) {
					directionRef.current = newDir;
					//TODO fix here if tab multi keys rapidly
					calcSnake();
				}
			}
		},
		[calcSnake, gameStatus, handleGameStatus, isGameOver]
	);

	const initSnake = () => {
		setIsGameOver(false);
		setGameStatus("waiting");
		setSnake(initPosition);
		cancelAnimationFrame(timerRef.current!);
		directionRef.current = "right";
		setScore(0);
	};

	const generateFood = useCallback(() => {
		const food = Math.ceil(Math.random() * nodes.length);
		setFoods([food]);
	}, [nodes.length]);

	useEffect(() => {
		generateFood();
	}, [generateFood]);

	useEffect(() => {
		const isHitFood = foods?.includes(snake[snake.length - 1]);
		if (isHitFood) {
			setScore((prev) => prev + 1);
			generateFood();
		}
	}, [foods, generateFood, snake]);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<div
			style={{
				padding: "20px",
				background: "gray",
				borderRadius: "8px",
				margin: "12px",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					margin: "10px",
				}}
			>
				<button
					style={{
						visibility: isGameOver
							? "hidden"
							: gameStatus === "started" || gameStatus === "paused"
							? "visible"
							: "hidden",
					}}
					onClick={handleGameStatus}
				>
					{gameStatus === "paused" ? "Resume (space)" : "Pause (space)"}
				</button>
				{gameStatus !== "waiting" && (
					<div
						style={{
							fontWeight: "bold",
							color: "white",
						}}
					>
						Score: {score}
					</div>
				)}
				<button
					style={{
						visibility:
							isGameOver || gameStatus === "paused" ? "visible" : "hidden",
					}}
					onClick={initSnake}
				>
					Restart
				</button>
			</div>
			<div
				style={{
					border: "1px solid yellow",
					display: "grid",
					gridTemplateColumns: `repeat(${xNodeCount}, 20px)`,
				}}
			>
				{nodes.map((nodeId) => {
					const partOfSnake = snake.includes(nodeId);
					if (snake[snake.length - 1] === nodeId) {
						return (
							<div
								key={nodeId}
								style={{
									backgroundColor: "white",
									width: "20px",
									height: "20px",
								}}
							/>
						);
					}

					if (foods && foods.includes(nodeId)) {
						return (
							<div
								key={nodeId}
								style={{
									backgroundColor: "pink",
									width: "20px",
									height: "20px",
								}}
							/>
						);
					}

					return (
						<div
							id={`${nodeId}`}
							key={nodeId}
							style={{
								backgroundColor: partOfSnake
									? isGameOver
										? "red"
										: "black"
									: "teal",
								width: "20px",
								height: "20px",
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default SnakeGame;
