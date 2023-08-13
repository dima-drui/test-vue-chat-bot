<template>
    <v-text-field
        append-inner-icon="mdi-send"
        v-model="inputText"
        hide-details
        @click:append-inner="$emit('clicked')"
    ></v-text-field>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueTypes from "vue-types";

export default defineComponent({
    name: "InputComponent",
    props:{
        modelValue: VueTypes.string
    },
    computed:{
        inputText: {
            get(){ 
                return this.modelValue
            },
            set(val: string){ 
                this.$emit("update:modelValue", val);
            }
        }
    }
})

</script>
