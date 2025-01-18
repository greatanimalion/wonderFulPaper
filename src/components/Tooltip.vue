<template>
    <div>
        <v-tooltip theme="light" activator="parent" location="bottom" v-bind="$attrs">{{ title }}</v-tooltip>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">


defineProps<{
    title: string
}>()

</script>

<style scoped></style>