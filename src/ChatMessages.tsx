import { ChatMessage, useChatStore } from "@/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

const ChatMessages = () => {
	const threads = useChatStore((state) => state.messageMapping);

	return (
		<ScrollArea id="chatMessages">
			<div>
				{threads.map((thread) => (
					<div
						key={thread.localId}
						id={`idx-${thread.localId}`}
						className="space-y-2"
					>
						{thread.messages.map((msg) => (
							<>
								<UserMessage message={msg} />
								<AssistantMessage message={msg} />
							</>
						))}
					</div>
				))}
			</div>
		</ScrollArea>
	);
};

export default ChatMessages;

type MessageProps = {
	message: ChatMessage;
};

const UserMessage = (props: MessageProps) => {
	const { message } = props;

	const scrollTargetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		scrollTargetRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}, []);

	if (message.role !== "user") {
		return null;
	}

	return (
		<div
			ref={scrollTargetRef}
			className="bg-amber-500 text-right ml-auto max-w-xl p-3 rounded-md text-sm"
		>
			{message.content}
		</div>
	);
};

const AssistantMessage = (props: MessageProps) => {
	const { message } = props;

	if (message.role !== "assistant") {
		return null;
	}

	return (
		<div className="bg-gray-100 text-left mr-auto max-w-xl p-3 rounded-md text-sm min-h-dvw">
			{message.content}
		</div>
	);
};
