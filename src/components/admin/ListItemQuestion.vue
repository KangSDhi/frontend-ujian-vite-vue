<template>
    <div v-if="isDataReady">
        <h1>Jumlah Soal : {{ listQuestion.length }}</h1>
        <template v-for="(item, index) in listQuestion" :key="index">
            <FormItemQuestion :data="item" :index="index" />
        </template>
    </div>
</template>

<script>
import FormItemQuestion from './FormItemQuestion.vue';
import { isUUIDWithImageExtension } from '../../functions/utils/Check';
import axios from 'axios';

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
    },
    watch: {
        listQuestion: {
            immediate: true,
            handler(newList){
                if (newList && newList.length > 0) {
                    this.initConvertListQuestion();
                }
            }
        }
    },
    data() {
        return {
            IP_API_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            isDataReady: false
        }
    },
    methods: {
        async initConvertListQuestion(){
            if (!Array.isArray(this.listQuestion) || this.listQuestion.length === 0) return;
            await this.convertListQuestion();
            this.isDataReady = true;
        },
        async convertListQuestion() {
            try {
                const updatesQuestions = [...this.listQuestion];

                for (let index = 0; index < updatesQuestions.length; index++) {

                    const question = updatesQuestions[index];
                    
                    question.question_image_preview = null;
                    question.option_a_image_preview = null;
                    question.option_b_image_preview = null;
                    question.option_c_image_preview = null;
                    question.option_d_image_preview = null;
                    question.option_e_image_preview = null;

                    await Promise.all(
                        Object.keys(question).map(async (key) => {
                            if (key === "gambar_pertanyaan" && isUUIDWithImageExtension(this.listQuestion[index][key])) {
                                const questionImage = question[key];
                                const response = await this.getQuestionImage(questionImage);
                                if (response && response.data.url) {
                                    console.log("Gambar Pertanyaan Valid!");
                                    question.question_image_preview = response.data.url;
                                }
                            }

                            if (key === "pilihan_a" && isUUIDWithImageExtension(question[key])) {
                                const optionImage = question[key];
                                const response = await this.qetOptionImage(optionImage);
                                if (response && response.data.url) {
                                    console.log("Gambar Pilihan A Valid!");
                                    question.option_a_image_preview = response.data.url;
                                }
                            }

                            if (key === "pilihan_b" && isUUIDWithImageExtension(question[key])) {
                                const optionImage = question[key];
                                const response = await this.qetOptionImage(optionImage);
                                if (response && response.data.url) {
                                    console.log("Gambar Pilihan B Valid!");
                                    question.option_b_image_preview = response.data.url;
                                }
                            }

                            if (key === "pilihan_c" && isUUIDWithImageExtension(question[key])) {
                                const optionImage = question[key];
                                const response = await this.qetOptionImage(optionImage);
                                if (response && response.data.url) {
                                    console.log("Gambar Pilihan C Valid!");
                                    question.option_c_image_preview = response.data.url;
                                }
                            }

                            if (key === "pilihan_d" && isUUIDWithImageExtension(question[key])) {
                                const optionImage = question[key];
                                const response = await this.qetOptionImage(optionImage);
                                if (response && response.data.url) {
                                    console.log("Gambar Pilihan D Valid!");
                                    question.option_d_image_preview = response.data.url;
                                }
                            }

                            if (key === "pilihan_e" && isUUIDWithImageExtension(question[key])) {
                                const optionImage = question[key];
                                const response = await this.qetOptionImage(optionImage);
                                if (response && response.data.url) {
                                    console.log("Gambar Pilihan E Valid!");
                                    question.option_e_image_preview = response.data.url;
                                }
                            }
                        })
                    );
                }

                this.$emit("update:listQuestion", updatesQuestions);
            } catch (error) {
                console.error("Error in convertListQuestion: ", error);
            }
        },
        async getQuestionImage(value) {
            try {
                const response = await axios.get(`${this.IP_API_ENDPOINT}/admin/minio/get/gambar-pertanyaan?gambarPertanyaan=${value}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                return response.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
        async qetOptionImage(value) {
            try {
                const response = await axios.get(`${this.IP_API_ENDPOINT}/admin/minio/get/gambar-jawaban?gambarJawaban=${value}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });

                return response.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    }
}
</script>