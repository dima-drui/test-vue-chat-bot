<template>
    <p><i>{{ botSettings?.name + ' на связи' }}</i></p>
    <v-list 
        class="d-flex flex-column"
        height="500px"
        >

        <v-list-item
            v-for="msg in messages"
            :key="msg.key"
            rounded
            :prepend-icon="msg.sender == msgSender.bot ? botSettings?.avatar : ''" 
            :class="msg.sender == msgSender.bot ? 'message message__bot' : 'message message__user' "
            variant="tonal"
            >
                <p><b>{{ msg.text }}</b></p>
                <p><i style="font-size: xx-small;">{{ msg.time }}</i></p>

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
