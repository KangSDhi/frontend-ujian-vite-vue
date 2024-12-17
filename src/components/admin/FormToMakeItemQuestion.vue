<template>
    <div class="container mx-auto p-10 bg-slate-500 rounded-md shadow-lg">
        <Editor 
            :api-key="tinyMCEApiKey"
            :init="editorConfig"/>
        <ul>
            <li class="flex flex-row gap-2">
                <div>
                    A.
                </div>
                <input type="text">
                <input type="file">
            </li>
            <li>
                B.
                <input type="text">
            </li>
        </ul>
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