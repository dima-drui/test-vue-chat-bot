import { MsgSender } from "./enums";

export interface ChatStore {
    currentHistory: Message[],
    botSettings: BotSettings,
    inputUser: string
}

export interface Message {
    sender: MsgSender,
    text: string,
    key: string,
    time: string,
    action?: MsgAction
}

export type MessageDraft = Pick<Message, 'sender' | 'text' | 'action'> 

export interface MsgAction {
    method: any,
    label: string
}

export interface BotSettings {
    name: string,
    avatar: string
}

export interface BotAnswers {
    welcome(): MessageDraft
    giveWeather(): MessageDraft
}