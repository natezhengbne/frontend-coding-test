import "./PageTree.css";
/**
 *
 * Page tree
 *
 */

import { motion, AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import { LuChevronRight } from "react-icons/lu";

type TreeNode = {
	id: string;
	name: string;
	children?: TreeNode[];
};

const treeData: TreeNode[] = [
	{
		id: "1",
		name: "Project Docs",
		children: [
			{ id: "1-1", name: "Overview" },
			{
				id: "1-2",
				name: "Technical",
				children: [
					{ id: "1-2-1", name: "Architecture" },
					{
						id: "1-2-2",
						name: "API Docs",
						children: [
							{ id: "1-2-2-1", name: "v1.0" },
							{ id: "1-2-2-2", name: "v2.0" },
						],
					},
				],
			},
		],
	},
	{
		id: "2",
		name: "Meeting Notes",
		children: [{ id: "2-1", name: "Sprint Planning" }],
	},
];

const PageTree = () => {
	return (
		<div
			style={{
				padding: "20px",
				border: "1px solid blue",
				width: "50vw",
			}}
		>
			{treeData.map((data) => {
				return <TreeComponent key={data.id} node={data} />;
			})}
		</div>
	);
};

export default PageTree;

type TreeComponentProps = {
	node: TreeNode;
};

const TreeComponent: FC<TreeComponentProps> = (props) => {
	const { name, children: subNode } = props.node;
	const [isOpen, setIsOpen] = useState(false);
	const hasChildren = subNode && subNode.length > 0;

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<ul>
			<div
				onClick={handleClick}
				style={{
					display: "flex",
					alignItems: "center",
					gap: "10px",
					cursor: "pointer",
				}}
			>
				<LuChevronRight
					style={{
						visibility: hasChildren ? "visible" : "hidden",
					}}
					className={`chevron ${isOpen ? "expand" : ""}`}
				/>
				<div style={{ userSelect: "none" }}>{name}</div>
			</div>
			<AnimatePresence>
				{isOpen && hasChildren && (
					<motion.div
						className="children-container"
						variants={{
							collapsed: {
								opacity: 0,
								height: 0,
								overflow: "hidden",
							},
							expanded: {
								opacity: 1,
								height: "auto",
							},
						}}
						initial="collapsed"
						animate="expanded"
						exit="collapsed"
					>
						{subNode.map((node) => {
							return (
								<li key={node.id}>
									<TreeComponent node={node} />
								</li>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</ul>
	);
};
