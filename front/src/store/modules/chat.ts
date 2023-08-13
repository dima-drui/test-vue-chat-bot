// Utilities
import { MsgSender } from '@/utils/enums'
import { ChatStore, Message, MessageDraft } from '@/utils/types'
import { defineStore } from 'pinia'
import { v4 as uuidV4 } from 'uuid'

const useAppStore = defineStore('chat', {
  state: (): ChatStore => ({
    currentHistory: [] as Message[],
    inputUser: ''
  }),
  getters:{
    getChatHistory: (state: any): Message[] => state.currentHistory,
    getInput: (state: any): string => state.inputUser,
  },
  actions:{
    updateStoreProp(prop: keyof ChatStore, val: any){
        try {
            this[prop] = val
        }
        catch(e: any) {
            console.error(e.message)
        }
    },
    pushMessage(val: MessageDraft){
        const newMessage: Message = {
            ...val,
            time: new Date(Date.now()).toUTCString(),
            key: uuidV4(),
            avatar: val.sender == MsgSender.bot ? "mdi-robot-happy-outline" : "mdi-emoticon-happy-outline"
        }
        this.currentHistory.push(newMessage)
    },

  }
})

export default useAppStore