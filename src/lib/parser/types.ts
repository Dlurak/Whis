export type TextMessage = {
	type: 'message';
	isEdited: boolean
	date: Date;
	author: string;
	message: string;
};

type LocationMsg = {
	type: 'location';
	date: Date;
	author: string;
	location: {
		lat: number;
		lng: number;
	};
};

export type Option = {
	content: string;
	count: number;
};

type PollMsg = {
	type: 'poll';
	date: Date;
	author: string;
	poll: {
		question: string;
		options: Option[];
	};
};

type SpecialMsgType =
	| 'sticker'
	| 'gif'
	| 'image'
	| 'video'
	| 'audio'
	| 'deleted'
	| 'end-to-end'
	| 'contact';

export type SpecialMsg =
	| {
			type: SpecialMsgType;
			date: Date;
			author: string;
	  }
	| LocationMsg
	| PollMsg;

export type Message = TextMessage | SpecialMsg;
