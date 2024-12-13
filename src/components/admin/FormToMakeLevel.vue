<template>
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div class="z-50 bg-white dark:bg-gray-900 px-16 py-14 rounded-md">
            <h1 class="text-xl mb-4 font-bold dark:text-slate-200 text-slate-500">Tambah Tingkat</h1>
            <div>
                <label for="input-tingkat"
                    class="block mb-2 text-sm font-medium dark:text-slate-300 text-slate-900">
                    Tingkat
                </label>
                <input id="input-tingkat" type="text" v-model="dataCreateLevel.levelName"
                    class="bg-gray-50 barder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :class="{ 'border-2 border-red-400 dark:border-red-500': errorCreateLevel.levelNameErrorMessage }">
                <span class="text-red-500 font-bold">{{ errorCreateLevel.levelNameErrorMessage }}</span>
            </div>
            <div class="flex mt-3 justify-end gap-2">
                <button @click="createLevel"
                    class="px-5 py-2.5 bg-blue-200 dark:bg-blue-400 hover:bg-blue-300 dark:hover:bg-blue-500 text-sm rounded-lg inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                    </svg>
                    Simpan
                </button>
                <button @click="formToMakeLevelClose"
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

export default {
    name: "FormToMakeLevel",
    props: {
        token: {
            type: String
        }
    },
    emits: [
        "isFormToMakeLevelFalse"
    ],
    data() {
        return {
            IP_API_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            dataCreateLevel: {
                levelName: ""
            },
            errorCreateLevel: {
                levelNameErrorMessage: ""
            }
        }
    },
    methods: {
        createLevel(){
            axios.post(`${this.IP_API_ENDPOINT}/admin/tingkat/create`, {
                nama_tingkat: this.dataCreateLevel.levelName.toUpperCase()
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(({ data }) => {
                this.$router.go();
            })
            .catch(({ response }) => {
                console.error(response);

                this.resetErrorForm();

                const errorMessages = response.data.errors;
                if (this.isObject(errorMessages)) {
                    Object.keys(errorMessages).forEach((key) => {
                        if (key == "nama_tingkat") {
                            this.errorCreateLevel.levelNameErrorMessage = errorMessages[key];
                        }
                    });
                }
            });
        },
        formToMakeLevelClose(){
            this.resetForm();

            this.resetErrorForm();

            this.$emit('isFormToMakeLevelFalse', false);
        },
        resetForm(){
            this.dataCreateLevel.levelName = "";
        },
        resetErrorForm(){
            this.errorCreateLevel.levelNameErrorMessage = "";
        },
        isObject(value) {
            return (
                typeof value === 'object' && value !== null && !Array.isArray(value)
            );
        },
    }
}
</script>