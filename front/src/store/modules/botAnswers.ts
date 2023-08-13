import { MsgSender } from "@/utils/enums"
import { BotAnswers, MessageDraft } from "@/utils/types"
import Stores from '@/store/modules'

export const botAnswers: BotAnswers = {
    welcome(this: any): MessageDraft { 
        return {
            sender: MsgSender.bot,
            text: "Привет! Что я могу для Вас сделать?",
            action: {
                method: () => Stores.chat().showWeather(),
                label: "Погода"
            }
        }
    },
    giveWeather(this: any): MessageDraft { 
        return {
            sender: MsgSender.bot,
            text: "Погода на ура!",
        }
    },
}
