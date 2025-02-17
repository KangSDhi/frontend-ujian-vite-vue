<template>
    <div class="flex justify-center items-center fixed z-50 top-0 right-0 bottom-0 left-0">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" @click="deleteDialogItemQuestionClose"
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
                    Apakah Anda Ingin Menghapus Soal No.{{ itemQuestionData.index + 1 }} ?
                </h3>
                <div class="grid grid-cols-2 gap-1">
                    <button @click="deleteItemQuestion"
                        class="bg-red-600 px-4 py-2 rounded-md text-md font-semibold text-white">Hapus</button>
                    <button @click="deleteDialogItemQuestionClose"
                        class="bg-gray-500 px-4 py-2 rounded-md text-md font-semibold text-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ml-1">Batal</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "DialogToDeleteItemQuestion",
    props: {
        token: {
            type: String
        },
        itemQuestionData: {
            type: Object
        }
    },
    emits: [
        "isDialogToDeleteItemQuestionFalse"
    ],
    data(){
        return {
            IP_API_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
        }
    },
    methods: {
        deleteItemQuestion(){
            axios.delete(`${this.IP_API_ENDPOINT}/admin/bank-soal/delete/${this.itemQuestionData.id}`, {
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
                if (response.status === 500 && response.data.errors.includes("a foreign key constraint fails")) {
                    alert("Data Tidak Dapat Dihapus!");
                }
            })
        },
        deleteDialogItemQuestionClose(){
            this.$emit('isDialogToDeleteItemQuestionFalse', false);
        }
    }
}
</script>