<template>
    <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div class="bg-white flex flex-col px-16 py-14 rounded-md text-center">
            <h1 class="text-3xl mb-4 font-bold text-red-500">Galat!</h1>
            <h2 class="text-2xl font-bold text-red-600">{{ errorMessage }}</h2>
            <button type="button" @click="errorDialogClose"
                class="mt-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Tutup
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ErrorDialog",
    props: {
        errorMessage: {
            type: String
        }
    },
    methods: {
        errorDialogClose(){
            this.$emit('isErrorDialogFalse', false);
        }
    }
}
</script>