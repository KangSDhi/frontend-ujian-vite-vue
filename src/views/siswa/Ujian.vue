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
                <div v-for="(option, optionIndex) in options" class="flex ml-2 items-center">
                    <input type="radio" v-model="dataSoal[indexSoal].jawaban" :value="option.value"
                        @change="changeAnswer(indexSoal)"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-1" class="ms-3 text-2xl font-medium text-gray-900">
                        {{ option.label }}
                    </label>
                </div>
                <div class="flex mt-2 gap-2 justify-center md:justify-start">
                    <button @click="prevQuestion()"
                        class="text-black bg-blue-400 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2">Sebelumnya
                    </button>
                    <!-- <button @click="raguSoal(indexSoal)" class="text-black bg-yellow-400 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2">Ragu</button> -->
                    <div class="flex items-center bg-yellow-400 rounded-lg px-5 py-2.5 me-2 mb-2">
                        <input type="checkbox" v-model="examStatus.hesitate" @change="hesitateQuestion(indexSoal)"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="" class="ms-2 text-md font-medium text-gray-900">Ragu</label>
                    </div>
                    <template v-if="dataSoal.length - 1 == indexSoal">
                        <template v-if="isButtonFinishOpen">
                            <button @click="isActiveModalFinishExam = true"
                                class="text-black bg-green-400 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2">Selesai</button>
                        </template>
                        <template v-else>
                            <button disabled
                                class="text-black bg-gray-400 font-semibold rounded-lg text-md px-5 py-2.5 me-2 mb-2">{{
                                    activeFinishButtonTimeData.minutes }} : {{ activeFinishButtonTimeData.seconds
                                }}</button>
                        </template>
                    </template>
                    <template v-else>
                        <button @click="nextQuestion()"
                            class="text-black bg-blue-400 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2">Selanjutnya</button>
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
                            :class="backgroundNavigatorQuestion(dataSoalItem.statusPertanyaan)"
                            class="bg-gray-200 text-black rounded-lg w-full h-20 shadow-xl flex items-center justify-center">
                            {{ dataSoalIndex + 1 }}
                        </RouterLink>
                    </template>
                </div>
            </div>
        </div>
        <div v-show="isActiveModalFinishExam"
            class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div class="bg-white px-16 py-14 rounded-md text-center">
                <h1 class="text-xl mb-4 font-bold text-slate-500">Apakah Anda Ingin Mengakhiri Ujian?</h1>
                <div class="grid grid-cols-2 gap-1">
                    <button @click="finishExam()"
                        class="bg-gray-500 px-4 py-2 rounded-md text-md font-semibold text-white">Selesai</button>
                    <button @click="isActiveModalFinishExam = false"
                        class="bg-red-500 px-4 py-2 rounded-md text-md font-semibold text-white ml-1">Batal</button>
                </div>
            </div>
        </div>
        <div v-show="isError"
            class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div class="bg-white px-16 py-14 rounded-md text-center">
                <h1 class="text-xl mb-4 font-bold text-slate-500">{{ errorMessage }}</h1>
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
            examFinishTime: null,
            activeTimeFinishesExam: null,
            options: [],
            examStatus: {
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
        setInterval(this.startCountdownExam, 1000);
        setInterval(this.startCountdownExamFinishButton, 1000);
        document.addEventListener("visibilitychange", this.handleVisibilityChange);
    },
    watch: {
        '$route.params.indexSoal': {
            handler(newIndex) {
                this.indexSoal = parseInt(newIndex);
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
                    this.initializeOptions();
                    this.startCountdownExam();
                    this.startCountdownExamFinishButton();
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        initializeOptions() {
            if (this.dataSoal && this.dataSoal[this.indexSoal]) {
                const soal = this.dataSoal[this.indexSoal];
                this.options = [
                    { label: soal.pilihanA, value: soal.pilihanA },
                    { label: soal.pilihanB, value: soal.pilihanB },
                    { label: soal.pilihanC, value: soal.pilihanC },
                    { label: soal.pilihanD, value: soal.pilihanD },
                    { label: soal.pilihanE, value: soal.pilihanE },
                ];

                if (soal.statusPertanyaan == "RAGU") {
                    this.examStatus.hesitate = true;
                } else {
                    this.examStatus.hesitate = false;
                }
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
            if (this.examStatus.hesitate) {
                this.dataSoal[indexSoal].statusPertanyaan = "RAGU";
            } else {
                this.dataSoal[indexSoal].statusPertanyaan = "SUDAH_DIJAWAB";
            }
            this.createAnswer(indexSoal);
        },
        hesitateQuestion(indexSoal) {
            if (this.examStatus.hesitate) {
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
                this.$router.push({ name: "Selesai Ujian Siswa Page", params: { idSoal: this.idSoal } });
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
        backgroundNavigatorQuestion(statusPertanyaan) {
            if (statusPertanyaan === "BELUM_DIJAWAB") {
                return 'bg-gray-200';
            } else if (statusPertanyaan === "SUDAH_DIJAWAB") {
                return 'bg-green-200';
            } else {
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
        }
    },
    beforeDestroy() {
        document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    }
}
</script>