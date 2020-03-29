<template>
    <div>
        <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full md:w-1/3 px-3">
                <Select id="php-version" label="Php version" :default-value="settings.phpVersion" :options="phpVersionOptions" @on-value-change="val => settings.phpVersion = val"/>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <Select id="class-case" label="Class case" :default-value="settings.classCase" :options="caseOptions" @on-value-change="val => settings.classCase = val"/>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <Select id="property-case" label="Property case" :default-value="settings.propertyCase" :options="caseOptions" @on-value-change="val => settings.propertyCase = val"/>
            </div>
        </div>

        <Checkbox label="Add constructor" :default-value="settings.addConstructor" @on-value-change="val => settings.addConstructor = val"/>
        <Checkbox label="Add docblocks" :default-value="settings.addDocBlocks" @on-value-change="val => settings.addDocBlocks = val"/>
        <Checkbox label="Final classes" :default-value="settings.finalClasses" @on-value-change="val => settings.finalClasses = val"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {default as SettingsModel} from "@/classes/dto/Settings";
    import Checkbox from "@/components/form/Checkbox.vue";
    import Select from "@/components/form/Select.vue";
    import SelectOption from "@/classes/dto/SelectOption";
    import EnumSelect from "@/classes/support/EnumSelect";
    import {PhpVersion} from "@/classes/enums/PhpVersion";
    import {StringCase} from "@/classes/enums/StringCase";

    @Component({
        components: {
            Checkbox,
            Select
        }
    })
    export default class Settings extends Vue {
        @Prop(Object)
        private settings!: SettingsModel;

        get phpVersionOptions(): SelectOption[] {
            return EnumSelect.getOptions(PhpVersion);
        }

        get caseOptions(): SelectOption[] {
            return EnumSelect.getOptions(StringCase);
        }
    }
</script>