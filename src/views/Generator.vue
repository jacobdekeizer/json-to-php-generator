<template>
    <div>
        <Card>
            <h1 class="text-gray-700 text-sm font-bold text-3xl">
                JSON to PHP class converter
            </h1>

            <div class="mt-0 mb-6 text-gray-600">
                Generate PHP classes from json
            </div>

            <Label for="json-input">
                Json input
            </Label>
            <TextArea id="json-input" class="mb-4" v-model="jsonContent"/>

            <h2 class="text-gray-700 text-sm font-bold text-2xl mb-2">Settings</h2>

            <Settings :settings="settings"/>
        </Card>
        <Card v-if="code">
            <Code :code="code"/>
        </Card>
        <Card v-if="errorMessage">
            <Alert>
                {{ errorMessage }}
            </Alert>
        </Card>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    import Alert from '@/components/Alert.vue';
    import Card from '@/components/Card.vue';
    import Code from '@/components/Code.vue';
    import Label from '@/components/form/Label.vue';
    import Settings from '@/components/Settings.vue';
    import TextArea from '@/components/form/TextArea.vue';

    import {default as SettingsModel} from '@/dto/Settings';
    import JsonToPhpFactory from '@/factories/JsonToPhpFactory';
    import PhpClass from '@/dto/PhpClass';
    import PhpClassPresenter from '@/presenters/PhpClassPresenter';

    @Component({
        components: {
            Label,
            Alert,
            Card,
            Code,
            Settings,
            TextArea
        }
    })
    export default class Generator extends Vue {
        private jsonContent = '';
        private errorMessage = '';
        private class: PhpClass | null = null;
        private settings = new SettingsModel();

        private get code(): string | null {
            this.errorMessage = '';

            if (!this.jsonContent) {
                return null;
            }

            try {
                this.class = JsonToPhpFactory.make(this.jsonContent);
            } catch (e) {
                this.errorMessage = e.message;
                return null;
            }

            return (new PhpClassPresenter(this.class, this.settings)).toString();
        }
    }
</script>

