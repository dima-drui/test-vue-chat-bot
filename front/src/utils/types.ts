import { MsgSender } from "./enums";

export interface ChatStore {
    currentHistory: Message[],
    inputUser: string
}

export interface Message {
    sender: MsgSender,
    text: string,
    key: string,
    time: string,
    action?: any,
    avatar?: string
}

export type MessageDraft = Pick<Message, 'sender' | 'text'> 

