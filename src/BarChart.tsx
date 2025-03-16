import { motion } from "framer-motion";
import { useState, FC } from "react";
import "./BarChart.css";

type CharData = {
	id: string;
	name: string;
	ticketCount: number;
	colour: string;
};

const charData: Array<CharData> = [
	{ id: "dep-1", name: "Legal", ticketCount: 32, colour: "#3F888F" },
	{ id: "dep-2", name: "Sales", ticketCount: 20, colour: "#FFA420" },
	{ id: "dep-3", name: "Engineering", ticketCount: 60, colour: "#28A745" },
	{ id: "dep-4", name: "Manufacturing", ticketCount: 5, colour: "#8B4513" },
	{ id: "dep-5", name: "Maintenance", ticketCount: 14, colour: "#6495ED" },
	{ id: "dep-6", name: "Human Resourcing", ticketCount: 35, colour: "#1D1E33" },
	{ id: "dep-7", name: "Events", ticketCount: 43, colour: "#E1CC4F" },
];

const BarChartContainer = () => {
	const [toggle, setToggle] = useState(true);
	const maxTicketCount = Math.max(...charData.map((d) => d.ticketCount));

	return (
		<>
			<button onClick={() => setToggle(!toggle)}>Toggle Chart</button>
			{toggle && (
				<div className="bar-container">
					<div className="bar-content">
						{charData.map((data) => {
							return (
								<BarItem
									key={data.id}
									data={data}
									maxTicketCount={maxTicketCount}
								/>
							);
						})}
					</div>
					<div className="x-axis-content">x</div>
					<div className="y-axis-content">y</div>
				</div>
			)}
		</>
	);
};

export default BarChartContainer;

type BarItemProps = {
	data: CharData;
	maxTicketCount: number;
};

const BarItem: FC<BarItemProps> = (props) => {
	const { ticketCount, colour, name } = props.data;
	const height = (ticketCount / props.maxTicketCount) * 100;

	return (
		<motion.div
			className="bar-item"
			initial={{ height: 0 }}
			animate={{ height: `${height}%` }}
			exit={{ height: 0 }}
			style={{
				backgroundColor: colour,
			}}
		>
			<div className="tooltip">{`${name} - ${ticketCount}`}</div>
		</motion.div>
	);
};
