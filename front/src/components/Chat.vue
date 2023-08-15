<template>
    <v-sheet
        max-width="500px"
        class="chat__container ma-2"
        >

        <v-fade-transition>
            <v-sheet
                v-if="storeChat.geisActive"
                rounded
                :class="getAlarmIs 
                    ? 'd-flex flex-column pa-2 frame__color_alarm'
                    : 'd-flex flex-column pa-2 frame__color'"
                >

                <v-sheet>
                    <DialogComponent :messages="chatHistory" :bot-settings="botSettings"/>
                </v-sheet>
                
                <v-sheet>
                    <InputComponent 
                        v-model="inputText" 
                        @clicked="sendMsg(msgSender.user)" 
                        />
                </v-sheet>
            </v-sheet>
        </v-fade-transition>

        <v-sheet
            rounded
            :class="getAlarmIs 
                ? 'd-flex justify-end align-center frame__color_alarm'
                : 'd-flex justify-end align-center frame__color'"
            >
            <v-btn 
                v-if="storeChat.geisActive"
                size="small"
                class="me-auto text-none"
                color="white"
                variant="text"
                >
                <p><i>{{ botSettings?.name + ' на связи' }}</i></p>
            </v-btn>
            <v-btn 
                variant="text"
                color="white"
                :prepend-icon="storeChat.geisActive ? 'mdi-chevron-down' : 'mdi-chevron-up'"
                @click="storeChat.updateStoreProp('isActive', !storeChat.geisActive)"
                > Chat
                </v-btn>
        </v-sheet>

    </v-sheet>
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
        waitUserReqv(): boolean { return this.storeChat.getwaitUserReq},
        getAlarmIs(): boolean { return this.storeChat.getAlarmIs}
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
    position: fixed;
    bottom: 3px;
    right: 3px;
}

.frame__color {
    background-color: #78909C;
}

.frame__color_alarm {
    background-color:rgb(222, 80, 80);
}
</style>
@/utils/botAnswers