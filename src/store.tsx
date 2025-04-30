import { create } from "zustand";

interface ChatThread {
	localId: string;
	serverId?: string;
	status: "streaming" | "done" | "error";
	messages: ChatMessage[];
}

export interface ChatMessage {
	role: "user" | "assistant" | "system";
	content: string;
}

interface ChatStore {
	messageMapping: ChatThread[];
	startThread: (userContent: string) => void;
	appendDeltaToCurrent: (delta: string) => void;
	markCurrentThreadDone: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
	messageMapping: [],
	startThread: (userContent) => {
		const threadId = crypto.randomUUID();
		const userMessage: ChatMessage = {
			role: "user",
			content: userContent,
		};
		const assistantMessage: ChatMessage = {
			role: "assistant",
			content: "",
		};

		const newThread: ChatThread = {
			localId: threadId,
			status: "streaming",
			messages: [userMessage, assistantMessage],
		};

		return set((state) => ({
			messageMapping: [...state.messageMapping, newThread],
		}));
	},
	appendDeltaToCurrent: (delta) =>
		set((state) => {
			const lastIndex = state.messageMapping.length - 1;
			if (lastIndex < 0) return {};

			const thread = state.messageMapping[lastIndex];
			const updatedThreads = [...state.messageMapping];

			const assistantIndex = thread.messages.findIndex(
				(msg) => msg.role === "assistant"
			);
			if (assistantIndex === -1) return {};

			const updatedThread = {
				...thread,
				messages: [...thread.messages],
			};

			updatedThread.messages[assistantIndex] = {
				...updatedThread.messages[assistantIndex],
				content: updatedThread.messages[assistantIndex].content + delta,
			};

			updatedThreads[lastIndex] = updatedThread;

			return {
				messageMapping: updatedThreads,
			};
		}),
	markCurrentThreadDone: () =>
		set((state) => {
			const lastIndex = state.messageMapping.length - 1;
			if (lastIndex < 0) return {};

			const thread = state.messageMapping[lastIndex];
			const updatedThreads = [...state.messageMapping];

			const updatedThread = {
				...thread,
				status: "done" as const,
			};

			updatedThreads[lastIndex] = updatedThread;

			return {
				messageMapping: updatedThreads,
			};
		}),
}));
