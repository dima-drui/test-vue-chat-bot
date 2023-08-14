import { _GettersTree } from "pinia";
import { MsgSender } from "./enums";

export interface ChatStore {
    isActive: boolean
    currentHistory: Message[]
    botSettings: BotSettings
    inputUser: string
}

export interface Message {
    sender: MsgSender
    text: string
    key: string
    time: string
    actions?: MsgAction[]
}

export type MessageDraft = Pick<Message, 'sender' | 'text' | 'actions'> 

export interface MsgAction {
    method: any
    label: string
}

export interface BotSettings {
    name: string,
    avatar: string
}

export interface BotAnswers {
    welcome(): MessageDraft
    giveWeather(): MessageDraft
    givePizza(): MessageDraft
    alarmWhen(): MessageDraft
    alarmIsSet(s: number): MessageDraft
    alarmRinging(): MessageDraft
}
