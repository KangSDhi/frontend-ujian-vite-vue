<template>
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div class="z-50 bg-white dark:bg-gray-900 px-16 py-14 rounded-md">
            <h1 class="text-xl mb-4 font-bold dark:text-slate-200 text-slate-500">Edit Tingkat</h1>
            <div>
                <label for="input-level-name" class="block mb-2 text-sm font-medium dark:text-slate-300 text-slate-900">
                    Tingkat
                </label>
                <input id="input-level-name" type="text" v-model="levelDataEdit.nama_tingkat"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :class="{ 'border-2 border-red-400 dark:border-2 dark:border-red-500': errorUpdateLevel.levelNameErrorMessage }">
                <span class="text-red-500 font-bold">{{ errorUpdateLevel.levelNameErrorMessage }}</span>
            </div>
            <div class="flex mt-3 justify-end gap-2">
                <button @click="updateLevel" class="px-5 py-2.5 bg-blue-200 dark:bg-blue-400 hover:bg-blue-300 dark:hover:bg-blue-500 text-sm rounded-lg inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                    </svg>
                    Perbarui
                </button>
                <button @click="formToEditLevelClose"
                    class="px-5 py-2.5 bg-gray-200 dark:bg-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm rounded-lg inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    Batal
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import * as Check from "../../functions/utils/Check";

export default {
    name: "FormToEditLevel",
    props: {
        token: {
            type: String
        },
        levelDataEdit: {
            type: Object
        }
    },
    emits: [
        "isFormToEditLevelFalse"
    ],
    data() {
        return {
            IP_API_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            errorUpdateLevel: {
                levelNameErrorMessage: ""
            }
        }
    },
    methods: {
        updateLevel() {
            axios.put(`${this.IP_API_ENDPOINT}/admin/tingkat/update`, {
                id: this.levelDataEdit.id,
                nama_tingkat: this.levelDataEdit.nama_tingkat
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(({ data }) => {
                this.$router.go();
            })
            .catch(({ response }) => {
                this.resetErrorForm();

                const errorMessages = response.data.errors;
                if (Check.isObject(errorMessages)) {
                    Object.keys(errorMessages).forEach((key) => {
                        if (key === "nama_tingkat") {
                            this.errorUpdateLevel.levelNameErrorMessage = errorMessages[key];
                        }
                    })
                }
            })
        },
        resetErrorForm(){
            this.errorUpdateLevel.levelNameErrorMessage = "";
        },
        formToEditLevelClose(){
            this.resetErrorForm();
            this.$emit('isFormToEditLevelFalse', false);
        }
    }
}
</script>