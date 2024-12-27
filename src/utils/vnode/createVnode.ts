import { drawBezierCurveFromParent } from "@/hooks/useDraw";
import { useElementStyleStore } from "@/store";
import { Vnode, VnodeOptions,ElementType } from "@/types/Vnode";
import VnodeStore from "@/store/useVnodeStore";

let _id=0
export function creatUUID():number{
    return _id++
}
export function creatUUIDToString():string{
    return creatUUID().toString()
}

export const getTag=(type:ElementType)=>{
    switch (type) {
        case ElementType.DIV:
            return 'div'
        case ElementType.INPUT:
            return 'input'
        case ElementType.TEXTAREA:
            return 'textarea'
        case ElementType.IMG:
            return 'img'
        case ElementType.CANVAS:
            return 'canvas'
        case ElementType.AUDIO:
            return 'audio'
        case ElementType.VIDEO:
            return 'video'
        default:
            return 'div'
    }
}

export const createNodeHTML = (vnode: Vnode): HTMLDivElement => {
    let element = document.createElement(getTag(vnode.type)) as HTMLDivElement
    element.id = "el" + vnode.id
    element.style.cssText=vnode.style
    element.style.top = vnode.top + 'px'
    element.style.left = vnode.left + 'px'
    element.style.width = vnode.width + 'px'
    element.style.height = vnode.height + 'px'
    element.style.position = vnode.parent?.drag ? 'absolute' : 'relative'
    if (vnode.type == ElementType.INPUT) element.setAttribute('autocomplete', 'off')
    return element
}
export const createVnodeHTML = (vnode: Vnode) => {
    let element = document.createElement(getTag(vnode.type)) as HTMLDivElement;
    element.className='vnode'+vnode.id;
    element.innerText=""+(vnode.name||vnode.id);
    vnode.name=String(vnode.id);
    element.style.cssText='background-color: #fff;border-radius: 5px;padding: 5px;position: absolute;z-index: 10';
    element.style.top = vnode.vTop + 'px';
    element.style.left = vnode.vLeft + 'px';
    element.style.minWidth = vnode.vWidth + 'px';
    element.style.height = '34px';
    drawBezierCurveFromParent(vnode);/*绘制曲线*/
    return element;
}

function vnodeFactory(options: VnodeOptions, parent: Vnode | null, style: string): Vnode {
    return {
        id: creatUUID(),
        parent: parent,
        children: [],
        vTop: options.vTop || 20,
        vLeft: options.vLeft || 20,
        vWidth: options.vWidth || 80,
        vHeight: options.vHeight || 34,
        top: options.top || 0,
        left: options.left || 0,
        width: options.width || 80,
        height: options.height || 40,
        type: options.type || ElementType.DIV,
        style: style,
        events: {},
        vHTML: null,
        name: options.name || '',
        drag: true,
        HTML: null,
    }
}
function createVnode(options: any) {
    let curVnode = VnodeStore().curVnode;
    let styleStore = useElementStyleStore();
    let style = styleStore.getCommonElementStyle(getTag(options.type));
    let parentNode= curVnode ||VnodeStore().plainVnode[0]|| null;
    let container: HTMLDivElement=curVnode?.HTML||document.querySelector<HTMLDivElement>('.operateContent')!;
    let vnode = vnodeFactory(options,parentNode, style);

    vnode.HTML = createNodeHTML(vnode);
    vnode.vHTML = createVnodeHTML(vnode);

    document.querySelector<HTMLDivElement>('.contain-box')?.appendChild(vnode.vHTML);/*添加vdom*/
    if(vnode.id===0)return vnode;
    container.appendChild(vnode.HTML) ;/*添加dom*/
    return vnode;
}

export default createVnode; 