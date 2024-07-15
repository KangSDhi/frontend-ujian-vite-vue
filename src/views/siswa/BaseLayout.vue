<template>
    <section>
        <main class="p-4 sm:ml-64">
            <slot name="content"></slot>
        </main>
    </section>
</template>

<script>
import axios from "axios";

export default {
    data(){
        return {
            IP_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            token: localStorage.getItem("auth_token"),
        }
    },
    mounted(){
        this.checkAuthSiswa();
    },
    methods: {
        checkAuthSiswa(){
            axios.get(`${this.IP_ENDPOINT}/siswa/ping`, {
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(({ response }) => {
                const httpCode = response.data.httpCode;
                if (httpCode === 401) {
                    localStorage.removeItem("auth_token");
                    this.$router.push({ name: "Halaman Login" });
                }else if (httpCode === 403) {
                    localStorage.removeItem("auth_token");
                    this.$router.push({ name: "Halaman Login" });
                }
            });
        }
    }
}
</script>