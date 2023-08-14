import { BotSettings, ChatStore, Message, MessageDraft } from '@/utils/types'
import { defineStore } from 'pinia'
import { v4 as uuidV4 } from 'uuid'
import { botAnswers } from '../../utils/botAnswers'
import { MsgSender } from '@/utils/enums'
import { scrollByID } from '@/utils'

const useAppStore = defineStore('chat', {
  state: (): ChatStore => ({
    isActive: true,
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

    async typewritingEffect(newMessage: Message){
        this.waitUserReq = true
        console.log(this.waitUserReq);
        
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
 
        this.waitUserReq = false
        console.log(this.waitUserReq);
        console.log(this.currentHistory);
    },

    respondsOnUserRequest(){
        const userReq = this.currentHistory[-1]
        const reqw = userReq.text.split(' ')
        if(reqw[0] == 'Поставить' && reqw[1] == 'через') {
            const sec = parseInt(reqw[3]) * 1000
            this.alarmSet(sec)
        } else {
            this.pushMessage(botAnswers.unknownRequ())
        }
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
    alarmWhen(){
        this.inputUser = 'Поставить через (с): 5'
        this.pushMessage(botAnswers.alarmWhen())
    },
    alarmSet(s: number){
        this.pushMessage(botAnswers.alarmIsSet(s))

        setTimeout(()=>{
            this.pushMessage(botAnswers.alarmRinging())
        }, s)
    },

  }
})

export default useAppStore