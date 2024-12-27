import { createRouter,createWebHashHistory } from "vue-router";
import Home from "@/views/index/index.vue";
import Mobile from "@/views/mobile/index.vue";

const routerInstance=createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
            alias: "/home"
        },
        {
            path: "/mobild",
            name: "Mobile",
            component: Mobile
        }
    ],
})


export default routerInstance;