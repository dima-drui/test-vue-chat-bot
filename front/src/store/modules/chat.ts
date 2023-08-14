import { BotSettings, ChatStore, Message, MessageDraft } from '@/utils/types'
import { defineStore } from 'pinia'
import { v4 as uuidV4 } from 'uuid'
import { botAnswers } from '../../utils/botAnswers'
import { MsgSender } from '@/utils/enums'
import { scrollByID } from '@/utils'

const useAppStore = defineStore('chat', {
  state: (): ChatStore => ({
    isActive: false,
    waitUserReq: false,
    currentHistory: [] as Message[],
    botSettings: {
        name: 'Neo',
        avatar: "mdi-robot-happy-outline",
    },
    inputUser: ''
  }),
  getters:{
    getChatHistory: (state: ChatStore): Message[] => state.currentHistory,
    getBotSettings: (state: ChatStore): BotSettings => state.botSettings,
    getInput: (state: ChatStore): string => state.inputUser,
    geisActive: (state: ChatStore): boolean => state.isActive,
    getwaitUserReq: (state: ChatStore): boolean => state.waitUserReq,
  },
  actions:{
    updateStoreProp<K extends keyof Pick<ChatStore, 'inputUser' | 'isActive' | 'waitUserReq' >>(
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
        scrollByID(newMessage.key)
    },

    async typewritingEffect(newMessage: Message) {
        this.waitUserReq = true        
        this.currentHistory.push({
            sender: newMessage.sender,
            text: '',
            key: newMessage.key,
            time: newMessage.time
        })
        const msgToTyping = this.currentHistory.find(el => el.key == newMessage.key);
        (async() => {
            if(msgToTyping){
                for(let i = 0 ; i < newMessage.text.length; i++) {
                    msgToTyping.text += newMessage.text.charAt(i);
                    await new Promise(r => setTimeout(r, 70))
                }
            }
        })()
        await new Promise(r => setTimeout(r, 80*newMessage.text.length))        
        this.waitUserReq = false
    },

    respondsOnUserRequest(){
        const userReq = this.currentHistory[this.currentHistory.length-1]
        if(userReq){
            const reqw = userReq.text.split(' ')
            if(reqw[0] == 'Поставить' && reqw[1] == 'через') {
                const sec = Number(reqw[3])
                this.alarmSet(sec)
            } else {
                this.pushMessage(botAnswers.welcome())
            }
        }
    },

// BOT ACTIONS
    showWeather(){
        this.pushMessage(botAnswers.giveWeather())
    },
    orderPizza(){
        this.pushMessage(botAnswers.givePizza())
    },
    alarmWhen(){
        this.inputUser = 'Поставить через (с): 5'
        this.pushMessage(botAnswers.alarmWhen())
    },
    alarmSet(s: number){
        this.pushMessage(botAnswers.alarmIsSet(s))

        setTimeout(()=>{
            this.pushMessage(botAnswers.alarmRinging())
        }, s * 1000)
    },

  }
})

export default useAppStore