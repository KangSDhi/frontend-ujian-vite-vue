<template>
    <BaseLayout>
        <template #content>
            <h1 class="text-2xl">{{ questionData.nama_soal }}</h1>
            <ListItemQuestion
                :token="token"
                :list-question="itemsQuestionData"/>
            <FormToMakeItemQuestion 
                :id-soal="decryptionIdSoal(idSoalEnc)"
                :token="token"/>
        </template>
    </BaseLayout>
</template>

<script>
import { defineAsyncComponent } from "vue";
import BaseLayout from "./BaseLayout.vue";
import { decryption } from "../../functions/utils/Crypto";
import axios from "axios";
import FormToMakeItemQuestion from "../../components/admin/FormToMakeItemQuestion.vue";

export default {
    name: "QuestionItemManagementPage",
    components: {
        BaseLayout,
        ListItemQuestion: defineAsyncComponent({
            loader: () => import('../../components/admin/ListItemQuestion.vue'),
            delay: 100,
            timeout: 3000
        }),
        FormToMakeItemQuestion,
    },
    mounted() {
        this.loadQuestion();
        this.loadItemQuestion();
    },
    data() {
        return {
            IP_API_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            token: localStorage.getItem("auth_token"),
            idSoalEnc: this.$route.params.idSoal,
            questionData: {},
            itemsQuestionData: [] 
        }
    },
    methods: {
        loadQuestion(){
            const idSoal = this.decryptionIdSoal(this.idSoalEnc);
            axios.get(`${this.IP_API_ENDPOINT}/admin/soal/findbyid/${idSoal}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(({ data }) => {
                console.log(data);
                this.questionData = data.data;
            })
            .catch(({ response }) => {
                console.error(response);
            })
        },
        loadItemQuestion(){
            const idSoal = this.decryptionIdSoal(this.idSoalEnc);
            axios.get(`${this.IP_API_ENDPOINT}/admin/bank-soal/findbyidsoal/${idSoal}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(({ data }) => {
                console.log(data);
                this.itemsQuestionData = data.data;
            })
            .catch(({ response }) => {
                console.error(response);
            })
        },
        decryptionIdSoal(idSoal) {
            return decryption(idSoal);
        }
    }
}
</script>