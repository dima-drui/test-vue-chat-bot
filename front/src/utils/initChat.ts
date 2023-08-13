import { MsgSender } from "./enums";
import { MessageDraft } from "./types";

export const HelloUser: MessageDraft = {
    sender: MsgSender.bot,
    text: "Привет! Что я могу для Вас сделать?",
}
