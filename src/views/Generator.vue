<template>
    <div>
        <Card>
            <div class="flex space-x-1">
              <h1 class="flex-grow text-dark-700 dark:text-dark-300 font-bold text-3xl">
                JSON to PHP class converter
              </h1>
              <ThemeColorSwitch class="flex-none w-6 h-6 mt-2" />
            </div>

            <div class="text-dark-600 dark:text-dark-400 mt-0 mb-6">
                Generate PHP classes from JSON
            </div>

            <Label for="json-input">
                Json input
            </Label>
            <TextArea id="json-input" class="mb-4" v-model="jsonContent" placeholder="Paste JSON content here..."/>

            <h2 class="text-dark-700 dark:text-dark-300 font-bold text-2xl mb-2">Settings</h2>

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
    import ThemeColorSwitch from '@/components/ThemeColorSwitch.vue';

    @Component({
        components: {
          ThemeColorSwitch,
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

