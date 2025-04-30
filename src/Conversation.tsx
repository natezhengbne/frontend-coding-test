import Composer from "@/Composer";
import ChatMessages from "@/ChatMessages";

const Conversation = () => {
	return (
		<div className="flex flex-col h-screen">
			<div className="flex-1 overflow-y-auto">
				<ChatMessages />
			</div>
			<div className="sticky bottom-0 mt-[-12px] z-10 bg-white mx-12">
				<Composer />
			</div>
			<div>xxx</div>
		</div>
	);
};

export default Conversation;
