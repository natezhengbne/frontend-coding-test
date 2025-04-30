import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
	HiOutlineGlobeAlt,
	HiPlus,
	HiOutlineMicrophone,
	HiOutlineEllipsisHorizontal,
	HiOutlineArrowUp,
} from "react-icons/hi2";
import { RiVoiceprintFill } from "react-icons/ri";
import { useState } from "react";
import { useChatStore } from "@/store";

const Composer = () => {
	const [isTyping, setIsTyping] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const startThread = useChatStore((state) => state.startThread);

	const handleSubmit = () => {
		startThread(inputValue);
		setInputValue("");
		setIsTyping(false);

		fakeStreamResponse(mockMessages[0].assistant);
	};

	return (
		<Card className="w-full">
			<CardContent>
				<Input
					value={inputValue}
					placeholder="Ask anything"
					onChange={(e) => {
						const v = e.currentTarget.value.trim();
						setIsTyping(!!v);
						setInputValue(v);
					}}
				/>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Actions isTyping={isTyping} onSubmit={handleSubmit} />
			</CardFooter>
		</Card>
	);
};

export default Composer;

type ActionsProps = {
	isTyping: boolean;
	onSubmit: () => void;
};

const Actions = (props: ActionsProps) => {
	const { isTyping, onSubmit } = props;

	return (
		<div className="flex justify-between w-full gap-2">
			<div className="flex gap-2">
				<Button variant="outline" size="icon" className="cursor-pointer">
					<HiPlus />
				</Button>
				<Button variant="outline" className="cursor-pointer">
					<HiOutlineGlobeAlt />
					Search
				</Button>
				<Button variant="outline" size="icon" className="cursor-pointer">
					<HiOutlineEllipsisHorizontal />
				</Button>
			</div>
			<div className="flex gap-2">
				<Button variant="outline" size="icon" className="cursor-pointer">
					<HiOutlineMicrophone />
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="cursor-pointer"
					onClick={() => isTyping && onSubmit()}
				>
					{isTyping ? <HiOutlineArrowUp /> : <RiVoiceprintFill />}
				</Button>
			</div>
		</div>
	);
};

const mockMessages = [
	{
		user: "What's the capital of France?",
		assistant:
			"The capital of France is Paris. Why did the scarecrow win an award? Because he was outstanding in his field! AI stands for Artificial Intelligence. It refers to the simulation of human intelligence in machines.",
	}
];

const fakeStreamResponse = (content: string) => {
	const chunks = content.split(/(?<=[,\\.\\!\\?\\s])/g); // 逐词或逐句拆分
	let index = 0;
	console.log("chunks", chunks);

	const interval = setInterval(() => {
		if (index < chunks.length) {
			useChatStore.getState().appendDeltaToCurrent(chunks[index]);
			index++;
		} else {
			clearInterval(interval);
			useChatStore.getState().markCurrentThreadDone();
		}
	}, 100);
};
