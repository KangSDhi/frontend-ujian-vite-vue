<template>
    <header></header>
    <section>
        <main class="mx-auto max-w-screen-md py-12">
            <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Halaman Login
                    </h2>
                </div>
                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form class="space-y-6" @submit.prevent="login()">
                        <div>
                            <label for="" class="block text-sm font-medium leading-6 text-gray-900">
                                Email / ID Siswa
                            </label>
                            <div class="mt-2">
                                <input v-model="emailOrIdSiswa" type="text"
                                    class="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadown-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    :class="{
                                        'border-2 border-rose-500': isEmailOrIdSiswaError
                                    }">
                            </div>
                            <span class="text-rose-500 text-sm font-bold">{{ emailOrIdSiswaErrorMessage }}</span>
                        </div>
                        <div>
                            <label for="" class="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div class="mt-2">
                                <input v-model="password" type="password"
                                    class="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadown-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    :class="{
                                        'border-2 border-rose-500': isPasswordError
                                    }">
                            </div>
                            <span class="text-rose-500 text-sm font-bold">{{ passwordErrorMessage }}</span>
                        </div>
                        <div>
                            <button type="submit" class="flex w-full justify-center rounded-md bg-gradient-to-tr from-blue-600 to-indigo-400 shadow-blue-500/20 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Masuk
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div v-show="isAuthError"
                class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div class="bg-white px-16 py-14 rounded-md text-center">
                    <h1 class="text-xl mb-4 font-bold text-red-500">Galat!</h1>
                    <h3 class="text-lg mb-4 font-semibold text-gray-800">{{ authErrorMessage }}</h3>
                    <button @click="isAuthError = false" class="bg-red-500 px-4 py-2 rounded-md text-md font-semibold text-white">Iya</button>
                </div>
            </div>
        </main>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "Halaman Login",
    data() {
        return {
            IP_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            token: localStorage.getItem("auth_token"),
            emailOrIdSiswa: "",
            password: "",
            isEmailOrIdSiswaError: false,
            isPasswordError: false,
            emailOrIdSiswaErrorMessage: "",
            passwordErrorMessage: "",
            isAuthError: false,
            authErrorMessage: ""
        }
    },
    mounted() {
        this.pingAPI();
        this.checkAuth();
    },
    methods: {
        pingAPI() {
            axios.get(`${this.IP_ENDPOINT}/health/ping`)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        login(){
            this.resetForm();
            axios.post(`${this.IP_ENDPOINT}/auth/signin`, {
                email_or_id_siswa: this.emailOrIdSiswa,
                password: this.password
            })
            .then(({ data }) => {
                const dataAuth = data.data;
                localStorage.setItem("auth_token", dataAuth.token);
                if (dataAuth.level == "ADMIN") {
                    this.$router.push({ name: "Dashboard Admin Page" });
                } else if (dataAuth.level == "SISWA") {
                    localStorage.setItem("nama_siswa", dataAuth.nama_pengguna);
                    localStorage.setItem("tingkat", dataAuth.tingkat);
                    localStorage.setItem("jurusan", dataAuth.jurusan);
                    this.$router.push({ name: "Dashboard Siswa Page" });
                }
            })
            .catch(({ response }) => {

                const errorMessages = response.data.errors;
                
                if(this.isObject(errorMessages)){
                    Object.keys(errorMessages).forEach((key) => {
                        
                        if (key == "email_or_id_siswa") {
                            this.isEmailOrIdSiswaError = true;
                            this.emailOrIdSiswaErrorMessage = errorMessages[key];
                        }

                        if (key == "password") {
                            this.isPasswordError = true;
                            this.passwordErrorMessage = errorMessages[key];
                        }
                    })
                }else{
                    this.isAuthError = true;
                    this.authErrorMessage = errorMessages;
                }
            });
        },
        isObject(value){
            return (
                typeof value === 'object' && value !== null && !Array.isArray(value)
            );
        },
        resetForm(){
            this.isEmailOrIdSiswaError = false;
            this.emailOrIdSiswaErrorMessage = "";
            this.isPasswordError = false;
            this.passwordErrorMessage = "";
        },
        checkAuth(){
            axios.get(`${this.IP_ENDPOINT}/auth/check/user`, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
            .then(({ data }) => {
                console.log(data);
                const dataAuth = data.data;
                if (dataAuth.level == "ADMIN") {
                    console.log("OK ADMIN");
                    this.$router.push({ name: "Dashboard Admin Page" });
                } else if(dataAuth.level == "SISWA"){
                    console.log("OK SISWA");
                    this.$router.push({ name: "Dashboard Siswa Page" });
                }
            })
            .catch(({ response }) => {
                console.error(response);
            });
        }
    }
}
</script>