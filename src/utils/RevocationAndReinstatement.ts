import { Action } from "@/types/RevocationAndReinstatement"

//撤销栈
let revocationStack : Action[]=[]
//恢复栈
let reinstatementStack : Action[]=[]
/**
 * @description: 撤销某个操作，并将其加入恢复栈中
*/
function revocation(pageId:number) {
    let index=revocationStack.findLastIndex(action=>action.pageId===pageId);
    if(index===-1) return;
    let action = revocationStack.splice(index,1)[0];
    action.revocation();
    reinstatementStack.push(action);
}
/**
 * @description: 恢复某个操作，并将其加入撤销栈中
*/
function reinstatement(pageId:number) {
    let index=reinstatementStack.findLastIndex(action=>action.pageId===pageId);
    if(index===-1) return;
    let action = reinstatementStack.splice(index,1)[0];
    action.reinstatement();
    revocationStack.push(action);
}
/**
 * @description: 执行某个操作，并将其加入撤销栈中
 * @param {any} action 要执行的操作
*/
function doThing(action:Action){
    revocationStack.push(action);
    if(revocationStack.length>50){
        revocationStack.shift()?.destory();
    }
}


export default {
    doThing,
    revocation,
    reinstatement,
}