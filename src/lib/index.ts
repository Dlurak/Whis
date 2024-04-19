import { writable } from "svelte/store";
import type { Message } from "./files/parseWhatsapp";

export const messages = writable<Message[] | null>(null)
