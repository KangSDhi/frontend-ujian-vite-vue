<template>
    <div class="container mx-auto py-5 px-2 mb-5 bg-gray-200 rounded-md shadow-lg">
        <h1 class="text-xl mb-2">Soal No {{ index + 1 }}</h1>
        <div class="flex flex-row gap-2">
            <div class="flex flex-col w-3/4">
                <textarea class="w-full h-full" v-model="data.pertanyaan"></textarea>
            </div>
            <div class="flex flex-col w-1/4">
                Gambar Pertanyaan
                <img v-if="data.question_image_preview == null" src="/img/image.svg" class="w-48 h-48"
                    alt="Gambar Pertanyaan Preview" srcset="">
                <img v-else :src="data.question_image_preview" class="w-48 h-48" alt="Gambar Pertanyaan Preview"
                    srcset="">
                <input type="file">
            </div>
        </div>
        <div class="flex w-3/4 justify-end">
            <h4 class="mr-16">Skor</h4>
        </div>
        <ul class="flex flex-col w-3/4 m-3">
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">A.</div>
                <div class="flex flex-col w-1/2">
                    <input type="text" v-model="data.pilihan_a"
                        class="py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        :disabled="data.option_a_image_preview != null">
                </div>
                <div class="w-1/4">
                    <input v-if="data.option_a_image_preview == null" type="file">
                    <button v-else class="h-9 px-4 bg-red-500 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <input type="number" v-model="data.nilai_a" class="w-20 py-1 px-1">
            </li>
            <li v-if="data.option_a_image_preview != null">
                <img :src="data.option_a_image_preview" alt="Gambar Pilihan A" class="w-48 h-48 ml-6 mb-2" srcset="">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">B.</div>
                <div class="flex flex-col w-1/2">
                    <input type="text" v-model="data.pilihan_b"
                        class="py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        :disabled="data.option_b_image_preview != null">
                </div>
                <div class="w-1/4">
                    <input v-if="data.option_b_image_preview == null" type="file">
                    <button v-else class="h-9 px-4 bg-red-500 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <input type="number" v-model="data.nilai_b" class="w-20 py-1 px-1">
            </li>
            <li v-if="data.option_b_image_preview != null">
                <img :src="data.option_b_image_preview" alt="Gambar Pilihan B" class="w-48 h-48 ml-6 mb-2" srcset="">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">C.</div>
                <div class="flex flex-col w-1/2">
                    <input type="text" v-model="data.pilihan_c"
                        class="py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        :disabled="data.option_c_image_preview != null">
                </div>
                <div class="w-1/4">
                    <input v-if="data.option_c_image_preview == null" type="file">
                    <button v-else class="h-9 px-4 bg-red-500 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <input type="number" v-model="data.nilai_c" class="w-20 py-1 px-1">
            </li>
            <li v-if="data.option_c_image_preview != null">
                <img :src="data.option_c_image_preview" alt="Gambar Pilihan C" class="w-48 h-48 ml-6 mb-2" srcset="">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">D.</div>
                <div class="flex flex-col w-1/2">
                    <input type="text" v-model="data.pilihan_d"
                    class="py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    :disabled="data.option_d_image_preview != null">
                </div>
                <div class="w-1/4">
                    <input v-if="data.option_d_image_preview == null" type="file">
                    <button v-else class="h-9 px-4 bg-red-500 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <input type="number" v-model="data.nilai_d" class="w-20 py-1 px-1">
            </li>
            <li v-if="data.option_d_image_preview != null">
                <img :src="data.option_d_image_preview" alt="Gambar Pilihan D" class="w-48 h-48 ml-6 mb-2" srcset="">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">E.</div>
                <div class="flex flex-col w-1/2">
                    <input type="text" v-model="data.pilihan_e"
                    class="py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    :disabled="data.option_e_image_preview != null">
                </div>
                <div class="w-1/4">
                    <input v-if="data.option_e_image_preview == null" type="file">
                    <button v-else class="h-9 px-4 bg-red-500 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
                <input type="number" v-model="data.nilai_e" class="w-20 py-1 px-1">
            </li>
            <li v-if="data.option_e_image_preview != null">
                <img :src="data.option_e_image_preview" alt="Gambar Pilihan E" class="w-48 h-48 ml-6 mb-2" srcset="">
            </li>
        </ul>
        <div class="flex flex-row gap-2 px-5">
            <button class="flex py-1.5 px-1 bg-blue-400 rounded-md text-base">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Update
            </button>
            <button class="flex py-1.5 px-1 bg-red-500 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                Hapus
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "FormItemQuestion",
    props: {
        index: {
            type: Number
        },
        data: {
            type: Object
        }
    },
    data() {
        return {

        }
    }
}
</script>