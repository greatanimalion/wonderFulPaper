<template>
    <div class="container">
        <div class="item">
            <p>位置信息</p>
            <VCombobox ENname="height" :modelValue="1" ZHname="高度" unit="px"></VCombobox>
            <VCombobox ENname="width" :modelValue="1" ZHname="宽度" unit="px"></VCombobox>
            <VCombobox ENname="top" :modelValue="1" ZHname="相对上侧" unit="px"></VCombobox>
            <VCombobox ENname="left" :modelValue="1" ZHname="相对左侧" unit="px"></VCombobox>
        </div>
        <div class="item">
            <p>文字样式</p>
            <div class="warp">
                <v-btn-toggle v-model="textValue" background-color="primary" dark multiple>
                    <v-btn>
                        居中
                    </v-btn>

                    <v-btn>
                        居右
                    </v-btn>

                    <v-btn>
                        居左
                    </v-btn>

                    <v-btn>
                        1
                    </v-btn>
                </v-btn-toggle>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import VCombobox from '@/components/vComBoBox.vue';
import { ElementType } from '@/types/Vnode';
import DivType from './ELementType/DivType.vue';
import ImgType from './ELementType/ImgType.vue';

const textValue = ref([0]);
watch(textValue, (val) => {
    console.log(val);
});
</script>


<style scoped>
.warp {
    margin: 10px 0;
}

.item {
    background-color: rgb(54, 54, 54);
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
}

p {
    font-size: 0.8rem;
    font-weight: 600;
}
</style>