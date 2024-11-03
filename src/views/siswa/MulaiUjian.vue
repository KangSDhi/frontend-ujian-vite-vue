<template>
    <section>
        <main class="mx-auto max-w-screen-md py-12">
            <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div class="rounded shadow-2xl">
                    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Mulai Ujian
                    </h2>
                    <div v-if="dataSoal" class="py-2 px-4">
                        <div class="flex">
                            <div class="flex-auto font-mono">Nama Soal : {{ dataSoal.namaSoal }}</div>
                        </div>
                        <div class="flex">
                            <div class="flex-auto font-mono">Tingkat : {{ dataSoal.tingkat }}</div>
                        </div>
                        <div v-if="dataSoal.jurusan != null" class="flex">
                            <div class="flex-auto font-mono">Jurusan : {{ dataSoal.jurusan }}</div>
                        </div>
                        <div class="flex">
                            <div class="flex-auto font-mono">Butir Soal : {{ dataSoal.butirSoal }}</div>
                        </div>
                        <div class="flex">
                            <div class="flex-auto font-mono">Waktu Mulai : {{ dataSoal.waktuMulaiSoal }}</div>
                        </div>
                        <div class="flex">
                            <div class="flex-auto font-mono">Durasi : {{ dataSoal.durasiSoal }}</div>
                        </div>
                        <div class="flex">
                            <div class="font-mono">Token : </div>
                            <input type="text" v-model="tokenSoal" class="flex-auto ml-2 p-1 border border-solid border-black rounded-md">
                        </div>
                        <div @click="startUjian()" class="flex mt-5">
                            <button class="w-full justify-center rounded-md bg-gradient-to-tr from-blue-600 to-indigo-400 shadow-blue-500/20 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Mulai</button>
                        </div>
                    </div>
                    <div v-else class="text-center mt-4">
                        Loading...
                    </div>
                </div>
            </div>
            <div v-show="isError"
                class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div class="bg-white px-16 py-14 rounded-md text-center">
                    <h1 class="text-xl mb-4 font-bold text-red-500">Galat!</h1>
                    <h3 class="text-lg mb-4 font-semibold text-gray-800">{{ errorMessage }}</h3>
                    <button @click="isError = false" class="bg-red-500 px-4 py-2 rounded-md text-md font-semibold text-white">Iya</button>
                </div>
            </div>
        </main>
    </section>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            IP_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            token: localStorage.getItem("auth_token"),
            idSoal: this.$route.params.idSoal,
            tokenSoal: "",
            dataSoal: null,
            isError: false,
            errorMessage: "",
        }
    },
    mounted() {
        this.loadSoal();
    },
    methods: {
        loadSoal() {
            axios.get(`${this.IP_ENDPOINT}/siswa/soal/findbyid/${this.idSoal}`, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    this.dataSoal = data.data;
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        startUjian(){
            axios.get(`${this.IP_ENDPOINT}/siswa/soal/check/token?token=${this.tokenSoal}&idSoal=${this.idSoal}`, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
            .then(({ data }) => {
                if (data.httpCode == 200 && data.message == "Token Benar!") {
                    this.checkUjianIn();      
                }
            })
            .catch(({ response }) => {
                const data = response.data;
                this.isError = true;
                this.errorMessage = data.message;
            });
        },
        checkUjianIn(){
            axios.get(`${this.IP_ENDPOINT}/siswa/ujian/checkin?idSoal=${this.idSoal}`, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
            .then(({ data }) => {
                console.log(data);
                if(data.httpCode == 200 && data.message == "Ujian Ada!"){
                    this.$router.push({ name: "Ujian Siswa Page", params: { idSoal: this.idSoal, indexSoal: 0 } });
                }
            })
            .catch(({ response }) => {
                console.error(response);
                const data = response.data;
                if (response.status == 404 && data.message == "Ujian Tidak Ditemukan!") {
                    this.generateUjian();
                }
            });
        },
        generateUjian(){
            axios.get(`${this.IP_ENDPOINT}/siswa/ujian/generate?idSoal=${this.idSoal}`, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
            .then(({ data }) => {
                if (data.httpCode == 201 && data.message.includes("Ujian Berhasil Dibuat")) {
                    this.$router.push({ name: "Ujian Siswa Page", params: { idSoal: this.idSoal, indexSoal: 0 } });           
                }
            })
            .catch(({ response }) => {
                console.error(response);
                const data = response.data;
                if (response.status == 400) {
                    this.isError = true;
                    this.errorMessage = data.message;
                }
            });
        }
    }
}
</script>