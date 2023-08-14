import { BotSettings, ChatStore, Message, MessageDraft } from '@/utils/types'
import { defineStore } from 'pinia'
import { v4 as uuidV4 } from 'uuid'
import { botAnswers } from '../../utils/botAnswers'
import { MsgSender } from '@/utils/enums'

const useAppStore = defineStore('chat', {
  state: (): ChatStore => ({
    isActive: true,
    currentHistory: [] as Message[],
    botSettings: {
        name: 'Neo',
        avatar: "mdi-robot-happy-outline"
    },
    inputUser: ''
  }),
  getters:{
    getChatHistory: (state: ChatStore): Message[] => state.currentHistory,
    getBotSettings: (state: ChatStore): BotSettings => state.botSettings,
    getInput: (state: ChatStore): string => state.inputUser,
  },
  actions:{
    updateStoreProp<K extends keyof Pick<ChatStore, 'inputUser' | 'isActive' >>(
        prop: K, val: ChatStore[K]
        ): void {
            try {
                this.$state[prop] = val
            }
            catch(e: any) {
                console.error('updateStoreProp: ', e.message)
            }
    },
    pushMessage(val: MessageDraft){
        const newMessage: Message = {
            ...val,
            time: new Date(Date.now()).toUTCString(),
            key: uuidV4(),
        }
        if(newMessage.sender == MsgSender.user){
            this.typewritingEffect(newMessage)
        } else {
            this.currentHistory.push(newMessage)
        }
    },

    typewritingEffect(newMessage: Message){

        this.currentHistory.push({
            sender: newMessage.sender,
            text: '',
            key: newMessage.key,
            time: newMessage.time
        })

        const msgToTyping = this.currentHistory.find(el => el.key == newMessage.key)

        let i = 0

        function typeWriter() {
            if (i < newMessage.text.length) {
                if(msgToTyping){
                    msgToTyping.text += newMessage.text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
        }
        typeWriter()
    },

    botAnswer(){
        const newMsgAnswer = {
            sender: MsgSender.bot,
            text: 'супер',
        }
        setTimeout(()=>{
            this.pushMessage(newMsgAnswer)
        }, 1000
        )
    },


// BOT ACTIONS
    showWeather(){
        this.pushMessage(botAnswers.giveWeather())
    },
    orderPizza(){
        this.pushMessage(botAnswers.givePizza())
    },
    setAlarm(s: number){
        this.pushMessage(botAnswers.alarmIsSet(s))

        setTimeout(()=>{
            this.pushMessage(botAnswers.alarmRinging())
        }, s)
    },

  }
})

export default useAppStore