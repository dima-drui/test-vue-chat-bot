<template>
    <v-list class="d-flex flex-column">
        <v-list-item
            v-for="msg in messages"
            :key="msg.key"
            :prepend-icon="msg.sender == msgSender.bot ? msg.avatar : ''" 
            :class="msg.sender == msgSender.bot ? 'message message__bot' : 'message message__user' "
            rounded
            elevation="1"
            >
                <p><b>{{ msg.text }}</b></p>
                <p><i style="font-size: xx-small;">{{ msg.time }}</i></p>
            </v-list-item>
    </v-list>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { MsgSender } from '@/utils/enums';

export default defineComponent({
    name: "DialogComponent",
    data(){
        const msgSender = MsgSender
        return {
            msgSender,
        }
    },
    props: ['messages']
})

</script>
