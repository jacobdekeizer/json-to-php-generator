<template>
    <div>
        <Card>
            <h1 class="text-gray-700 text-sm font-bold text-3xl">
                JSON to PHP converter
            </h1>
            <div class="mt-0 mb-6 text-gray-600">
                Generate PHP classes from json
            </div>

            <TextArea class="mb-4" id="json-input" label="Json input" @on-value-change="onJsonContentChange"/>

            <div class="mb-4">
                <h2 class="text-gray-700 text-sm font-bold text-2xl mb-2">Settings</h2>
                <Settings class="px-3" :settings="settings"/>
            </div>

            <button @click="generate" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Generate
            </button>
        </Card>
        <Card v-if="this.code">
            <Code :code="code"/>
        </Card>
        <Card v-if="this.errorMessage">
            <Alert :message="errorMessage"/>
        </Card>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    import Alert from "@/components/Alert.vue";
    import Card from '@/components/Card.vue';
    import Code from '@/components/Code.vue';
    import Settings from "@/components/Settings.vue";

    import TextArea from "@/components/form/TextArea.vue";

    import {default as SettingsModel} from "@/classes/dto/Settings";
    import JsonToPhpFactory from "@/classes/factories/JsonToPhpFactory";
    import PhpClass from "@/classes/dto/PhpClass";
    import PhpClassPresenter from "@/classes/presenters/PhpClassPresenter";

    @Component({
        components: {
            Alert,
            Card,
            Code,
            Settings,
            TextArea
        }
    })
    export default class Home extends Vue {
        private jsonContent = '';
        private code: string | null = null;
        private class: PhpClass | null = null;
        private settings = new SettingsModel();
        private errorMessage = '';

        public generate(): void {
            this.errorMessage = '';
            try {
                this.class = JsonToPhpFactory.make(this.jsonContent);
            } catch (e) {
                this.errorMessage = e.message;
                return;
            }

            this.code = (new PhpClassPresenter(this.class, this.settings)).toString();
        }

        private onJsonContentChange(content: string) {
            this.jsonContent = content;
        }
    }
</script>

