<template>
    <div class="show-content">
        <div class="add-page" v-show="!page.create">
            <div>
                <v-sheet theme="light" class="mx-auto" width="300">
                    <v-form @submit.prevent>
                        <v-text-field v-model="page.width" label="宽度"></v-text-field>
                        <v-text-field v-model="page.height" label="高度"></v-text-field>
                        <v-btn class="mt-2" @click="createPage" block>创建页面</v-btn>
                    </v-form>
                </v-sheet>
            </div>
        </div>
        <div v-show="page.create" class="content" ref="content">
            <div class="operateContent"
                :style="{transformOrigin: '0 0', width: `${page.width}px`, height: `${page.height}px`, position: 'relative' }"
                ref="operateContent" ></div>
            <Operate ref="operate" ></Operate>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import Alert from '@/hooks/useAlert';
import { reactive, ref } from 'vue';
import useLayerImgStore from '@/store/useLayerImgStore';
import usePageStore from '@/store/usePageStore';
import useVnodeStore from '@/store/useVnodeStore';
import Operate from '@/components/Operate.vue';
import { elementFromPoint } from '@/utils/elementFromPoint';
import { initHTMLDrag } from '@/hooks/useDrag';
import simulateClick, { initContainer } from '@/utils/simulateClick';
import useOperateRef from '@/hooks/useOperateRef.ts';
const content = ref<HTMLDivElement>()
const operateContent = ref<HTMLDivElement>()
const operate = ref<InstanceType<typeof Operate>>();
const vnodeStore = useVnodeStore();
const layerImgStore = useLayerImgStore();
const pageStore = usePageStore();
const operateRef = useOperateRef();
let zoom = 1;
let zoomStep = 0.1;
const page = reactive<{ width: string, height: string, create: boolean }>({
    width: '1440',
    height: '720',
    create: false
})
function initPage() {
    vnodeStore.init();
    content.value!.style.height = page.height + 'px';
    content.value!.style.width = page.width + 'px';
    let top = (content.value!.parentElement?.clientHeight || 0) / 2 - (Number(page.height) || 0) / 2;
    if (top > 0) content.value!.style.top = `${top}px`;
    layerImgStore.setLayerImg(content.value)
    initContainer(operateContent.value!)
}
function createPage() {
    if (!pageStore.init(page.width, page.height)) return
    page.create = true;
    //初始化页面
    initPage();
    //初始化鼠标拖拽
    initHTMLDrag(operateContent.value!)
    let div: any
    operateContent.value!.addEventListener('dragover', (event) => {
        event.preventDefault();
        let target = elementFromPoint(event)
        if (target == div) return
        div = target
        if (target) {
            if (target.id.startsWith('el')) {
                simulateClick(event.clientX, event.clientY)
            }
            else { vnodeStore.clearTarget(); }
        }
    });
    operateContent.value!.addEventListener('drop', (event) => {
        event.preventDefault();
        vnodeStore.createSubVnode(vnodeStore.curVnode, { type: event.dataTransfer!.getData('tag') as any })
        event.dataTransfer!.setData('tag', '')
    })
    //监听鼠标放大缩小
    window.addEventListener('mousewheel', function (event: any) {
        if (!event.ctrlKey) return;
        event.preventDefault();
        let visualSpace = content.value
        if (!visualSpace) return
        let Pagecontent = visualSpace.firstChild as HTMLDivElement
        zoom = +(zoom + (event.deltaY > 0 ? zoomStep : -zoomStep)).toFixed(2);
        if (zoom < 0.1) return Alert('error', '防缩不能小于0.1')
        //真实展现
        Pagecontent.style.scale = zoom.toString();
        //虚拟容器
        visualSpace.style.height = +page.height * zoom + 'px';
        visualSpace.style.width = +page.width * zoom + 'px';
        let top = ((content.value!.parentElement?.clientHeight || 0) / 2 - (Number(+page.height * zoom) / 2)).toFixed(2);
        if (+top > 0) content.value!.style.top = `${top}px`;
        else content.value!.style.top = '0';
        pageStore.scale = zoom;
        if (vnodeStore.curVnode) {
            operateRef.scale(zoom)
        }
    }, { passive: false });
}
//重写右键菜单
let muen: HTMLDivElement | null = null;
onMounted(() => {
    let container = document.querySelector<HTMLDivElement>('.show-content')!
    container.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    container.addEventListener('mousedown', function (e) {
        if (e.button === 2) {
            muen = muen || document.querySelector<HTMLDivElement>('#menu-vnode')!
            muen.style.display = 'block'
            muen.style.left = e.clientX + 'px'
            muen.style.top = e.clientY + 'px'
        }
        else {
            setTimeout(() => {
                if (muen) muen.style.display = 'none'
            }, 100)
        }
    })
})
</script>
<style scoped lang="scss">
.show-content {
    padding: 10px;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;
    height: calc(100vh - 55px);
}

.show-content::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.add-page {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
}

.content {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    background-color: rgb(255, 255, 255);
    position: relative;
    margin: auto;

}
</style>