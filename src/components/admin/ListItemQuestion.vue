<template>
    <h1>Jumlah Soal : {{ listQuestion.length }}</h1>
    <template v-for="(item, index) in listQuestion" :key="index">
        <FormItemQuestion :data="item" :index="index"/>
    </template>
</template>

<script>
import FormItemQuestion from './FormItemQuestion.vue';

export default {
    name: "ListItemQuestion",
    props: {
        token: {
            type: String
        },
        listQuestion: {
            type: Array
        }
    },
    components: {
        FormItemQuestion
    }
}
</script>