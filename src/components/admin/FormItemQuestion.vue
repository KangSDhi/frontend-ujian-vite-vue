<template>
    <div class="container mx-auto py-5 px-2 mb-5 bg-gray-200 rounded-md shadow-lg">
        <h1 class="text-xl mb-2">Soal No {{ index + 1 }}</h1>
        <div class="flex flex-row gap-2">
            <Editor :api-key="tinyMCEApiKey" :init="editorConfig" v-model="data.pertanyaan" />
            <div class="flex flex-col">
                Gambar Pertanyaan
                <img src="/img/image.svg" class="w-48 h-48" alt="Gambar Pertanyaan Preview" srcset="">
                <input type="file">
            </div>
        </div>
        <ul class="flex flex-col m-3">
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">A.</div>
                <input type="text" v-model="data.pilihan_a"
                    class="w-1/4 py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <input type="file">
                <input type="number" v-model="data.nilai_a" class="w-20 py-1 px-1">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">B.</div>
                <input type="text" v-model="data.pilihan_b"
                    class="w-1/4 py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <input type="file">
                <input type="number" v-model="data.nilai_b" class="w-20 py-1 px-1">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">C.</div>
                <input type="text" v-model="data.pilihan_c"
                    class="w-1/4 py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <input type="file">
                <input type="number" v-model="data.nilai_c" class="w-20 py-1 px-1">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">D.</div>
                <input type="text" v-model="data.pilihan_d"
                    class="w-1/4 py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <input type="file">
                <input type="number" v-model="data.nilai_d" class="w-20 py-1 px-1">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">E.</div>
                <input type="text" v-model="data.pilihan_e"
                    class="w-1/4 py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <input type="file">
                <input type="number" v-model="data.nilai_e" class="w-20 py-1 px-1">
            </li>
        </ul>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

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
    components: {
        Editor
    },
    data() {
        return {
            tinyMCEApiKey: import.meta.env.VITE_TINY_MCE_API_KEY,
            editorConfig: {
                toolbar_mode: 'sliding',
                width: 800,
                height: 250,
                plugins: [
                    // Core editing features
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            },
        }
    }
}
</script>