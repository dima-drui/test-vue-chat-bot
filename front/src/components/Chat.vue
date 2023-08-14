<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">

        <v-sheet
            max-width="500px"
            class="chat__container"
            >

            <v-sheet
                v-if="storeChat.geisActive"
                rounded
                class="frame__color d-flex flex-column pa-2"
                height="600px"
                >

                <v-sheet class="mb-auto">
                    <DialogComponent :messages="chatHistory" :bot-settings="botSettings"/>
                </v-sheet>
                
                <v-sheet>
                    <InputComponent 
                        v-model="inputText" 
                        @clicked="sendMsg(msgSender.user)" 
                        />
                </v-sheet>
            </v-sheet>

            <v-sheet
                class="frame__color"
                rounded
                >

                <v-btn 
                    variant="text"
                    color="white"
                    :prepend-icon="storeChat.geisActive ? 'mdi-chevron-down' : 'mdi-chevron-up'"
                    @click="storeChat.updateStoreProp('isActive', !storeChat.geisActive)"
                    > Chat
                    </v-btn>
            </v-sheet>
            
        </v-sheet>

    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DialogComponent from './Dialog.vue'
import InputComponent from './Input.vue'
import Stores from '@/store/modules'
import { BotSettings, Message } from '@/utils/types';
import { MsgSender } from '@/utils/enums';
import { botAnswers } from '@/utils/botAnswers';

export default defineComponent({
    name: "ChatComponent",
    components: {
        DialogComponent,
        InputComponent
    },
    data(){
        const msgSender = MsgSender
        const storeChat = Stores.chat()
        return {
            msgSender,
            storeChat,
        }
    },
    computed:{
        chatHistory(): Message[] { return this.storeChat.getChatHistory },
        botSettings(): BotSettings { return this.storeChat.getBotSettings },
        inputText: {
            get(){ 
                return this.storeChat.getInput
            },
            set(val: string){ 
                this.storeChat.updateStoreProp('inputUser', val)
            }
        },
        waitUserReqv(): boolean { return this.storeChat.getwaitUserReq}
    },
    methods:{
        sendMsg(sender: MsgSender){
            const newMsg = {
                sender: sender,
                text: this.inputText,
            }
            this.storeChat.pushMessage(newMsg)
            this.storeChat.updateStoreProp('inputUser', '') 
        }
    },
    watch: {
        waitUserReqv: {
            handler(newVal) {
                if(newVal == false){
                    this.storeChat.respondsOnUserRequest()
                }
            },
            immediate: true
        }
    },
    mounted(){
        this.storeChat.pushMessage(botAnswers.welcome())
    }
})

</script>
<style>
.chat__container {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.frame__color {
    background-color: #78909C;
}
</style>
@/utils/botAnswers