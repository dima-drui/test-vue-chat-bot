import { MsgSender } from "@/utils/enums"
import { BotAnswers, MessageDraft } from "@/utils/types"
import Stores from '@/store/modules'

export const botAnswers: BotAnswers = {
    welcome(): MessageDraft { 
        return {
            sender: MsgSender.bot,
            text: "Привет! Что я могу для Вас сделать?",
            actions: [
                {
                    method: () => Stores.chat().showWeather(),
                    label: "Погода"
                },
                {
                    method: () => Stores.chat().orderPizza(),
                    label: "Заказать пиццу"
                },
                {
                    method: () => Stores.chat().alarmWhen(),
                    label: "Будильник"
                },
            ]
        }
    },
    giveWeather(): MessageDraft { 
        return {
            sender: MsgSender.bot,
            text: "Погода на ура!",
        }
    },
    givePizza(): MessageDraft { 
        return {
            sender: MsgSender.bot,
            text: "Пицца в пути! Что еще могу сделать?",
        }
    },
    alarmWhen(): MessageDraft { 
        return {
            sender: MsgSender.bot,
            text: `На сколько поставить будильник?`,
        }
    },
    alarmIsSet(s: number): MessageDraft { 
        return {
            sender: MsgSender.bot,
            text: `Будильник активирован на ${s}ms`,
        }
    },
    alarmRinging(): MessageDraft { 
        return {
            sender: MsgSender.bot,
            text: `Будильник звонит !`,
        }
    },
}
