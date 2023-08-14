<template>
    <p><i>{{ botSettings?.name + ' на связи' }}</i></p>
    <v-list 
        class="d-flex flex-column"
        height="500px"
        >

        <v-list-item
            v-for="msg in messages"
            :key="msg.key"
            :id="msg.key"
            rounded
            :prepend-icon="msg.sender == msgSender.bot ? botSettings?.avatar : ''" 
            :class="msg.sender == msgSender.bot ? 'message message__bot' : 'message message__user' "
            variant="tonal"
            >
                <v-sheet :class="msg.sender == msgSender.user ? 'message__text' : ''"><b>{{ msg.text }}</b></v-sheet>
                <v-sheet style="font-size: xx-small;"><i>{{ msg.time }}</i></v-sheet>

                <v-sheet
                    v-if="msg.actions && msg.actions.length > 0"
                    >
                    <v-btn 
                        v-for="action in msg.actions"
                        :text="action.label"
                        size="small"
                        density="compact"
                        variant="tonal"
                        color="purple"
                        class="ma-1"
                        @click="action.method()"
                        ></v-btn>
                </v-sheet>

            </v-list-item>
    </v-list>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import { MsgSender } from '@/utils/enums';
import { BotSettings, Message } from '@/utils/types';

export default defineComponent({
    name: "DialogComponent",
    data(){
        const msgSender = MsgSender
        return {
            msgSender,
        }
    },
    props: {
        messages: {} as PropType<Message[]>,
        botSettings: {} as PropType<BotSettings>
    }
})

</script>

<style scoped>
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
.message__text {
    width: 0;
    overflow: hidden;
    border-right: 2px solid white;
    font-size: 16px;
    white-space: nowrap;
    animation: typing 1.5s steps(40) forwards;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

</style>