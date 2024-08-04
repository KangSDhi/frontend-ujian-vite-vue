<template>
    <div v-if="dataSoal" class="container mx-auto">
        <div class="flex flex-row">
            <div class="basis-1/4">
                Pertanyaan No. {{ indexSoal + 1 }}
            </div>
            <div class="basis-3/4">
                {{ examTimeData.hours }} : {{ examTimeData.minutes }} : {{ examTimeData.seconds }}
            </div>
        </div>
        <div class="flex">
            {{ dataSoal[indexSoal].pertanyaan }}
        </div>
        <div v-for="(option, optionIndex) in options" class="flex items-center">
            <input type="radio" v-model="dataSoal[indexSoal].jawaban" :value="option.value"
                @change="updateStatus(indexSoal)"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="default-radio-1" class="ms-2 font-medium text-gray-900">
                {{ option.label }}
            </label>
        </div>
        <div class="flex gap-2">
            <button @click="prevSoal()">Sebelumnya</button>
            <button @click="raguSoal(indexSoal)">Ragu</button>
            <template v-if="dataSoal.length -1 == indexSoal">
                <template v-if="isButtonFinishOpen">
                    <button>Selesai</button>
                </template>
                <template v-else>
                    <button>{{ activeFinishButtonTimeData.minutes }} : {{ activeFinishButtonTimeData.seconds }}</button>
                </template>
            </template>
            <template v-else>
                <button @click="nextSoal()">Selanjutnya</button>
            </template>
        </div>
    </div>
</template>

<script>
import axios from "axios";

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
            examTimeData: {
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            isButtonFinishOpen: false,
            activeFinishButtonTimeData: {
                minutes: 0,
                seconds: 0
            }
        }
    },
    mounted() {
        this.loadItemSoal();
        this.startCountdown();
        setInterval(this.startCountdown, 1000);
        setInterval(this.startCountdownFinishButton, 1000);
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
        loadItemSoal() {
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
                    this.startCountdown();
                    this.startCountdownFinishButton()
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
            }
        },
        updateStatus(indexSoal) {
            this.dataSoal[indexSoal].statusPertanyaan = "SUDAH_DIJAWAB";
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
        raguSoal(indexSoal) {
            this.dataSoal[indexSoal].statusPertanyaan = "RAGU";
        },
        prevSoal() {
            if (this.indexSoal > 0) {
                this.$router.push({ name: "Ujian Siswa Page", params: { idSoal: this.idSoal, indexSoal: this.indexSoal - 1 } });
            }
        },
        nextSoal() {
            if (this.indexSoal < this.dataSoal.length - 1) {
                this.$router.push({ name: "Ujian Siswa Page", params: { idSoal: this.idSoal, indexSoal: this.indexSoal + 1 } });
            }
        },
        parseDateString(dateString) {
            if(!dateString) return null;
            const [date, time] = dateString.split(' ');
            const [day, month, year] = date.split('-');
            const [hours, minutes, seconds] = time.split(':');
            return new Date(year, month - 1, day, hours, minutes, seconds);
        },
        startCountdown() {
            if(!this.examFinishTime) return;
            const targetDate = this.parseDateString(this.examFinishTime);
            if(!targetDate) return;

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
        startCountdownFinishButton(){
            if(!this.activeTimeFinishesExam) return;
            const targetDate = this.parseDateString(this.activeTimeFinishesExam);
            if(!targetDate) return;

            const now = new Date().getTime();
            const distance = targetDate - now;

            if(distance < 0){
                this.activeFinishButtonTimeData = { minutes: this.formatTime(0), seconds: this.formatTime(0) };
                this.isButtonFinishOpen = true;
                return;
            }

            this.activeFinishButtonTimeData.minutes = this.formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            this.activeFinishButtonTimeData.seconds = this.formatTime(Math.floor((distance % (1000 * 60)) / 1000));
        }
    }
}
</script>