<template>
    <div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 m-1">
            <div class="justify-self-center sm:justify-self-start">
                <select id="view-level-data-table"
                    class="block w-20 p-2 mb-2 text-sm rounded-lg text-gray-900 border-gray-300 bg-gray-50 dark:bg-gray-700 dark:placeholder:placeholder-gray-400 dark:text-white"
                    v-model="view" @change="changeView()">
                    <template v-for="(item, index) in listViewBinding()">
                        <option :value="item">{{ item }}</option>
                    </template>
                </select>
            </div>
            <div class="grid grid-cols-1">
                <button
                    class="px-5 py-2 h-10 w-50 justify-self-center text-sm me-2 rounded-lg inline-flex items-center bg-blue-200 dark:bg-blue-400 hover:bg-blue-300 dark:hover:bg-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Tambah Tingkat
                </button>
            </div>
            <div class="justify-self-center mb-2 sm:justify-items-end">
                <label for="search-level-data-table"
                    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Cari Tingkat
                </label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input id="search-level-data-table" v-model="searchInput" type="search"
                        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Cari Tingkat">
                </div>
            </div>
        </div>
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead class="text-xs uppercase text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            #
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nama Tingkat
                        </th>
                        <th scope="col" class="px-6 py-3 text-end">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="levelDataTemp.length == 0">
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th class="text-xl text-center py-2.5" colspan="3">
                                Data Soal Kosong
                            </th>
                        </tr>
                    </template>
                    <template v-for="(item, index) in levelDataTemp" :key="index">
                        <tr v-show="checkView(index + 1)"
                            class="border-b bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row"
                                class="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                {{ index + 1 }}
                            </th>
                            <td class="px-6 py-4">
                                {{ item.nama_tingkat }}
                            </td>
                            <td class="px-6 py-4">
                                <button>
                                    Edit
                                </button>
                                <button>
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <nav>
            <ul class="flex items-center -space-x-px h-10 text-base">
                <li>
                    <button @click="clickPage(1)"
                        class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-bl-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Awal
                    </button>
                </li>
                <li>
                    <button @click="clickPage(pagination.currentPage - 1)"
                        class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Previous</span>
                        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>
                <template v-for="(item, index) in pagination.pages" :key="index">
                    <li>
                        <button @click="clickPage(item)"
                            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:cursor-pointer"
                            :class="{ 'dark:bg-white dark:text-gray-800': pagination.currentPage === item }">
                            {{ item }}
                        </button>
                    </li>
                </template>
                <li>
                    <button @click="clickPage(pagination.currentPage + 1)"
                        class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Next</span>
                        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
                <li>
                    <button @click="clickPage(pagination.lastPage)"
                        class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-br-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Akhir
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "LevelTable",
    emits: [
        "levelsData",
        "isFormToMakeLevelTrue",
        "isFormToEditLevelTrue",
        "isDialogToDeleteLevelTrue"
    ],
    data() {
        return {
            IP_API_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            token: localStorage.getItem("auth_token"),
            levelData: [],
            levelDataTemp: [],
            listView: [10, 20, 50, 100],
            view: 10,
            searchInput: "",
            pagination: {
                pages: [],
                total: 0,
                lastPage: 0,
                perPage: 5,
                currentPage: 1,
                offset: 5,
                from: 1,
                to: 10
            }
        }
    },
    mounted() {
        this.loadLevelData()
    },
    watch: {
        searchInput: function(newVal, oldVal) {
            this.search(newVal);
        }
    },
    methods: {
        loadLevelData() {
            axios.get(`${this.IP_API_ENDPOINT}/admin/tingkat`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    this.levelDataTemp = this.levelData = data.data;
                    this.pagination.lastPage = Math.ceil(data.data.length / this.view);

                    this.initView();

                    this.$emit("levelsData", data.data);

                    this.showPages();

                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        initView() {
            if (this.listView[0] > this.levelDataTemp.length) {
                this.view = this.levelDataTemp.length;
            }
        },
        checkView(index){
            return index > this.pagination.to || index < this.pagination.from ? false : true;
        },
        listViewBinding(){
            const list = [];
            for (let index = 0; index < this.listView.length; index++) {
                if (this.listView[index] < this.levelDataTemp.length) {
                    list.push(this.listView[index]);
                }
            }

            const itemsLength = parseInt(JSON.stringify(this.levelDataTemp.length));

            list.push(itemsLength);

            return list;
        },
        changeView(){
            this.changePage(1);
            this.showPages();
        },
        changePage(page){
            if (page >= 1 && page <= this.pagination.lastPage) {

                this.showPages();

                const total = this.levelDataTemp.length;
                const lastPage = Math.ceil(total / this.view) || 1;
                const from = (page - 1) * this.view + 1;
                let to = page * this.view;

                if (page === lastPage) {
                    to = total;
                }

                this.pagination.total = total;
                this.pagination.lastPage = lastPage;
                this.pagination.perPage = this.view;
                this.pagination.currentPage = page;
                this.pagination.from = from;
                this.pagination.to = to;
            }
        },
        showPages() {
            const pages = [];

            let from = this.pagination.currentPage - Math.ceil(this.pagination.offset / 2);

            if (from < 1) {
                from = 1;
            }

            let to = from + this.pagination.offset - 1;

            if (to > this.pagination.lastPage) {
                to = this.pagination.lastPage;
            }

            while (from <= to) {
                pages.push(from);
                from++;
            }

            this.pagination.pages = pages;
        },
        clickPage(page){
            this.changePage(page);
            this.showPages();
        },
        search(value) {
            if (value.length >= 1) {
                const searchValue = value.toLowerCase();
                this.levelDataTemp = this.levelData.filter(item => {
                    return (
                        item.nama_tingkat?.toLowerCase().includes(searchValue)
                    );
                });
            } else {
                this.levelDataTemp = this.levelData;
            }
        }
    }
}
</script>