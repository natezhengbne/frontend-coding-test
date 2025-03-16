/**
 * Avatar
 */

import { AnimatePresence, motion } from "framer-motion";
import { FC, useState, useRef, useCallback, useEffect } from "react";
import "./AvatarPicker.css";

type AvatarData = {
	id: number;
	source: string;
	label: string;
};

const avatarData: AvatarData[] = [
	{
		id: 1,
		source: "https://dummyjson.com/icon/abc111/200",
		label: "Avatar 1",
	},
	{
		id: 2,
		source: "https://dummyjson.com/icon/abc222/200",
		label: "Avatar 2",
	},
	{
		id: 3,
		source: "https://dummyjson.com/icon/abc333/200",
		label: "Avatar 3",
	},
	{
		id: 4,
		source: "https://dummyjson.com/icon/abc444/200",
		label: "Avatar 4",
	},
	{
		id: 5,
		source: "https://dummyjson.com/icon/abc555/200",
		label: "Avatar 5",
	},
	{
		id: 6,
		source: "https://dummyjson.com/icon/abc666/200",
		label: "Avatar 6",
	},
];

type AvatarProps = {
	data: AvatarData;
	onClick?: (id: number) => void;
	isSelected?: boolean;
	isLoading?: boolean;
};

const Avatar: FC<AvatarProps> = (props) => {
	const { data, onClick, isSelected, isLoading } = props;

	return (
		<div
			role="button"
			tabIndex={0}
			className={`avatar ${isSelected ? "selected" : ""}`}
			onClick={() => onClick?.(data.id)}
		>
			<img src={data.source} />
			{isLoading && <div className="circle-loader" />}
		</div>
	);
};

type AvatarsListProps = {
	selectedId: number;
	onSelected?: (id: number) => void;
};

const AvatarsList: FC<AvatarsListProps> = (props) => {
	const { selectedId, onSelected } = props;
	const [loadingId, setLoadingId] = useState<number | null>(null);

	const handleClick = (id: number) => {
		setLoadingId(id);
		setTimeout(() => {
			onSelected?.(id);
			setLoadingId(null);
		}, 3000);
	};

	return (
		<div className="avatars-list">
			{avatarData.map((avatar) => {
				return (
					<Avatar
						key={avatar.id}
						data={avatar}
						isSelected={selectedId === avatar.id}
						onClick={handleClick}
						isLoading={loadingId === avatar.id}
					/>
				);
			})}
		</div>
	);
};

const useClickOutside = (onClick: () => void) => {
	const ref = useRef<HTMLDivElement | null>(null);

	const handleClick = useCallback(
		(event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClick();
			}
		},
		[onClick]
	);

	useEffect(() => {
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [handleClick]);

	return ref;
};

const AvatarPicker = () => {
	const [selectedId, setSelectedId] = useState<number>(avatarData[0].id);
	const [isOpen, setIsOpen] = useState(false);
	const selectedAvatar =
		avatarData.find((d) => d.id === selectedId) ?? avatarData[0];

	const handleClick = () => {
		setIsOpen((v) => !v);
	};

	const ref = useClickOutside(() => setIsOpen(false));

	return (
		<div ref={ref} className="avatar-picker">
			<Avatar data={selectedAvatar} onClick={handleClick} />
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						transition={{
							duration: 2,
						}}
					>
						<AvatarsList
							selectedId={selectedId}
							onSelected={(id) => setSelectedId(id)}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AvatarPicker;
