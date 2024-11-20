<template>
    <BaseLayout>
        <template #content>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <LevelTable/>
                <StudyProgramTable/>
            </div>
        </template>
    </BaseLayout>
</template>

<script>
import axios from "axios";
import BaseLayout from "./BaseLayout.vue";
import LevelTable from "../../components/admin/LevelTable.vue";
import StudyProgramTable from "../../components/admin/StudyProgramTable.vue";

export default {
    name: "LevelAndStudyProgramsManagementPage",
    components: {
        BaseLayout,
        LevelTable,
        StudyProgramTable
    }
}
</script>