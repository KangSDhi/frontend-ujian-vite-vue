<template>
    <div class="mx-auto max-w-screen-md py-12">
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-10 text-center text-4xl font-bold text-black">
                    Nilai Ujian
                </h2>
            </div>
            <div v-if="nilaiUjian != null" class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 class="mt-5 text-center text-8xl font-bold text-black">
                    {{ nilaiUjian }}
                </h1>
            </div>
            <div class="flex justify-center">
                <template v-if="nilaiUjian >= 101">
                    <div class="text-7xl">
                        👽
                    </div>
                </template>
                <template v-else-if="nilaiUjian >= 90">
                    <div class="text-7xl">
                        🤩
                    </div>
                </template>
                <template v-else-if="nilaiUjian >= 70">
                    <div class="text-7xl">
                        😏
                    </div>
                </template>
                <template v-else-if="nilaiUjian >= 50">
                    <div class="text-7xl">
                        😩
                    </div>
                </template>
                <template v-else>
                    <div class="text-7xl">
                        💩
                    </div>
                </template>
            </div>
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
            idNilaiUjian: this.$route.params.idNilaiUjian,
            nilaiUjian: null
        }
    },
    mounted() {
        this.loadResultExam();
    },
    methods: {
        loadResultExam() {
            console.log(this.idNilaiUjian);
            axios.get(`${this.IP_ENDPOINT}/siswa/nilai/findit?idNilaiUjian=${this.idNilaiUjian}`, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    const nilaiUjian = data.data.nilaiUjian;
                    console.log(nilaiUjian);
                    this.nilaiUjian = nilaiUjian;
                })
                .catch(({ response }) => {
                    console.error(response);
                })
        }
    }
}
</script>