<template>
    <BaseLayout>
        <template #content>
            <div class="py-5">
                <h1 class="text-4xl font-sans font-semibold">Mata Ujian</h1>
            </div>
            <div class="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <div v-for="(item, index) in dataMataUjian">
                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                        <img class="w-full" src="/img/img_mata_ujian.jpg" alt="Sunset in the mountains">
                        <div class="px-6 py-4">
                            <h2 class="font-bold text-xl mb-2">{{ item.namaSoal }}</h2>
                            <h3 class="font-semibold text-md">Waktu Mulai</h3>
                            <p class="text-gray-700 text-base">
                                {{ item.waktuMulaiSoal }}
                            </p>
                            <h3 class="font-semibold text-md mt-1">Waktu Selesai</h3>
                            <p class="text-gray-700 text-base">
                                {{ item.waktuSelesaiSoal }}
                            </p>
                        </div>
                        <div class="px-6 pt-4 pb-2 mb-3">
                            <template v-if="item.statusMataUjian == 'MULAI'">
                                <RouterLink :to="{ name: 'Mulai Ujian Siswa Page', params: { idSoal: item.idSoal } }"
                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Mulai
                                </RouterLink>
                            </template>
                            <template v-else-if="item.statusMataUjian == 'BELUM_MULAI'">
                                <button
                                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Belum
                                    Mulai</button>
                            </template>
                            <template v-else>
                                <button
                                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Selesai</button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BaseLayout>
</template>

<script>
import axios from "axios";
import BaseLayout from "./BaseLayout.vue";
import { RouterLink } from "vue-router";

export default {
    data() {
        return {
            IP_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            token: localStorage.getItem("auth_token"),
            dataSiswa: {
                tingkat: localStorage.getItem("tingkat"),
                jurusan: localStorage.getItem("jurusan"),
            },
            dataMataUjian: [],
        }
    },
    components: {
        BaseLayout
    },
    mounted() {
        this.loadMataUjian();
    },
    methods: {
        loadMataUjian() {
            axios.post(`${this.IP_ENDPOINT}/siswa/mata-ujian`, {
                tingkat: this.dataSiswa.tingkat,
                jurusan: this.dataSiswa.jurusan
            }, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    console.log(data.data);
                    this.dataMataUjian = data.data;
                })
                .catch(({ response }) => {
                    console.error(response);
                    console.error(response.status);
                    if (response.status === 404) {
                        console.log(response.data.message);
                    }
                });
        }
    }
}
</script>