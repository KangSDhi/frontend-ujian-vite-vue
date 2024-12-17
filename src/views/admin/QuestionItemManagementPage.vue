<template>
    <BaseLayout>
        <template #content>
            <h1>{{ idSoalEnc }}</h1>
            <FormToMakeItemQuestion 
                :id-soal="decryptionIdSoal(idSoalEnc)"/>
        </template>
    </BaseLayout>
</template>

<script>
import BaseLayout from "./BaseLayout.vue";
import { decryption } from "../../functions/utils/Crypto";
import axios from "axios";
import FormToMakeItemQuestion from "../../components/admin/FormToMakeItemQuestion.vue";

export default {
    name: "QuestionItemManagementPage",
    components: {
        BaseLayout,
        FormToMakeItemQuestion,
    },
    mounted() {
        this.loadItemQuestion();
    },
    data() {
        return {
            IP_API_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            token: localStorage.getItem("auth_token"),
            idSoalEnc: this.$route.params.idSoal
        }
    },
    methods: {
        loadItemQuestion(){
            console.log(this.decryptionIdSoal(this.idSoalEnc));
            const idSoal = this.decryptionIdSoal(this.idSoalEnc);
            axios.get(`${this.IP_API_ENDPOINT}/admin/bank-soal/findbyidsoal/${idSoal}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(({ data }) => {
                console.log(data);
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