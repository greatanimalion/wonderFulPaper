<template>
      <div class="v-combo-box">
            <span>{{ ZHname }}:</span>
            <template v-if="handleType(props.ENname) == 'text'">
                  <input v-if="list.length == 0" :value="props.modelValue" @blur="blur" />
                  <Selection v-else :change="change" :value="props.modelValue" :items="list" />
            </template>
            <template v-else-if="handleType(props.ENname) == 'color'">
                  <input type="color" :value="props.modelValue" @input="input" />
            </template>
            <span>{{ props.unit }}</span>
      </div>
</template>

<script setup lang="ts">
import { useAttrs, watch } from 'vue';
import { useBlur, useType } from '@/hooks/useBlur';
import Selection from '@/components/Selection.vue';
import useVnodeStore from '@/store/useVnodeStore';
const vnodeStore = useVnodeStore();
//处理不同类型的数据以展现不同效果
let props = useAttrs() as {
      modelValue: string,
      ENname: string,
      unit: string,
}


const handleBlur = useBlur();
const handleType = useType();
function blur(event: any) {
      handleBlur(event.target.value, props.ENname, props.unit, props.modelValue)
}
function change(value: string) {
      handleBlur(value, props.ENname, '')
}
function input(event: any) {
      handleBlur(event.target.value, props.ENname, props.unit, props.modelValue)
}
if (handleType(props.ENname) == 'color') {
      watch(() => vnodeStore.curVnode, () => {
            console.log(props);

      })
}
defineProps({
      list: {
            type: Array<{
                  description: string,
                  value: string
            }>,
            default: []
      },
      ZHname: {
            type: String,
            default: '1'
      }
})
</script>

<style scoped lang="scss">
.v-combo-box {
      width: 230px;
      height: 30px;
      margin: 5px 0;
      display: flex;

      span {
            font-size: 14px;
            padding: 0 5px;
            text-align: center;
            color: rgb(203, 203, 203);
            line-height: 30px;
      }

      span:first-child {
            width: 100px;
      }

      span:last-child {
            width: 20px;
      }

      input {
            font-size: 14px;
            height: 30px;
            width: 60%;
            border: none;
            border-radius: 3px;
            background-color: #1a1a1a;
            color: rgb(218, 218, 218);
            transition: all 0.3s ease;
            text-align: center;

            &:focus,
            &:hover {
                  outline: none;
                  background-color: rgb(58, 58, 58)
            }
      }
}
</style>