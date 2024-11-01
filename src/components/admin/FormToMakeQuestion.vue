<template>
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div class="z-50 bg-white dark:bg-gray-900 px-16 py-14 rounded-md">
            <h1 class="text-xl mb-4 font-bold dark:text-slate-200 text-slate-500">Tambah Soal</h1>
            <div class="grid md:grid-cols-2 gap-1">
                <div>
                    <label for="input-question-name"
                        class="block mb-2 text-sm font-medium dark:text-slate-300 text-slate-900">
                        Nama Soal
                    </label>
                    <input id="input-question-name" type="text" v-model="dataCreateQuestions.questionName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{ 'border-2 border-red-400 dark:border-2 dark:border-red-500': errorCreateQuestions.questionNameErrorMessage }">
                    <span class="text-red-500 text-sm font-bold"> {{ errorCreateQuestions.questionNameErrorMessage
                        }}</span>
                </div>
                <div>
                    <label for="input-question-level"
                        class="block mb-2 text-sm font-medium dark:text-slate-300 text-slate-900">Tingkat</label>
                    <select id="input-question-level" v-model="dataCreateQuestions.questionLevel"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{ 'border-2 border-red-400 dark:border-2 dark:border-red-500': errorCreateQuestions.questionLevelErrorMessage }">
                        <template v-for="(item, index) in level" :key="index">
                            <option :value="item.tingkat">{{ item.tingkat }}</option>
                        </template>
                    </select>
                    <span class="text-red-500 text-sm font-bold">{{ errorCreateQuestions.questionLevelErrorMessage
                        }}</span>
                </div>
                <div>
                    <label for="input-question-study-program"
                        class="block mb-2 text-sm font-medium dark:text-slate-300 text-slate-900">Jurusan</label>
                    <select id="input-question-study-program" v-model="dataCreateQuestions.questionStudyProgram"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{ 'border-2 border-red-400 dark:border-2 dark:border-red-500': errorCreateQuestions.questionStudyProgramErrorMessage }">
                        <option :value="null">Semua Jurusan</option>
                        <template v-for="(item, index) in studyProgram" :key="index">
                            <option :value="item.jurusan">{{ item.jurusan }}</option>
                        </template>
                    </select>
                    <span class="text-red-500 text-sm font-bold">{{
                        errorCreateQuestions.questionStudyProgramErrorMessage
                        }}</span>
                </div>
                <div>
                    <label for="input-question-shuffle"
                        class="block mb-2 text-sm font-medium dark:text-slate-300 text-slate-900">Acak</label>
                    <select id="input-question-shuffle" v-model="dataCreateQuestions.questionShuffle"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{ 'border-2 border-red-400 dark:border-2 dark:border-red-500': errorCreateQuestions.questionShuffleErrorMessage }">
                        <option value="ACAK">Acak</option>
                        <option value="TIDAK_ACAK">Tidak Acak</option>
                    </select>
                    <span class="text-red-500 text-sm font-bold">{{ errorCreateQuestions.questionShuffleErrorMessage
                        }}</span>
                </div>
                <div>
                    <label for="input-question-item"
                        class="block mb-2 text-sm font-medium dark:text-slate-300 text-slate-900">Butir</label>
                    <input id="input-question-item" type="number" v-model="dataCreateQuestions.questionItem"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{ 'border-2 border-red-400 dark:border-2 dark:border-red-500': errorCreateQuestions.questionItemErrorMessage }">
                    <span class="text-red-500 text-sm font-bold">{{ errorCreateQuestions.questionItemErrorMessage
                        }}</span>
                </div>
                <div>
                    <label for="input-question-type"
                        class="block mb-2 text-sm font-medium dark:text-slate-300 text-slate-900">Tipe</label>
                    <select id="input-question-type" v-model="dataCreateQuestions.questionType"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{ 'border-2 border-red-400 dark:border-2 dark:border-red-500': errorCreateQuestions.questionTypeErrorMessage }">
                        <option value="PILIHAN_GANDA">Pilihan Ganda</option>
                        <option value="ESSAI">Essai</option>
                    </select>
                    <span class="text-red-500 text-sm font-bold">{{ errorCreateQuestions.questionTypeErrorMessage
                        }}</span>
                </div>
                <div>
                    <label for="input-question-start-time"
                        class="block mb-2 text-sm font-medium dark:text-slate-300 text-slate-900">Waktu
                        Mulai</label>
                    <input id="input-question-start-time" type="datetime-local"
                        v-model="dataCreateQuestions.questionStartTime"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{ 'border-2 border-red-400 dark:border-2 dark:border-red-500': errorCreateQuestions.questionStartTimeErrorMessage }">
                    <span class="text-red-500 text-sm font-bold">{{ errorCreateQuestions.questionStartTimeErrorMessage
                        }}</span>
                </div>
                <div>
                    <label for="input-question-end-time"
                        class="block mb-2 text-sm font-medium dark:text-slate-300 text-slate-900">Waktu
                        Selesai</label>
                    <input id="input-question-end-time" type="datetime-local"
                        v-model="dataCreateQuestions.questionEndTime"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{ 'border-2 border-red-400 dark:border-2 dark:border-red-500': errorCreateQuestions.questionEndTimeErrorMessage }">
                    <span class="text-red-500 text-sm font-bold">{{ errorCreateQuestions.questionEndTimeErrorMessage
                        }}</span>
                </div>
                <div>
                    <label for="input-question-duration"
                        class="block mb-2 text-sm font-medium dark:text-slate-300 text-slate-900">Durasi</label>
                    <input id="input-question-duration" type="text" pattern="^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$"
                        v-model="dataCreateQuestions.questionDuration"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{ 'border-2 border-red-400 dark:border-2 dark:border-red-500': errorCreateQuestions.questionDurationErrorMessage }"
                        required>
                    <span class="text-red-500 text-sm font-bold">{{ errorCreateQuestions.questionDurationErrorMessage
                        }}</span>
                </div>
            </div>
            <div class="flex mt-3 justify-end gap-2">
                <button @click="createQuestions"
                    class="px-5 py-2.5 bg-blue-200 dark:bg-blue-400 hover:bg-blue-300 dark:hover:bg-blue-500 text-sm rounded-lg inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                    </svg>
                    Simpan
                </button>
                <button @click="formToMakeQuestionsClose"
                    class="px-5 py-2.5 bg-gray-200 dark:bg-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm rounded-lg inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    Batal
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "FormTambahSoal",
    props: {
        token: {
            type: String
        },
        studyProgram: {
            type: Array
        },
        level: {
            type: Array
        }
    },
    data() {
        return {
            IP_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            dataCreateQuestions: {
                questionName: "",
                questionLevel: "",
                questionStudyProgram: null,
                questionShuffle: "ACAK",
                questionItem: 0,
                questionType: "PILIHAN_GANDA",
                questionDuration: "00:00:00",
                questionStartTime: "",
                questionEndTime: ""
            },
            errorCreateQuestions: {
                questionNameErrorMessage: "",
                questionLevelErrorMessage: "",
                questionStudyProgramErrorMessage: "",
                questionShuffleErrorMessage: "",
                questionItemErrorMessage: "",
                questionTypeErrorMessage: "",
                questionDurationErrorMessage: "",
                questionStartTimeErrorMessage: "",
                questionEndTimeErrorMessage: ""
            },
        }
    },
    methods: {
        createQuestions() {
            console.table(this.dataCreateQuestions);
            axios.post(`${this.IP_ENDPOINT}/admin/soal/create`, {
                namaSoal: this.dataCreateQuestions.questionName,
                tingkatSoal: this.dataCreateQuestions.questionLevel,
                jurusanSoal: this.dataCreateQuestions.questionStudyProgram,
                acakSoal: this.dataCreateQuestions.questionShuffle,
                butirSoal: this.dataCreateQuestions.questionItem,
                tipeSoal: this.dataCreateQuestions.questionType,
                durasiSoal: this.dataCreateQuestions.questionDuration,
                waktuMulaiSoal: this.formatDate(this.dataCreateQuestions.questionStartTime),
                waktuSelesaiSoal: this.formatDate(this.dataCreateQuestions.questionEndTime)
            }, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    window.location.reload();
                })
                .catch(({ response }) => {
                    console.error(response);

                    this.resetErrorForm();

                    const errorMessages = response.data.errors;
                    
                    if (this.isObject(errorMessages)) {
                        Object.keys(errorMessages).forEach((key) => {
                            if (key == "namaSoal") {
                                this.errorCreateQuestions.questionNameErrorMessage = errorMessages[key];
                            }

                            if (key == "acakSoal") {
                                this.errorCreateQuestions.questionShuffleErrorMessage = errorMessages[key];
                            }

                            if (key == "butirSoal") {
                                this.errorCreateQuestions.questionItemErrorMessage = errorMessages[key];
                            }

                            if (key == "durasiSoal") {
                                this.errorCreateQuestions.questionDurationErrorMessage = errorMessages[key];
                            }

                            if (key == "jurusanSoal") {
                                this.errorCreateQuestions.questionStudyProgramErrorMessage = errorMessages[key];
                            }

                            if (key == "tingkatSoal") {
                                this.errorCreateQuestions.questionLevelErrorMessage = errorMessages[key];
                            }

                            if (key == "tipeSoal") {
                                this.errorCreateQuestions.questionTypeErrorMessage = errorMessages[key];
                            }

                            if (key == "waktuMulaiSoal") {
                                this.errorCreateQuestions.questionStartTimeErrorMessage = errorMessages[key];
                            }

                            if (key == "waktuSelesaiSoal") {
                                this.errorCreateQuestions.questionEndTimeErrorMessage = errorMessages[key];
                            }
                        })
                    }
                });
        },
        formatDate(value) {
            const date = new Date(value);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}-${month}-${year} ${hours}:${minutes}:00`;
        },
        isObject(value) {
            return (
                typeof value === 'object' && value !== null && !Array.isArray(value)
            );
        },
        formToMakeQuestionsClose() {
            this.resetForm();

            this.resetErrorForm();

            this.$emit('isFormToMakeQuestionFalse', false);
        },
        resetForm() {
            this.dataCreateQuestions.questionName = "";
            this.dataCreateQuestions.questionLevel = "";
            this.dataCreateQuestions.questionStudyProgram = null;
            this.dataCreateQuestions.questionShuffle = "ACAK";
            this.dataCreateQuestions.questionItem = 0;
            this.dataCreateQuestions.questionType = "PILIHAN_GANDA";
            this.dataCreateQuestions.questionDuration = "00:00:00";
            this.dataCreateQuestions.questionStartTime = "";
            this.dataCreateQuestions.questionEndTime = "";
        },
        resetErrorForm() {
            this.errorCreateQuestions.questionNameErrorMessage = "";
            this.errorCreateQuestions.questionShuffleErrorMessage = "";
            this.errorCreateQuestions.questionItemErrorMessage = "";
            this.errorCreateQuestions.questionDurationErrorMessage = "";
            this.errorCreateQuestions.questionStudyProgramErrorMessage = "";
            this.errorCreateQuestions.questionLevelErrorMessage = "";
            this.errorCreateQuestions.questionTypeErrorMessage = "";
            this.errorCreateQuestions.questionStartTimeErrorMessage = "";
            this.errorCreateQuestions.questionEndTimeErrorMessage = "";
        }
    }
}
</script>