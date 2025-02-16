<template>
    <div class="container mx-auto py-5 px-2 mb-5 bg-gray-200 rounded-md shadow-lg">
        <h1 class="text-xl mb-2">Soal No {{ index + 1 }}</h1>
        <div class="flex flex-row gap-2">
            <div class="flex flex-col w-3/4">
                <QuillEditor theme="snow" v-model:content="data.pertanyaan" contentType="html" />
                <span class="text-red-500 text-sm font-bold">{{ errorUpdateItemQuestion.questionErrorMessage }}</span>
            </div>
            <div class="flex flex-col w-1/4">
                Gambar Pertanyaan
                <img v-if="data.question_image_preview == null" src="/img/image.svg" class="w-48 h-48"
                    alt="Gambar Pertanyaan Preview" srcset="">
                <img v-else :src="data.question_image_preview" class="w-48 h-48" alt="Gambar Pertanyaan Preview"
                    srcset="">
                <input type="file" @change="uploadQuestionImage" accept="image/*">
            </div>
        </div>
        <div class="flex w-3/4 justify-end">
            <h4 class="mr-16">Skor</h4>
        </div>
        <ul class="flex flex-col w-3/4 m-3">
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">A.</div>
                <div class="flex flex-col w-1/2">
                    <input type="text" v-model="data.pilihan_a"
                        class="py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        :class="{ 'border-2 border-red-500': errorUpdateItemQuestion.optionAErrorMessage }"
                        :disabled="data.option_a_image_preview != null">
                    <span class="text-red-500 text-sm font-bold">{{ errorUpdateItemQuestion.optionAErrorMessage }}</span>
                </div>
                <div class="w-1/4">
                    <input v-if="data.option_a_image_preview == null" type="file"
                        @change="uploadOptionImage($event, 'A')" accept="image/*">
                    <button v-else @click="deleteOptionImage('A')" class="h-9 px-4 bg-red-500 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <input type="number" v-model="data.nilai_a"
                    class="w-20 h-10 py-1 px-1 rounded-md border border-black text-center"
                    :class="{ 'border-2 border-red-500': errorUpdateItemQuestion.valueAErrorMessage }">
            </li>
            <li v-if="data.option_a_image_preview != null">
                <img :src="data.option_a_image_preview" alt="Gambar Pilihan A" class="w-48 h-48 ml-6 mb-2" srcset="">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">B.</div>
                <div class="flex flex-col w-1/2">
                    <input type="text" v-model="data.pilihan_b"
                        class="py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        :class="{ 'border-2 border-red-500': errorUpdateItemQuestion.optionBErrorMessage }"
                        :disabled="data.option_b_image_preview != null">
                    <span class="text-red-500 text-sm font-bold">{{ errorUpdateItemQuestion.optionBErrorMessage }}</span>
                </div>
                <div class="w-1/4">
                    <input v-if="data.option_b_image_preview == null" type="file"
                        @change="uploadOptionImage($event, 'B')" accept="image/*">
                    <button v-else @click="deleteOptionImage('B')" class="h-9 px-4 bg-red-500 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <input type="number" v-model="data.nilai_b"
                    class="w-20 h-10 py-1 px-1 rounded-md border border-black text-center"
                    :class="{ 'border-2 border-red-500': errorUpdateItemQuestion.valueBErrorMessage }">
            </li>
            <li v-if="data.option_b_image_preview != null">
                <img :src="data.option_b_image_preview" alt="Gambar Pilihan B" class="w-48 h-48 ml-6 mb-2" srcset="">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">C.</div>
                <div class="flex flex-col w-1/2">
                    <input type="text" v-model="data.pilihan_c"
                        class="py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        :class="{ 'border-2 border-red-500': errorUpdateItemQuestion.optionCErrorMessage }"
                        :disabled="data.option_c_image_preview != null">
                    <span class="text-red-500 text-sm font-bold">{{ errorUpdateItemQuestion.optionCErrorMessage }}</span>
                </div>
                <div class="w-1/4">
                    <input v-if="data.option_c_image_preview == null" type="file"
                        @change="uploadOptionImage($event, 'C')" accept="image/*">
                    <button v-else @click="deleteOptionImage('C')" class="h-9 px-4 bg-red-500 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <input type="number" v-model="data.nilai_c"
                    class="w-20 h-10 py-1 px-1 rounded-md border border-black text-center"
                    :class="{ 'border-2 border-red-500': errorUpdateItemQuestion.valueCErrorMessage }">
            </li>
            <li v-if="data.option_c_image_preview != null">
                <img :src="data.option_c_image_preview" alt="Gambar Pilihan C" class="w-48 h-48 ml-6 mb-2" srcset="">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">D.</div>
                <div class="flex flex-col w-1/2">
                    <input type="text" v-model="data.pilihan_d"
                        class="py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        :class="{ 'border-2 border-red-500': errorUpdateItemQuestion.optionDErrorMessage }"
                        :disabled="data.option_d_image_preview != null">
                    <span class="text-red-500 text-sm font-bold">{{ errorUpdateItemQuestion.optionDErrorMessage }}</span>
                </div>
                <div class="w-1/4">
                    <input v-if="data.option_d_image_preview == null" type="file"
                        @change="uploadOptionImage($event, 'D')" accept="image/*">
                    <button v-else @click="deleteOptionImage('D')" class="h-9 px-4 bg-red-500 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <input type="number" v-model="data.nilai_d"
                    class="w-20 h-10 py-1 px-1 rounded-md border border-black text-center"
                    :class="{ 'border-2 border-red-500': errorUpdateItemQuestion.valueDErrorMessage }">
            </li>
            <li v-if="data.option_d_image_preview != null">
                <img :src="data.option_d_image_preview" alt="Gambar Pilihan D" class="w-48 h-48 ml-6 mb-2" srcset="">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">E.</div>
                <div class="flex flex-col w-1/2">
                    <input type="text" v-model="data.pilihan_e"
                        class="py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        :class="{ 'border-2 border-red-500': errorUpdateItemQuestion.optionEErrorMessage }"
                        :disabled="data.option_e_image_preview != null">
                    <span class="text-red-500 text-sm font-bold">{{ errorUpdateItemQuestion.optionEErrorMessage }}</span>
                </div>
                <div class="w-1/4">
                    <input v-if="data.option_e_image_preview == null" type="file"
                        @change="uploadOptionImage($event, 'E')" accept="image/*">
                    <button v-else @click="deleteOptionImage('E')" class="h-9 px-4 bg-red-500 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <input type="number" v-model="data.nilai_e"
                    class="w-20 h-10 py-1 px-1 rounded-md border border-black text-center"
                    :class="{ 'border-2 border-red-500': errorUpdateItemQuestion.valueEErrorMessage }">
            </li>
            <li v-if="data.option_e_image_preview != null">
                <img :src="data.option_e_image_preview" alt="Gambar Pilihan E" class="w-48 h-48 ml-6 mb-2" srcset="">
            </li>
        </ul>
        <div class="flex flex-row gap-2 px-5">
            <button @click="updateItemQuestion" class="flex py-1.5 px-1 bg-blue-400 rounded-md text-base">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Update
            </button>
            <button @click="dialogToDeleteItemQuestionOpen" class="flex py-1.5 px-1 bg-red-500 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                Hapus
            </button>
        </div>
    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import axios from 'axios';
import { isObject } from '../../functions/utils/Check';

export default {
    name: "FormItemQuestion",
    props: {
        token: {
            type: String
        },
        index: {
            type: Number
        },
        data: {
            type: Object
        }
    },
    emits: [
        "isDialogToDeleteItemQuestionTrue"
    ],
    components: {
        QuillEditor
    },
    data() {
        return {
            IP_API_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            errorUpdateItemQuestion: {
                questionErrorMessage: "",
                optionAErrorMessage: "",
                optionBErrorMessage: "",
                optionCErrorMessage: "",
                optionDErrorMessage: "",
                optionEErrorMessage: "",
                valueAErrorMessage: "",
                valueBErrorMessage: "",
                valueCErrorMessage: "",
                valueDErrorMessage: "",
                valueEErrorMessage: "",
            }
        }
    },
    methods: {
        previewQuestionImage(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.data.question_image_preview = e.target.result;
            }
            reader.readAsDataURL(file);
        },
        uploadQuestionImage(event) {
            const file = event.target.files[0];
            if (file) {

                this.previewQuestionImage(file);

                const formData = new FormData();
                formData.append("file", file);

                axios.post(`${this.IP_API_ENDPOINT}/admin/minio/upload/gambar-pertanyaan`, formData, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        "Content-Type": 'multipart/form-data'
                    }
                })
                    .then(({ data }) => {
                        console.log(data);
                        this.data.gambar_pertanyaan = data.data.gambar_pertanyaan;
                        alert('Upload Gambar Pertanyaan Berhasil!');
                    })
                    .catch(({ response }) => {
                        alert('Upload Gambar Pertanyaan Gagal!');
                        console.error(response);
                    })
            }
        },
        previewOptionImage(file, option) {
            const reader = new FileReader();
            reader.onload = (e) => {
                switch (option) {
                    case 'A':
                        this.data.option_a_image_preview = e.target.result;
                        break;
                    case 'B':
                        this.data.option_b_image_preview = e.target.result;
                        break;
                    case 'C':
                        this.data.option_c_image_preview = e.target.result;
                        break;
                    case 'D':
                        this.data.option_d_image_preview = e.target.result;
                        break;
                    case 'E':
                        this.data.option_e_image_preview = e.target.result;
                        break;
                    default:
                        break;
                }
            }
            reader.readAsDataURL(file);
        },
        uploadOptionImage(event, option) {
            console.log(event);
            console.log(option);
            const file = event.target.files[0];
            if (file) {
                this.previewOptionImage(file, option);

                const formData = new FormData();
                formData.append("file", file);

                axios.post(`${this.IP_API_ENDPOINT}/admin/minio/upload/gambar-jawaban`, formData, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        "Content-Type": 'multipart/form-data'
                    }
                })
                    .then(({ data }) => {
                        switch (option) {
                            case 'A':
                                this.data.pilihan_a = data.data.gambar_jawaban;
                                break;
                            case 'B':
                                this.data.pilihan_b = data.data.gambar_jawaban;
                                break;
                            case 'C':
                                this.data.pilihan_c = data.data.gambar_jawaban;
                                break;
                            case 'D':
                                this.data.pilihan_d = data.data.gambar_jawaban;
                                break;
                            case 'E':
                                this.data.pilihan_e = data.data.gambar_jawaban;
                                break;
                            default:
                                break;
                        }

                        alert(`Upload Gambar Pilihan ${option} Berhasil!`);
                    })
                    .catch(({ response }) => {
                        alert('Upload Gambar Jawaban Gagal!');
                        console.error(response);
                    })
            }
        },
        deleteOptionImage(option) {
            switch (option) {
                case 'A':
                    this.data.pilihan_a = null;
                    this.data.option_a_image_preview = null;
                    break;
                case 'B':
                    this.data.pilihan_b = null;
                    this.data.option_b_image_preview = null;
                    break;
                case 'C':
                    this.data.pilihan_c = null;
                    this.data.option_c_image_preview = null;
                    break;
                case 'D':
                    this.data.pilihan_d = null;
                    this.data.option_d_image_preview = null;
                    break;
                case 'E':
                    this.data.pilihan_e = null;
                    this.data.option_e_image_preview = null;
                    break;
                default:
                    break;
            }
        },
        updateItemQuestion() {
            this.resetErrorForm();

            if (this.data.pertanyaan === "<p><br></p>") {
                this.data.pertanyaan = "";
            }

            axios.put(`${this.IP_API_ENDPOINT}/admin/bank-soal/update/${this.data.id}`, {
                id_soal: this.data.soal_id,
                pertanyaan: this.data.pertanyaan,
                gambar_pertanyaan: this.data.gambar_pertanyaan,
                pilihan_a: this.data.pilihan_a,
                pilihan_b: this.data.pilihan_b,
                pilihan_c: this.data.pilihan_c,
                pilihan_d: this.data.pilihan_d,
                pilihan_e: this.data.pilihan_e,
                nilai_a: this.data.nilai_a,
                nilai_b: this.data.nilai_b,
                nilai_c: this.data.nilai_c,
                nilai_d: this.data.nilai_d,
                nilai_e: this.data.nilai_e,
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    this.$router.go();
                })
                .catch(({ response }) => {
                    console.error(response);
                    const errorMessages = response.data.errors;

                    if (isObject(errorMessages)) {
                        
                        const errorMapping = {
                            "pertanyaan": "questionErrorMessage",
                            "pilihan_a": "optionAErrorMessage",
                            "pilihan_b": "optionBErrorMessage",
                            "pilihan_c": "optionCErrorMessage",
                            "pilihan_d": "optionDErrorMessage",
                            "pilihan_e": "optionEErrorMessage",
                            "nilai_a": "valueAErrorMessage",
                            "nilai_b": "valueBErrorMessage",
                            "nilai_c": "valueCErrorMessage",
                            "nilai_d": "valueDErrorMessage",
                            "nilai_e": "valueEErrorMessage",
                        }

                        Object.keys(errorMessages).forEach((key) => {
                            if (errorMapping[key]) {
                                this.errorUpdateItemQuestion[errorMapping[key]] = errorMessages[key];
                            }
                        })
                    }

                })
        },
        resetErrorForm() {
            Object.keys(this.errorUpdateItemQuestion).forEach(key => {
                this.errorUpdateItemQuestion[key] = "";
            })
        },
        dialogToDeleteItemQuestionOpen(){
            const data = {
                index: this.index,
                id: this.data.id,
                status: true
            }
            this.$emit('isDialogToDeleteItemQuestionTrue', data);
        }
    }
}
</script>