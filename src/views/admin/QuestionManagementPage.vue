<template>
    <BaseLayout>
        <template #content>
            <div class="py-5">
                <h1 class="text-4xl font-sans font-semibold">Manajemen Soal</h1>
            </div>
            <QuestionsTable @questionsData="setQuestionsData($event)"
                @isFormToMakeQuestionTrue="formToMakeQuestionToggle($event)"
                @isFormToEditQuestionTrue="formToEditQuestionOpen($event)"
                @isDialogToDeleteQuestionTrue="dialogToDeleteQuestionOpen($event)" />
            <FormToMakeQuestion v-show="isFormToMakeQuestions" 
                :token="token" 
                :study-program="dataJurusan"
                :level="dataTingkat"
                @isFormToMakeQuestionFalse="formToMakeQuestionToggle($event)" />
            <FormToEditQuestion v-show="isFormToEditQuestion" 
                :token="token" 
                :study-program="dataJurusan"
                :level="dataTingkat" 
                :question-data-edit="questionDataEdit"
                @isFormToEditQuestionFalse="formToEditQuestionClose($event)"/>
            <DialogToDeleteQuestion v-show="isDialogToDeleteQuestion" 
                :token="token" 
                :question-data-delete="questionDataDelete"
                @isDialogToDeleteQuestionFalse="dialogToDeleteQuestionClose($event)" />
        </template>
    </BaseLayout>
</template>

<script>
import axios from "axios";
import BaseLayout from "./BaseLayout.vue";
import QuestionsTable from "../../components/admin/QuestionsTable.vue";
import FormToMakeQuestion from '../../components/admin/FormToMakeQuestion.vue';
import FormToEditQuestion from "../../components/admin/FormToEditQuestion.vue";
import DialogToDeleteQuestion from '../../components/admin/DialogToDeleteQuestion.vue';

export default {
    name: "DataSoal",
    data() {
        return {
            IP_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            token: localStorage.getItem("auth_token"),
            dataTingkat: [],
            dataJurusan: [],
            questionsData: [],
            isFormToMakeQuestions: false,
            questionDataEdit: {},
            isFormToEditQuestion: false,
            isDialogToDeleteQuestion: false,
            questionDataDelete: {
                id: null,
                namaSoal: null
            }
        }
    },
    components: {
        BaseLayout,
        QuestionsTable,
        FormToMakeQuestion,
        FormToEditQuestion,
        DialogToDeleteQuestion
    },
    mounted() {
        this.loadDataTingkat();
        this.loadDataJurusan();
    },
    methods: {
        loadDataTingkat() {
            axios.get(`${this.IP_ENDPOINT}/admin/tingkat`, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    this.dataTingkat = data.data;
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        loadDataJurusan() {
            axios.get(`${this.IP_ENDPOINT}/admin/jurusan`, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    this.dataJurusan = data.data;
                })
                .catch(({ response }) => {
                    console.error(response);

                });
        },
        setQuestionsData(value) {
            this.questionsData = value;
        },
        errorServerTambahSoal(value) {
            console.table(value);
            this.isFormCreateSoal = value.formCreateSoal;
            this.isErrorDialog = value.errorDialog;
            this.errorMessage = value.errorMessage;
        },
        async checkSoalById(id) {
            try {
                const { data } = await axios.get(`${this.IP_ENDPOINT}/admin/soal/findit?idSoal=${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                return data;
            } catch (error) {
                console.error(error.response);
            }
        },
        async dialogToDeleteQuestionOpen(value) {
            const data = await this.checkSoalById(value.id);
            this.questionDataDelete.id = data.data.id;
            this.questionDataDelete.namaSoal = data.data.namaSoal;
            this.isDialogToDeleteQuestion = value.status;
        },
        dialogToDeleteQuestionClose(value) {
            this.isDialogToDeleteQuestion = value;
        },
        formToMakeQuestionToggle(value) {
            this.isFormToMakeQuestions = value;
        },
        setEditQuestionData(id) {
            const data = JSON.parse(JSON.stringify(this.questionsData));
            const index = data.findIndex((item) => item.id === id);
            this.questionDataEdit = data[index];
            console.log(this.questionDataEdit.waktuMulaiSoal);
            this.questionDataEdit.waktuMulaiSoal = this.convertToDateTimeLocalFormat(data[index].waktuMulaiSoal);
            this.questionDataEdit.waktuSelesaiSoal = this.convertToDateTimeLocalFormat(data[index].waktuSelesaiSoal);
        },
        formToEditQuestionOpen(value) {
            console.log(value);
            this.setEditQuestionData(value.id);
            this.isFormToEditQuestion = value.status;
        },
        formToEditQuestionClose(value){
            this.isFormToEditQuestion = value;
        },
        convertToDateTimeLocalFormat(dateString) {
            // Split the date and time parts
            const [datePart, timePart] = dateString.split(" ");
            const [day, month, year] = datePart.split("-");

            // Reformat to 'yyyy-MM-ddThh:mm'
            return `${year}-${month}-${day}T${timePart.slice(0, 5)}`;
        }
    }
}
</script>