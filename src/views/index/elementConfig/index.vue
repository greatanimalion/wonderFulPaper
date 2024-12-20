<!-- <template>
    <div class="define-event event">
        <div class="event-title">
            <v-btn width="100%" color="black">
                <BgColorsOutlined />定义事件
            </v-btn>
            <div>

            </div>
        </div>
    </div>
    <div class="modify-style event">
        <div class="event-title">
            <v-btn width="49%" style="margin-right: 2%;" color="black">
                <FormOutlined />添加样式
            </v-btn>
            <div style="display: inline-block;" width="49%" @click="handleLock">
                <v-btn v-if="lockEl" color="black">
                    <LockOutlined />元素嵌入
                </v-btn>
                <v-btn v-else color="black">
                    <UnlockOutlined />元素游动
                </v-btn>
            </div>
        </div>
          <div class="modify-style-content">
            <div v-show="!!vnodeStore.curVnode">
                <div class="item">
                    <VCombobox ENname="height" :modelValue="TLHW.height" ZHname="高度" unit="px"></VCombobox>
                    <VCombobox ENname="width" :modelValue="TLHW.width" ZHname="宽度" unit="px"></VCombobox>
                    <VCombobox ENname="top" :modelValue="TLHW.top" ZHname="相对上侧" unit="px"></VCombobox>
                    <VCombobox ENname="left" :modelValue="TLHW.left" ZHname="相对左侧" unit="px"></VCombobox>
                </div>
                <div class="item" v-for="key, index in Object.keys(finalStyle)" :key="index"
                    v-show="finalStyle[key].value !== ''">
                    <VCombobox :list="finalStyle[key].list" :ZHname="finalStyle[key].descriptions" :ENname="key"
                        :modelValue="finalStyle[key].value" :unit="finalStyle[key].unit"></VCombobox>
                </div>
            </div>
        </div>
    </div>
    <div class="add-animation event">
        <div class="event-title">
            <v-btn width="100%" color="black">
                <DeploymentUnitOutlined />添加动画
            </v-btn>
        </div>
    </div>
</template> -->
    <template>
  <v-card>
    <v-tabs
      v-model="tab"
      align-tabs="center"
    >
      <v-tab value="style">样式</v-tab>
      <v-tab value="animation">动画</v-tab>
      <v-tab value="event">事件</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="component, key in components"
        :key="key"
        :value="component"
      >
      <keep-alive>
        <component :is="components[tab]"></component>
      </keep-alive>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template> 
<script setup lang="ts">
import {ref } from 'vue';
import StylePart from './components/stylePart.vue'
import AnimationPart from './components/animationPart.vue';
import EventPart from './components/eventPart.vue';
// import { FormOutlined, BgColorsOutlined, DeploymentUnitOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons-vue';
const tab=ref<keyof typeof components>('style')
const components = {
    style: StylePart,
    animation: AnimationPart,
    event: EventPart,
};
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

</script>

<style scoped lang="scss">

</style>
