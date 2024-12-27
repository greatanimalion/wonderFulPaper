<template>
    <div class="container">
        <div class="item">
            <p>文字样式</p>

            <v-btn-toggle v-model="textValue" background-color="primary" dark multiple>
                <v-btn >
                    1
                </v-btn>

                <v-btn>
                    1
                </v-btn>

                <v-btn>
                    1
                </v-btn>

                <v-btn>
                    1
                </v-btn>
            </v-btn-toggle>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { AlignTextLeft } from '@icon-park/vue-next';
import { ref, watch } from 'vue';
import { ElementType } from '@/types/Vnode';
import DivType from './ELementType/DivType.vue';
import ImgType from './ELementType/ImgType.vue';

const textValue = ref([0]);
watch(textValue, (val) => {
    console.log(val);
});
</script>


<style scoped>
.container {
    display: flex;
    justify-content: center;
    gap: 5px;
}
p{
    margin: 5px;
    font-size: 0.8rem;
    font-weight: 600;
}
</style>