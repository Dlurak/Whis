import { writable } from 'svelte/store';
import type { Message } from '$lib/parser/types';

export const messages = writable<Message[] | null>(null);
export const state = writable<'none' | 'loading' | 'finished' | 'error'>('none');
