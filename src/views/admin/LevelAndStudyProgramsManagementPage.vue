<template>
    <BaseLayout>
        <template #content>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <LevelTable @levelsData="setLevelData($event)"
                    @isFormToMakeLevelTrue="formToMakeLevelToggle($event)"
                    @isFormToEditLevelTrue="formToEditLevelOpen($event)"
                    @isDialogToDeleteLevelTrue="dialogToDeleteLevelOpen($event)"/>
                <StudyProgramTable/>
            </div>
            <FormToMakeLevel v-show="isFormToMakeLevel"
                :token="token"
                @isFormToMakeLevelFalse="formToMakeLevelToggle($event)"/>
            <FormToEditLevel v-show="isFormToEditLevel"
                :token="token"
                :level-data-edit="levelDataEdit"
                @isFormToEditLevelFalse="formToEditLevelClose($event)"/>
            <DialogToDeleteLevel v-show="isDialogToDeleteLevel"
                :token="token"
                :level-data-delete="levelDataDelete"
                @isDialogToDeleteLevelFalse="dialogToDeleteLevelClose($event)"/>
        </template>
    </BaseLayout>
</template>

<script>
import BaseLayout from "./BaseLayout.vue";
import LevelTable from "../../components/admin/LevelTable.vue";
import FormToMakeLevel from "../../components/admin/FormToMakeLevel.vue";
import FormToEditLevel from "../../components/admin/FormToEditLevel.vue";
import DialogToDeleteLevel from "../../components/admin/DialogToDeleteLevel.vue";
import StudyProgramTable from "../../components/admin/StudyProgramTable.vue";

export default {
    name: "LevelAndStudyProgramsManagementPage",
    components: {
        BaseLayout,
        LevelTable,
        FormToMakeLevel,
        FormToEditLevel,
        DialogToDeleteLevel,
        StudyProgramTable
    },
    data(){
        return {
            IP_API_ENDPOINT: import.meta.env.VITE_IP_API_ENDPOINT,
            token: localStorage.getItem("auth_token"),
            levelData: [],
            isFormToMakeLevel: false,
            isFormToEditLevel: false,
            levelDataEdit: {},
            isDialogToDeleteLevel: false,
            levelDataDelete: {},
        }
    },
    methods: {
        setLevelData(value){
            console.log(value);
            
            this.levelData = value;
        },
        formToMakeLevelToggle(value){
            this.isFormToMakeLevel = value;
        },
        setEditLevelData(id){
            const data = JSON.parse(JSON.stringify(this.levelData));
            const index = data.findIndex((item) => item.id === id);
            this.levelDataEdit = data[index];
        },
        formToEditLevelOpen(value){
            console.table(value);
            this.setEditLevelData(value.id);
            this.isFormToEditLevel = value.status;
        },
        formToEditLevelClose(value){
            this.isFormToEditLevel = value;
        },
        setDeleteLevelData(id){
            const data = JSON.parse(JSON.stringify(this.levelData));
            const index = data.findIndex((item) => item.id === id);
            this.levelDataDelete = data[index];
        },
        dialogToDeleteLevelOpen(value){
            console.log(value);
            this.setDeleteLevelData(value.id);
            this.isDialogToDeleteLevel = value.status;
        },
        dialogToDeleteLevelClose(value){
            this.isDialogToDeleteLevel = value;
        }
    }
}
</script>