<template>
    <div class="container mx-auto py-5 px-2 bg-gray-200 rounded-md shadow-lg">
        <h1 class="text-xl mb-2">Tambah Soal</h1>
        <div class="flex flex-row gap-2">
            <Editor :api-key="tinyMCEApiKey" :init="editorConfig" />
            <div class="flex flex-col">
                Gambar Pertanyaan
                <img src="/img/image.svg" class="w-48 h-48" alt="Gambar Pertanyaan Preview" srcset="">
                <input type="file">
            </div>
        </div>
        <ul class="flex flex-col m-3">
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">A.</div>
                <input type="text"
                    class="w-1/4 py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <input type="file">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">B.</div>
                <input type="text"
                    class="w-1/4 py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <input type="file">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">C.</div>
                <input type="text"
                    class="w-1/4 py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <input type="file">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">D.</div>
                <input type="text"
                    class="w-1/4 py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <input type="file">
            </li>
            <li class="flex flex-row gap-2 mb-2">
                <div class="w-8 h-8 text-base text-center">E.</div>
                <input type="text"
                    class="w-1/4 py-1 px-1 rounded-md bg-slate-200 border border-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <input type="file">
            </li>
        </ul>
        <div class="flex flex-row gap-2 px-5">
            <button class="flex py-1.5 px-1 bg-blue-400 rounded-md text-base">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Simpan
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
import Editor from '@tinymce/tinymce-vue';

export default {
    props: {
        idSoal: {
            type: String
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