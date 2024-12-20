<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { type AlertInfo, newAlert } from '@/hooks/useAlert'
import { SuccessIcon, ErrorIcon, InforIcon, WarningIcon } from '@/const/SvgIcon';
const icons = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InforIcon
}
const colors = {
  success: '#67AD5B',
  error: '#FF5722',
  warning: '#FFC107',
  info: '#909399'
}
// 定义 Map，存储Alert信息集合，使用Map便于删除
const alertMap = ref<Map<string, AlertInfo>>(new Map)
watch(newAlert.value, () => {
  alertMap.value.set(newAlert.value.id, { ...newAlert.value })
  deleteAlert(newAlert.value.id)
})

const deleteAlert = (id: string) => {
  setTimeout(() => {
    alertMap.value.delete(id)
  }, 3500)
}

onBeforeMount(() => {
  let messageContent = document.createElement('div')
  messageContent.id = 'messageContent'
  messageContent.style.position = 'fixed'
  messageContent.style.top = '5%'
  messageContent.style.left = '50%'
  messageContent.style.transform = 'translateX(-50%)'
  messageContent.style.width = 'fit-content'
  messageContent.style.zIndex = '99999'
  document.documentElement.appendChild(messageContent)
})

</script>

<template>
  <Teleport to="#messageContent">
    <TransitionGroup name="list">
      <div v-for="alert in Array.from(alertMap.values())" class="modal" :key="alert.id"
        :style="{ backgroundColor: colors[alert.type] }">
        <div class="icon" v-html="icons[alert.type]"></div>
        <p>{{ alert.message }}</p>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.modal {
  border-radius: 5px;
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 15px;
  margin-top: 10px;
  text-align: center;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
p {
  height: 20px;
  width: fit-content;
  line-height: 20px;
}

.icon {
  float: left;
}

.icon {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
</style>
