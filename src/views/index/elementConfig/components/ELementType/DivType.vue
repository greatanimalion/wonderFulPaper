<template>
    <div class="item">
        <p>文字样式</p>
        <v-btn-toggle style="height: 32px;" v-model="textValue" background-color="primary" dark>
                <v-btn>
                   <Tooltip title="左对齐" location="top"><align-text-left theme="outline" size="24" fill="#fff"/></Tooltip>
                </v-btn>
            <v-btn>
                <Tooltip title="居中对齐" location="top"><align-text-center theme="outline" size="24" fill="#fff"/></Tooltip>

            </v-btn>
            <v-btn>
                <Tooltip title="右对齐" location="top"><align-text-right theme="outline" size="24" fill="#fff"/></Tooltip> 
            </v-btn>
        </v-btn-toggle>
    </div>
    <div class="item">
        <p>文字颜色</p>
        <input type="color" style="width: 100%;">
    </div>
    <div class="item">
        <p>背景颜色</p>
        <input type="color" style="width: 100%;">
    </div>
    <div class="item">
        <p>文字大小</p>
        <add-text theme="outline" size="24" fill="#fff"/>
         <v-btn-toggle style="height: 32px;" v-model="textValue" background-color="primary" dark>
                <v-btn>
                   <Tooltip title="左对齐" location="top"><align-text-left theme="outline" size="24" fill="#fff"/></Tooltip>
                </v-btn>
            <v-btn>
                <Tooltip title="居中对齐" location="top"><align-text-center theme="outline" size="24" fill="#fff"/></Tooltip>

            </v-btn>
            <v-btn>
                <Tooltip title="右对齐" location="top"><align-text-right theme="outline" size="24" fill="#fff"/></Tooltip> 
            </v-btn>
        </v-btn-toggle>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { AlignTextLeft, AlignTextRight, AlignTextCenter, AddText } from '@icon-park/vue-next';
import Tooltip from '@/components/Tooltip.vue';
const textValue = ref([0]);
watch(textValue, (val) => {
    console.log(val);
});
</script>

<style scoped>
.item {
    background-color: rgb(54, 54, 54);
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
}
.v-btn--size-default{
    padding: 0 px;
}
p {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 5px;
}
</style>
