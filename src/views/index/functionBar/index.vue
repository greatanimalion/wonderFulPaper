<template>
    <div class="tool-bar">
        <Tooltip title="更多">
            <application-menu theme="outline" size="24" fill="white"/>
        </Tooltip>
        <Tooltip title="撤销">
            <back theme="outline" size="24" fill="#ffffff"/>
        </Tooltip>

        <Tooltip title="恢复">
            <next theme="outline" size="24" fill="white"/>
        </Tooltip>

        <Tooltip title="拖拽">
            <direction theme="outline" size="24" fill="#ffffff"/>
        </Tooltip>
        <Tooltip title="添加节点" @click.native="handleClick()">
            <add-three theme="outline" size="24" fill="#ffffff"/>
        </Tooltip>
        <Tooltip title="帮助">
            <help theme="outline" size="24" fill="#ffffff"/>
        </Tooltip>
    </div>
</template>

<script setup lang="ts">
import {ApplicationMenu ,Next,Back,Direction,AddThree,Help} from '@icon-park/vue-next'
import Tooltip from '@/components/Tooltip.vue';

import usePageStore from '@/store/usePageStore';
import Alert from '@/hooks/useAlert'

const pageStore = usePageStore();
const handleClick = () => {
    if (!pageStore.created) return Alert('error', '请先创建页面！')
    pageStore.openVnodePage()
}

</script>

<style scoped>
.tool-bar {
    padding: 0 5px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--bj-color);
}

.tool-bar>div {
    height: 40px;
    width: 40px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
    transition: all 0.3s;
}

.tool-bar>div:hover {
    background-color: #5e5e5e;
}

.user-options {
    text-align: center;
    font-size: 15px;
    border-radius: 5px;
    padding: 10px;
    width: 100px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.user-options:hover {

    background-color: #f5f5f5;
}
</style>