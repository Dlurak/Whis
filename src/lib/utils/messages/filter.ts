import type { Message, TextMessage } from '$lib/parser/types';

function isTextMsg(msg: Message): msg is TextMessage {
	return msg.type === 'message';
}

export const filterMsges = (msges: Message[]) => {
	return msges.filter(isTextMsg);
};
