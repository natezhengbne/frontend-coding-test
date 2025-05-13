import { useEffect, useRef } from "react";
import "./Clock.css";

const Clock = () => {
	const secondHandRef = useRef<HTMLDivElement | null>(null);

	const handleRotate = () => {
		const now = new Date();
		const seconds = now.getSeconds();
		const secondsDeg = seconds * 6;

		if (secondHandRef.current) {
			secondHandRef.current.style.transform = `rotate(${secondsDeg}deg)`;
		}
	};

	useEffect(() => {
		handleRotate();
		const rotate = setInterval(handleRotate, 1000);

		return () => {
			clearInterval(rotate);
		};
	}, []);

	return (
		<div className="clock">
			<div ref={secondHandRef} className="hand second" />
			<div className="dot" />
		</div>
	);
};

export default Clock;
