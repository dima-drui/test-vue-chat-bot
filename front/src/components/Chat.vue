<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">

        <v-sheet
            rounded
            elevation="2"
            class="pa-2 d-flex flex-column"
            height="600px"
            max-width="500px"
            position="fixed"
            >

            <v-sheet class="mb-auto">
                <DialogComponent :messages="chatHistory" />
            </v-sheet>
            
            <v-sheet>
                <InputComponent 
                    v-model="inputText" 
                    @clicked="sendMsg(msgSender.user)" 
                    />
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
import { HelloUser } from '@/utils/initChat';
import { Message } from '@/utils/types';
import { MsgSender } from '@/utils/enums';

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
        inputText: {
            get(){ 
                return this.storeChat.getInput
            },
            set(val: string){ 
                this.storeChat.updateStoreProp('inputUser', val)
            }
        }
    },
    methods:{
        sendMsg(sender: MsgSender){
            const newMsg = {
                sender: sender,
                text: this.inputText,
            }
            const newMsgAnswer = {
                sender: this.msgSender.bot,
                text: 'супер',
            }
            this.storeChat.pushMessage(newMsg)
            this.storeChat.updateStoreProp('inputUser', '') 
            setTimeout(()=>{
                this.storeChat.pushMessage(newMsgAnswer)
            }, 1000
            )
        }
    },
    mounted(){
        this.storeChat.pushMessage(HelloUser)
        const newMsg = {
                sender: this.msgSender.user,
                text: "Дай подумать",
            }
        this.storeChat.pushMessage(newMsg)
    }
})

</script>

<style>
.message {
    margin: 5px;
}
.message__bot {
    align-self: self-start;
    margin-right: 30px;
}
.message__user {
    align-self: self-end;
    margin-left: 30px;
}
</style>