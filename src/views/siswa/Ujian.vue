<template>
    <div v-if="dataSoal" class="container mx-auto">
        <div class="grid md:grid-cols-3 grid-cols-1">
            <div class="col-span-2">
                <div class="grid grid-cols-2 mt-11 mr-2 ml-2">
                    <div class="font-sans text-xl">
                        Pertanyaan No. {{ indexSoal + 1 }}
                    </div>
                    <div class="justify-self-end font-sans font-semibold text-2xl">
                        {{ examTimeData.hours }} : {{ examTimeData.minutes }} : {{ examTimeData.seconds }}
                    </div>
                </div>
                <div class="flex mt-2 mb-2 ml-2 text-3xl">
                    {{ dataSoal[indexSoal].pertanyaan }}
                </div>
                <div v-show="isImageQuestionShow">
                    <img :src="imageQuestion" class="max-h-72 m-2 border-solid border-2 border-black rounded-lg" alt="Gambar Pertanyaan">
                </div>
                <div v-for="(option, optionIndex) in options" class="flex ml-2 items-center">
                    <input type="radio" v-model="dataSoal[indexSoal].jawaban" :value="option.value"
                        @change="changeAnswer(indexSoal)"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <template v-if="option.isImageExists">
                        <img :src="option.label" class="max-h-44 m-2 border-solid border-2 border-black rounded-lg" alt="Gambar Jawaban">
                    </template>
                    <template v-else>
                        <label for="default-radio-1" class="ms-3 text-2xl font-medium text-gray-900">
                            {{ option.label }}
                        </label>
                    </template>
                </div>
                <div class="flex mt-2 gap-2 justify-center md:justify-start">
                    <button @click="prevQuestion()"
                        class="px-5 py-2.5 text-md rounded-lg font-medium text-black inline-flex items-center bg-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 me-2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Sebelumnya
                    </button>
                    <!-- <button @click="raguSoal(indexSoal)" class="text-black bg-yellow-400 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2">Ragu</button> -->
                    <div class="flex items-center bg-yellow-400 rounded-lg px-5 py-2.5">
                        <input type="checkbox" v-model="examStatusQuestion.hesitate"
                            @change="hesitateQuestion(indexSoal)"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="" class="ms-2 items-center text-md inline-flex font-medium text-black">
                            Ragu
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5 ms-1">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                        </label>
                    </div>
                    <template v-if="dataSoal.length - 1 == indexSoal">
                        <template v-if="isButtonFinishOpen">
                            <button @click="isActiveModalFinishExam = true"
                                class="px-5 py-2.5 text-md rounded-lg font-medium text-black inline-flex items-center bg-green-400">
                                Selesai
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ms-2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                                </svg>
                            </button>
                        </template>
                        <template v-else>
                            <button disabled
                                class="text-black bg-gray-400 font-semibold rounded-lg text-md px-5 py-2.5">{{
                                    activeFinishButtonTimeData.minutes }} : {{ activeFinishButtonTimeData.seconds
                                }}</button>
                        </template>
                    </template>
                    <template v-else>
                        <button @click="nextQuestion()"
                            class="px-5 py-2.5 text-md rounded-lg font-medium text-black inline-flex items-center bg-blue-400">
                            Selanjutnya
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5 ms-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </template>
                </div>
            </div>
            <div class="mt-11">
                <h3 class="text-2xl font-sans font-semibold mb-2">
                    Navigasi Soal
                </h3>
                <div class="grid grid-cols-5 justify-items-center place-items-center gap-2">
                    <template v-for="(dataSoalItem, dataSoalIndex) in dataSoal">
                        <RouterLink
                            :to="{ name: 'Ujian Siswa Page', params: { idSoal: this.idSoal, indexSoal: dataSoalIndex } }"
                            :class="backgroundNavigatorQuestion(dataSoalIndex, dataSoalItem.statusPertanyaan)"
                            class="text-black rounded-lg w-full h-20 shadow-xl flex items-center justify-center">
                            {{ dataSoalIndex + 1 }}
                        </RouterLink>
                    </template>
                </div>
            </div>
        </div>
        <div v-show="isActiveModalFinishExam"
            class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div class="bg-white px-16 py-10 rounded-md text-center">
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-2/6 fill-yellow-500">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                </div>
                <h1 class="text-xl mb-4 font-bold text-slate-500">Apakah Anda Ingin Mengakhiri Ujian?</h1>
                <div class="grid grid-cols-2 gap-1">
                    <button @click="finishExam()"
                        class="bg-blue-500 px-4 py-2 rounded-md text-md font-semibold text-white">Selesai</button>
                    <button @click="isActiveModalFinishExam = false"
                        class="bg-red-500 px-4 py-2 rounded-md text-md font-semibold text-white ml-1">Batal</button>
                </div>
            </div>
        </div>
        <div v-show="isError"
            class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div class="bg-white px-16 py-14 rounded-md text-center">
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-2/6 fill-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <h1 class="text-xl mb-4 font-bold text-black">{{ errorMessage }}</h1>
                <div class="grid grid-cols-1">
                    <button @click="isError = false"
                        class="bg-gray-500 px-4 py-2 rounded-md text-md font-semibold text-white">Ok</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";

export default {
    data() {
        return {
            IP_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            token: localStorage.getItem("auth_token"),
            idSoal: this.$route.params.idSoal,
            indexSoal: parseInt(this.$route.params.indexSoal),
            dataSoal: null,
            examStatus: null,
            examFinishTime: null,
            examFinishInterval: 0,
            finishButtonInterval: 0,
            activeTimeFinishesExam: null,
            isImageQuestionShow: false,
            imageQuestion: null,
            options: [],
            examStatusQuestion: {
                hesitate: false
            },
            examTimeData: {
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            isButtonFinishOpen: false,
            activeFinishButtonTimeData: {
                minutes: 0,
                seconds: 0
            },
            isActiveModalFinishExam: false,
            isError: false,
            errorMessage: null,
        }
    },
    mounted() {
        this.loadItemQuestion();
        this.startCountdownExam();
        this.examFinishInterval = setInterval(this.startCountdownExam, 1000);
        this.finishButtonInterval = setInterval(this.startCountdownExamFinishButton, 1000);
        document.addEventListener("visibilitychange", this.handleVisibilityChange);
    },
    watch: {
        '$route.params.indexSoal': {
            handler(newIndex) {
                this.indexSoal = parseInt(newIndex);
                this.initializeQuestionImage();
                this.initializeOptions();
            },
            immediate: true
        }
    },
    methods: {
        loadItemQuestion() {
            axios.get(`${this.IP_ENDPOINT}/siswa/ujian?idSoal=${this.idSoal}`, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    this.dataSoal = data.data.soal;
                    this.examFinishTime = data.data.waktuSelesaiUjian;
                    this.activeTimeFinishesExam = data.data.waktuAktifSelesaiUjian;
                    this.examStatus = data.data.statusUjian;
                    this.checkExamStatus();
                    this.initializeQuestionImage();
                    this.initializeOptions();
                    this.startCountdownExam();
                    this.startCountdownExamFinishButton();
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        checkExamStatus() {
            if (this.examStatus == "SELESAI") {
                this.generateExamResult();
            }
        },
        async initializeOptions() {
            if (this.dataSoal && this.dataSoal[this.indexSoal]) {
                const soal = this.dataSoal[this.indexSoal];
                
                const options = ['A', 'B', 'C', 'D', 'E'].map(letter => ({
                    label: soal[`pilihan${letter}`],
                    value: soal[`pilihan${letter}`],
                    isImageExists: false
                }));

                for(let option of options){
                    if (this.isValidUUIDImage(option.value)) {
                        try {
                            const { data } = await axios.get(`${this.IP_ENDPOINT}/siswa/ujian/gambarjawaban/geturl?gambarJawaban=${option.value}`, {
                                headers: {
                                    "Authorization": `Bearer ${this.token}`
                                }
                            });
                            option.isImageExists = true;
                            option.label = data.data.url
                        } catch (error) {
                            console.error(error.response);              
                        }
                    }
                }

                console.table(options);
                this.options = options;
                this.examStatusQuestion.hesitate = soal.statusPertanyaan === "RAGU";
            }
        },
        createAnswer(indexSoal) {
            // idSoal
            // idBank
            // jawaban
            // status pertanyaan
            console.log(this.dataSoal[indexSoal]);
            axios.post(`${this.IP_ENDPOINT}/siswa/ujian/jawab`, {
                idSoal: this.idSoal,
                idBank: this.dataSoal[indexSoal].idBank,
                jawaban: this.dataSoal[indexSoal].jawaban,
                statusPertanyaan: this.dataSoal[indexSoal].statusPertanyaan,
            }, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
                .then(({ data }) => {
                    console.log(data);
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        changeAnswer(indexSoal) {
            if (this.examStatusQuestion.hesitate) {
                this.dataSoal[indexSoal].statusPertanyaan = "RAGU";
            } else {
                this.dataSoal[indexSoal].statusPertanyaan = "SUDAH_DIJAWAB";
            }
            this.createAnswer(indexSoal);
        },
        hesitateQuestion(indexSoal) {
            if (this.examStatusQuestion.hesitate) {
                console.log("ragu-ragu");
                this.dataSoal[indexSoal].statusPertanyaan = "RAGU";
            } else {
                console.log("tidak ragu ragu");
                if (this.dataSoal[indexSoal].jawaban == null) {
                    this.dataSoal[indexSoal].statusPertanyaan = "BELUM_DIJAWAB";
                } else {
                    this.dataSoal[indexSoal].statusPertanyaan = "SUDAH_DIJAWAB";
                }
            }
            this.createAnswer(indexSoal);
        },
        prevQuestion() {
            if (this.indexSoal > 0) {
                this.$router.push({ name: "Ujian Siswa Page", params: { idSoal: this.idSoal, indexSoal: this.indexSoal - 1 } });
            }
        },
        nextQuestion() {
            if (this.indexSoal < this.dataSoal.length - 1) {
                this.$router.push({ name: "Ujian Siswa Page", params: { idSoal: this.idSoal, indexSoal: this.indexSoal + 1 } });
            }
        },
        parseDateString(dateString) {
            if (!dateString) return null;
            const [date, time] = dateString.split(' ');
            const [day, month, year] = date.split('-');
            const [hours, minutes, seconds] = time.split(':');
            return new Date(year, month - 1, day, hours, minutes, seconds);
        },
        startCountdownExam() {
            if (!this.examFinishTime) return;
            const targetDate = this.parseDateString(this.examFinishTime);
            if (!targetDate) return;

            const now = new Date().getTime()
            const distance = targetDate - now;

            if (distance < 0) {
                this.examTimeData = { hours: this.formatTime(0), minutes: this.formatTime(0), seconds: this.formatTime(0) }
                console.log("Selesai");
                this.generateExamResult();
                return;
            }

            this.examTimeData.hours = this.formatTime(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            this.examTimeData.minutes = this.formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            this.examTimeData.seconds = this.formatTime(Math.floor((distance % (1000 * 60)) / 1000));
        },
        formatTime(value) {
            return value < 10 ? "0" + value : value;
        },
        startCountdownExamFinishButton() {
            if (!this.activeTimeFinishesExam) return;
            const targetDate = this.parseDateString(this.activeTimeFinishesExam);
            if (!targetDate) return;

            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                this.activeFinishButtonTimeData = { minutes: this.formatTime(0), seconds: this.formatTime(0) };
                this.isButtonFinishOpen = true;
                return;
            }

            this.activeFinishButtonTimeData.minutes = this.formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            this.activeFinishButtonTimeData.seconds = this.formatTime(Math.floor((distance % (1000 * 60)) / 1000));
        },
        handleVisibilityChange() {
            if (document.hidden) {
                window.location.reload();
            }
        },
        backgroundNavigatorQuestion(indexSoal, statusPertanyaan) {
            if (indexSoal === this.indexSoal) {
                return 'bg-blue-200';
            }

            switch (statusPertanyaan) {
                case "BELUM_DIJAWAB":
                    return 'bg-gray-200';
                case "SUDAH_DIJAWAB":
                    return 'bg-green-200';
                default:
                    return 'bg-yellow-200';
            }
        },
        convertStatusPertanyaanString(input) {
            return input.toLowerCase().replace(/_/g, ' ');
        },
        finishExam() {
            this.isActiveModalFinishExam = false;
            for (let index = 0; index < this.dataSoal.length; index++) {
                const element = this.dataSoal[index];

                if (element.statusPertanyaan == "BELUM_DIJAWAB" || element.statusPertanyaan == "RAGU") {
                    console.log(index);
                    console.log(element.statusPertanyaan);
                    this.isError = true;
                    this.errorMessage = "Pertanyaan no. " + parseInt(index + 1) + " " + this.convertStatusPertanyaanString(element.statusPertanyaan);
                    break;
                }
            }

            if (!this.isError) {
                console.log("Akhiri Ujian!");
                this.generateExamResult();
            }
        },
        generateExamResult() {
            axios.post(`${this.IP_ENDPOINT}/siswa/nilai/generate`, {
                idSoal: this.idSoal
            }, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    const idNilaiUjian = data.data.idNilaiUjian;
                    console.log(idNilaiUjian);
                    this.$router.push({ name: "Selesai Ujian Siswa Page", params: { idNilaiUjian: idNilaiUjian } });
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        initializeQuestionImage() {
            if (this.dataSoal && this.dataSoal[this.indexSoal]) {
                const questionImage = this.dataSoal[this.indexSoal].gambarPertanyaan;
                if (questionImage != null) {
                    axios.get(`${this.IP_ENDPOINT}/siswa/ujian/gambarpertanyaan/geturl?gambarPertanyaan=${questionImage}`, {
                        headers: {
                            "Authorization": "Bearer " + this.token
                        }
                    })
                        .then(({ data }) => {
                            this.isImageQuestionShow = true;
                            this.imageQuestion = data.data.url;
                        })
                        .catch(({ response }) => {
                            console.error(response);
                        });
                } else {
                    this.isImageQuestionShow = false;
                    this.imageQuestion = null;
                }

            }
        },
        initializeAnswerImage(answerImage) {

        },
        isValidUUIDImage(filename) {
            const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(png|jpg|jpeg)$/i;
            return regex.test(filename);
        }
    },
    beforeUnmount() {
        document.removeEventListener("visibilitychange", this.handleVisibilityChange);
        clearInterval(this.finishButtonInterval);
        clearInterval(this.examFinishInterval);
        console.log("unmounted");
    }
}
</script>