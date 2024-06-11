import type { Option, SpecialMsg } from '$lib/parser/types';
import {
	AUDIO_OMITTED_ENGLISH,
	AUDIO_OMITTED_GERMAN,
	END_TO_END_ENCRYPTED_ENGLISH,
	END_TO_END_ENCRYPTED_GERMAN,
	GIF_OMITTED_ENGLISH,
	GIF_OMITTED_GERMAN,
	IMAGE_OMITED_ENGLISH,
	IMAGE_OMITED_GERMAN,
	STICKER_OMITTED_ENGLISH,
	STICKER_OMITTED_GERMAN,
	THIS_MSG_WAS_DEL_ENGLISH,
	THIS_MSG_WAS_DEL_GERMAN,
	VIDEO_OMITTED_ENGLISH,
	VIDEO_OMITTED_GERMAN,
	YOU_DELETED_THIS_MSG_ENGLISH,
	YOU_DELETED_THIS_MSG_GERMAN,
	CONTACT_OMMITED_ENGLISH,
	CONTACT_OMMITED_GERMAN,
	LOCATION_START_GERMAN,
	LOCATION_START_ENGLISH
} from '$lib/constants/whatsapp';
import { isNotUndefined } from '$lib/utils/isWhat';

interface SpecialMessageParserProps {
	message: string;
	author: string;
	date: Date;
}

export function parseSpecialMessage({
	message,
	author,
	date
}: SpecialMessageParserProps): SpecialMsg | undefined {
	switch (message) {
		case END_TO_END_ENCRYPTED_ENGLISH:
		case END_TO_END_ENCRYPTED_GERMAN:
			return { type: 'end-to-end', date, author };
		case IMAGE_OMITED_ENGLISH:
		case IMAGE_OMITED_GERMAN:
			return { type: 'image', date, author };
		case AUDIO_OMITTED_ENGLISH:
		case AUDIO_OMITTED_GERMAN:
			return { type: 'audio', date, author };
		case YOU_DELETED_THIS_MSG_ENGLISH:
		case YOU_DELETED_THIS_MSG_GERMAN:
		case THIS_MSG_WAS_DEL_ENGLISH:
		case THIS_MSG_WAS_DEL_GERMAN:
			return { type: 'deleted', date, author };
		case STICKER_OMITTED_ENGLISH:
		case STICKER_OMITTED_GERMAN:
			return { type: 'sticker', date, author };
		case GIF_OMITTED_ENGLISH:
		case GIF_OMITTED_GERMAN:
			return { type: 'gif', date, author };
		case VIDEO_OMITTED_ENGLISH:
		case VIDEO_OMITTED_GERMAN:
			return { type: 'video', date, author };
		case CONTACT_OMMITED_ENGLISH:
		case CONTACT_OMMITED_GERMAN:
			return { type: 'contact', date, author };
	}

	if (message.startsWith(LOCATION_START_ENGLISH) || message.startsWith(LOCATION_START_GERMAN)) {
		const urlString = message.split(' ')[1];
		if (!urlString) return undefined;

		const coordsString = new URL(urlString).searchParams.get('q');
		if (!coordsString) return undefined;

		const [lat, lng] = coordsString.split(',').map((x) => parseInt(x));

		return {
			date,
			author,
			type: 'location',
			location: { lat, lng }
		};
	}

	if (message.startsWith('POLL:\n')) {
		const [question, ...optionsStr] = message.split('\n').slice(1);

		const options = optionsStr
			.map((o) => {
				const matches = o.match(/OPTION: (.*) \((\d+) votes?\)/);
				if (!matches) return undefined;

				const [_, content, countStr] = matches;

				const opt: Option = { content, count: parseInt(countStr) };
				return opt;
			})
			.filter(isNotUndefined);

		return {
			date,
			author,
			type: 'poll',
			poll: { question, options }
		};
	}

	return undefined;
}
