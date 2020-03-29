<template>
    <div>
        <Select id="php-version" label="Php version" :default-value="settings.phpVersion" :options="phpVersionOptions" @on-value-change="val => settings.phpVersion = val"/>
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
    }
</script>