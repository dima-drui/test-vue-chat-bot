<template>
    <v-list 
        class="d-flex flex-column list-height"
        >
        <v-list-item
            v-for="msg in messages"
            :key="msg.key"
            :id="msg.key"
            rounded
            variant="tonal"
            elevation="2"
            :prepend-icon="msg.sender == msgSender.bot ? botSettings?.avatar : ''" 
            :class="msg.sender == msgSender.bot ? 'message message__bot' : 'message message__user' "
            >
                <v-sheet ><b>{{ msg.text }}</b></v-sheet>
                <v-sheet
                    v-if="msg.actions && msg.actions.length > 0"
                    >
                    <v-btn 
                        v-for="action in msg.actions"
                        :text="action.label"
                        size="small"
                        density="compact"
                        variant="tonal"
                        color="teal-darken-4"
                        class="ma-1"
                        @click="action.method()"
                        ></v-btn>
                </v-sheet>
                <v-sheet 
                    style="font-size: xx-small;" 
                    :class="msg.sender == msgSender.user ? 'text-right' : ''"
                    >
                    <i>{{ msg.time }}</i>
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
            viewportHeiht: 0,
            dialogHeight: 300
        }
    },
    props: {
        messages: {} as PropType<Message[]>,
        botSettings: {} as PropType<BotSettings>
    }
})

</script>

<style scoped>

.list-height {
    height: 400px;
}
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

@media (max-height: 450px) {
    .list-height {
        height: 200px;
    }
}

</style>