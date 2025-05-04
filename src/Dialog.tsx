import { useState } from "react";
import { FiChevronUp } from "react-icons/fi";
import "./Dialog.css";
import { AnimatePresence, motion } from "framer-motion";

const Dialog = () => {
	const [isExpend, setIsExpand] = useState(false);

	const toggle = () => setIsExpand((expand) => !expand);

	return (
		<section
			style={{
				width: "max-content",
				border: "1px solid blue",
				padding: "10px",
				borderRadius: "8px",
				position: "relative",
			}}
		>
			<div
				style={{
					display: "flex",
					gap: "10px",
					alignContent: "center",
					alignItems: "center",
					cursor: "pointer",
				}}
				onClick={toggle}
			>
				<span>xxxxxxxxxxxxxxxxxxxx</span>
				<FiChevronUp />
			</div>
			<div className={`dialog-content ${isExpend ? "dialog-expand" : ""}`}>
				<p>
					Nunc at lacus et lectus dapibus malesuada. Vivamus et ex eget nulla
					molestie aliquet at a nunc. Maecenas pellentesque, nisl varius congue
					pellentesque, velit velit feugiat mauris, non tincidunt nunc odio sit
					amet risus. Sed massa purus, congue nec leo mollis, convallis sodales
					diam. Ut facilisis viverra nisl, et vehicula neque aliquam non. Fusce
					id efficitur lectus. Quisque porttitor urna eu magna commodo blandit.
				</p>
			</div>
			{/* <AnimatePresence>
				{isExpend && (
					<motion.div
						initial={{ maxWidth: "100px", maxHeight: "200px" }}
						animate={{
							maxWidth: "300px", maxHeight: "300px"
						}}
						exit={{ width: "300px" }}
					>
						Nunc at lacus et lectus dapibus malesuada. Vivamus et ex eget nulla
						molestie aliquet at a nunc. Maecenas pellentesque, nisl varius
						congue pellentesque, velit velit feugiat mauris, non tincidunt nunc
						odio sit amet risus. Sed massa purus, congue nec leo mollis,
						convallis sodales diam. Ut facilisis viverra nisl, et vehicula neque
						aliquam non. Fusce id efficitur lectus. Quisque porttitor urna eu
						magna commodo blandit.
					</motion.div>
				)}
			</AnimatePresence> */}
		</section>
	);
};

export default Dialog;
