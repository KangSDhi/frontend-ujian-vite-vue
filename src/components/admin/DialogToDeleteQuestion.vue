<template>
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div class="bg-white px-16 py-14 rounded-md text-center">
            <h1 class="text-xl mb-4 font-bold text-slate-500">Apakah Anda Ingin Menghapus Data Soal {{
                questionDataDelete.namaSoal }} ?</h1>
            <div class="grid grid-cols-2 gap-1">
                <button @click="deleteSoal(questionDataDelete.id)"
                    class="bg-red-500 px-4 py-2 rounded-md text-md font-semibold text-white">Hapus</button>
                <button @click="deleteDialogSoalClose"
                    class="bg-gray-500 px-4 py-2 rounded-md text-md font-semibold text-white ml-1">Batal</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "DialogHapusSoal",
    props: {
        token: {
            type: String
        },
        questionDataDelete: {
            type: Object
        }
    },
    emits: [
        "isDialogToDeleteQuestionFalse"
    ],
    data(){
        return {
            IP_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
        }
    },
    methods: {
        deleteSoal(id){
            axios.delete(`${this.IP_ENDPOINT}/admin/soal/delete?idSoal=${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(({ data }) => {
                console.log(data);
                window.location.reload();
            })
            .catch(({ response }) => {
                console.error(response);
            });
        },
        deleteDialogSoalClose(){
            this.$emit('isDialogToDeleteQuestionFalse', false);
        }
    }
}
</script>