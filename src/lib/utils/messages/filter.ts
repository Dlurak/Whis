import type { Message, TextMessage } from '$lib/files/parseWhatsapp';

export const filterMsges = (msges: Message[]) => {
	return msges.filter(({ type }) => type === 'message') as TextMessage[];
};
