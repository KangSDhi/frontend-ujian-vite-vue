<template>
    <div class="flex justify-center items-center absolute z-50 top-0 right-0 bottom-0 left-0">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" @click="deleteDialogLevelCLose"
                class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 class="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Apakah Anda Ingin Menghapus Data Tingkat ?
                </h3>
                <h4 class="mb-2 text-md font-bold text-gray-600 dark:text-gray-300">{{ levelDataDelete.nama_tingkat }}</h4>
                <div class="grid grid-cols-2 gap-1">
                    <button @click="deleteLevel(levelDataDelete.id)"
                        class="bg-red-600 px-4 py-2 rounded-md text-md font-semibold text-white">Hapus</button>
                    <button @click="deleteDialogLevelCLose"
                        class="bg-gray-500 px-4 py-2 rounded-md text-md font-semibold text-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ml-1">Batal</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "DialogToDeleteLevel",
    props: {
        token: {
            type: String
        },
        levelDataDelete: {
            type: Object
        }
    },
    emits: [
        "isDialogToDeleteLevelFalse"
    ],
    data(){
        return {
            IP_API_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
        }
    },
    methods: {
        deleteLevel(id){
            axios.delete(`${this.IP_API_ENDPOINT}/admin/tingkat/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(({ data }) => {
                this.$router.go()
            })
            .catch(({ response }) => {
                console.error(response);
                if (response.status === 500 && response.data.errors.includes("a foreign key constraint fails")) {
                    alert("Data Tidak Dapat Dihapus!");
                }
            })
        },
        deleteDialogLevelCLose(){
            this.$emit('isDialogToDeleteLevelFalse', false);
        }
    }
}
</script>