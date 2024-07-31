<template>
    <div v-if="dataSoal" class="container mx-auto">
        <div class="flex flex-row">
            <div class="basis-1/4">
                Pertanyaan No. {{ indexSoal + 1 }}
            </div>
            <div class="basis-3/4">
                {{ dataWaktu.jam }} : {{ dataWaktu.menit }} : {{ dataWaktu.detik }}
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
                <template v-if="isBtnFinishOpen">
                    <button>Selesai</button>
                </template>
                <template v-else>
                    <button>{{ dataWaktuTombolSelesai.menit }} : {{ dataWaktuTombolSelesai.detik }}</button>
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
            waktuSelesaiUjian: null,
            waktuAktifSelesaiUjian: null,
            options: [],
            dataWaktu: {
                jam: 0,
                menit: 0,
                detik: 0
            },
            isBtnFinishOpen: false,
            dataWaktuTombolSelesai: {
                menit: 0,
                detik: 0
            }
        }
    },
    mounted() {
        this.loadItemSoal();
        this.startCountdown();
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
                    this.waktuSelesaiUjian = data.data.waktuSelesaiUjian;
                    this.waktuAktifSelesaiUjian = data.data.waktuAktifSelesaiUjian;
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
                this.$router.push({ name: "Ujian Siswa", params: { idSoal: this.idSoal, indexSoal: this.indexSoal - 1 } });
            }
        },
        nextSoal() {
            if (this.indexSoal < this.dataSoal.length - 1) {
                this.$router.push({ name: "Ujian Siswa", params: { idSoal: this.idSoal, indexSoal: this.indexSoal + 1 } });
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
            if(!this.waktuSelesaiUjian) return;
            const targetDate = this.parseDateString(this.waktuSelesaiUjian);
            if(!targetDate) return;

            const now = new Date().getTime()
            const distance = targetDate - now;

            if (distance < 0) {
                this.dataWaktu = { jam: this.formatTime(0), menit: this.formatTime(0), detik: this.formatTime(0) }
                console.log("Selesai");
                this.$router.push({ name: "Selesai Ujian Siswa", params: { idSoal: this.idSoal } });
                return;
            }

            this.dataWaktu.jam = this.formatTime(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            this.dataWaktu.menit = this.formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            this.dataWaktu.detik = this.formatTime(Math.floor((distance % (1000 * 60)) / 1000));
        },
        formatTime(value) {
            return value < 10 ? "0" + value : value;
        },
        startCountdownFinishButton(){
            if(!this.waktuAktifSelesaiUjian) return;
            const targetDate = this.parseDateString(this.waktuAktifSelesaiUjian);
            if(!targetDate) return;

            const now = new Date().getTime();
            const distance = targetDate - now;

            if(distance < 0){
                this.dataWaktuTombolSelesai = { menit: this.formatTime(0), detik: this.formatTime(0) };
                this.isBtnFinishOpen = true;
                return;
            }

            this.dataWaktuTombolSelesai.menit = this.formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            this.dataWaktuTombolSelesai.detik = this.formatTime(Math.floor((distance % (1000 * 60)) / 1000));
        }
    }
}
</script>