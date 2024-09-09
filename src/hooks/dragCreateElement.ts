/**
 * 重基本元素中拖出元素并创建新元素
*/

import { useElementStyleStore, useLayerThumbnail, usePageStore } from "@/store";
import { parseCss } from "@/utils/parseCss";
import {RevocationAndReinstatement,getElementRelativeToElement} from "@/utils";
import { Action } from "@/types/RevocationAndReinstatement";



export default function dragCreateElement(taraget: HTMLDivElement) {
    const layerThumbnail = useLayerThumbnail();
    const elementStyleStore = useElementStyleStore();
    const pageStore = usePageStore();
    taraget.ondragover = (e: DragEvent) => { e.preventDefault(); }
    taraget.ondrop = (e: DragEvent) => {
        let {finalX,finalY}=getElementRelativeToElement.default(e,taraget,'page')
        let directive = e.dataTransfer?.getData('directive').split(':') || [];
        if (directive[0] === 'create') {
            if (directive[1] === '') return
            let element = document.createElement(directive[1]);
            let id=Date.now()
            element.setAttribute('id',"el"+id)
            taraget.appendChild(element);
            element.style.cssText = elementStyleStore.getCommonElementStyle(directive[1]) || '';
            element.style.top = `${finalY}px`;
            element.style.left = `${finalX}px`;
            element.setAttribute('candrag', 'true');
            // element.setAttribute('candrag', 'true');
            element.style.position = 'absolute';
            layerThumbnail.resetLayerThumbnail(pageStore.curIndex)
            let height = parseCss(element.style.cssText, ['heigth'])['height'].replace('px', '')
            let width = parseCss(element.style.cssText, ['width'])['width'].replace('px', '')
            let curPage = pageStore.getCurrentPage()
            if (curPage) curPage.children.push({
                id,
                type: directive[1],
                el: element,
                parent: taraget,
                style: element.style.cssText,
                children: [],
                height: String(Number(height) / curPage.zoom),
                width: String(Number(width) / curPage.zoom),
                resizeHeight: height,
                resizeWidth: width,
                resizeTop: String(finalY),
                resizeLeft: String(finalX),
                left: finalX / curPage.zoom,
                top: finalY / curPage.zoom,
                heidden: false,
            })
            // 记录撤销和恢复动作
            RevocationAndReinstatement.default.doThing({
                type: 'CREATE_ELEMENT',
                pageId: pageStore.curIndex,
                revocation(){
                    // element.style.display='none'
                    let el=document.getElementById("el"+id)
                    curPage!.children[curPage!.children.length-1].heidden=true
                    if(el)el.style.display='none'
                },
                reinstatement(){
                    let el=document.getElementById("el"+id)
                    curPage!.children[curPage!.children.length-1].heidden=false
                    if(el)el.style.display='block'
                },
                destory(){
                    let el=document.getElementById("el"+id)
                    if(el)el.remove()
                    curPage?.children.pop()
                }
            } as Action)
        }
        e.preventDefault()
    }
}
