<template>
    <v-card style="min-width:270px;">
        <v-tabs v-model="tab" align-tabs="center">
            <v-tab value="style">样式</v-tab>
            <v-tab value="animation">动画</v-tab>
            <v-tab value="event">事件</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
            <v-tabs-window-item style="height: 100vh;" v-for="(i, key) in Object.keys(components)" :key="key"
                :value="i">
                <component :is="components[i]"></component>
            </v-tabs-window-item>
        </v-tabs-window>
    </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import StylePart from './components/stylePart.vue'
import AnimationPart from './components/animationPart.vue';
import EventPart from './components/eventPart.vue';
const tab = ref<keyof typeof components>('style')
const components = {
    style: StylePart,
    animation: AnimationPart,
    event: EventPart,
} as Record<string, any>;

</script>






// import useVnodeStore from '@/store/useVnodeStore';
// import parseCssToObject from '@/utils/parseCssToObject';
// import styleSheet from '@/const/styleList';
// import VCombobox from '@/components/vComBoBox.vue';
// import invertRGBtoHex from '@/utils/invertRGBtoHex'
// import { useBlur } from '@/hooks/useBlur';
// import { type Item } from '@/types/StyleItem';
// const handleBlur = useBlur();
// const vnodeStore = useVnodeStore();
// const lockEl = ref(false)
// let TLHW = computed(() => {
//     return {
//         height: vnodeStore.curVnode?.height ? vnodeStore.curVnode.height.toFixed(0) : '0',
//         width: vnodeStore.curVnode?.width ? vnodeStore.curVnode.width.toFixed(0) : '0',
//         top: vnodeStore.curVnode?.top ? vnodeStore.curVnode?.top.toFixed(0) : '0',
//         left: vnodeStore.curVnode?.left ? vnodeStore.curVnode?.left.toFixed(0) : '0'
//     }
// })
// let finalStyle = reactive((() => {
//     let item: any = {};
//     for (let key in styleSheet) {
//         item[key] = {};
//         item[key].key = key;
//         item[key].descriptions = styleSheet[key].descriptions;
//         item[key].value = '';
//         item[key].list = markRaw(styleSheet[key].list || []);
//         item[key].unit = '';
//     }
//     return item as Item;
// })())

// function handleLock() {
//     if (!vnodeStore.curVnode) return;
//     handleBlur(lockEl ? 'absolute' : 'relative', 'position', '')
//     lockEl.value = !lockEl.value

// }
// watch(() => vnodeStore.curVnode, () => {
//     if (!!!vnodeStore.curVnode) return
//     if (!!!vnodeStore.curVnode.parent) return //保证不是根节点    
//     let cssObject = parseCssToObject(vnodeStore.curVnode!.HTML!.style.cssText);
//     for (let key in cssObject) {
//         if (!finalStyle[key]) finalStyle[key] = { descriptions: '', value: '', list: [], unit: '' };
//         if (key == 'position') { cssObject[key] == 'absolute' ? lockEl.value = false : lockEl.value = true; continue; }
//         if (key === 'background-color' || key === 'color') {
//             //由于cssText自动将color值转换为rgb而input的type=color时,value属性只接受hex,所以需要将其转换为hex
//             finalStyle[key].value = invertRGBtoHex(finalStyle[key].value!)
//             continue;
//         }
//         finalStyle[key].value = cssObject[key].replace(/px|%|em|rem/g, '');
//         finalStyle[key].unit = (cssObject[key].match(/px|%|em|rem/)?.[0] || '');
//     }
// })


