// Utilities
import { MsgSender } from '@/utils/enums'
import { BotSettings, ChatStore, Message, MessageDraft } from '@/utils/types'
import { defineStore } from 'pinia'
import { v4 as uuidV4 } from 'uuid'
import { botAnswers } from './botAnswers'

const useAppStore = defineStore('chat', {
  state: (): ChatStore => ({
    currentHistory: [] as Message[],
    botSettings: {
        name: 'Neo',
        avatar: "mdi-robot-happy-outline"
    },
    inputUser: ''
  }),
  getters:{
    getChatHistory: (state: any): Message[] => state.currentHistory,
    getBotSettings: (state: any): BotSettings => state.botSettings,
    getInput: (state: any): string => state.inputUser,
  },
  actions:{
    updateStoreProp(prop: keyof ChatStore, val: any){
        try {
            this[prop] = val
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
        this.currentHistory.push(newMessage)
    },

// CHAT ACTIONS
    showWeather(){
        this.pushMessage(botAnswers.giveWeather())
    }

  }
})

export default useAppStore