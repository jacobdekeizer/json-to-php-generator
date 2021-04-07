<template>
    <div>
        <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full md:w-1/3 px-3">
                <Select id="php-version"
                        label="Php version"
                        :default-value="settings.phpVersion"
                        :options="phpVersionOptions"
                        @on-value-change="val => settings.phpVersion = val"/>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <Select id="class-case"
                        label="Class case"
                        :default-value="settings.classCase"
                        :options="caseOptions"
                        @on-value-change="val => settings.classCase = val"/>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <Select id="property-case"
                        label="Property case"
                        :default-value="settings.propertyCase"
                        :options="caseOptions"
                        @on-value-change="val => settings.propertyCase = val"/>
            </div>
        </div>
        <hr class="mb-3"/>
        <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full md:w-1/3 px-3">
                <Select id="property-visiblity"
                        label="Property visibility"
                        :default-value="settings.propertyVisibility"
                        :options="phpVisibilityOptions"
                        @on-value-change="val => settings.propertyVisibility = val"/>

                <Checkbox class="mt-3"
                          label="Add extra new line after property"
                          :default-value="settings.propertyAddExtraNewLine"
                          @on-value-change="val => settings.propertyAddExtraNewLine = val"/>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <Select id="property-docblock"
                        label="Property docblock"
                        :default-value="settings.propertyDocblock"
                        :options="docblockOptions"
                        @on-value-change="val => settings.propertyDocblock = val"/>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <Select v-if="propertyDocblockVisible"
                        id="property-docblock"
                        label="Property docblock type"
                        :default-value="settings.propertyDocblockType"
                        :options="propertyDocblockTypeOptions"
                        @on-value-change="val => settings.propertyDocblockType = val"/>
            </div>
        </div>
        <hr class="mb-3"/>
        <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/3 px-3">
                <Checkbox class="mb-3"
                          label="Add getters"
                          :default-value="settings.addGetters"
                          @on-value-change="val => settings.addGetters = val"/>
                <Select v-if="settings.addGetters"
                        class="mb-3"
                        id="getter-case"
                        label="Getter case"
                        :default-value="settings.getterCase"
                        :options="caseOptions"
                        @on-value-change="val => settings.getterCase = val" />
            </div>
            <div class="w-full md:w-1/3 px-3">
                <div class="flex flex-wrap">
                    <div class="w-full md:w-1/2">
                        <Checkbox label="Add setters"
                                  :default-value="settings.addSetters"
                                  @on-value-change="val => settings.addSetters = val"/>
                    </div>
                    <div class="w-full md:w-1/2">
                        <Checkbox v-if="settings.addSetters"
                                  class="mb-3"
                                  label="Is fluent setter"
                                  :default-value="settings.isFluentSetter"
                                  @on-value-change="val => settings.isFluentSetter = val"/>
                    </div>
                </div>

                <Select v-if="settings.addSetters"
                        class="mb-3"
                        id="setter-case"
                        label="Setter case"
                        :default-value="settings.setterCase"
                        :options="caseOptions"
                        @on-value-change="val => settings.setterCase = val" />
            </div>
        </div>
        <hr class="mb-3"/>
        <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/3 px-3">
                <Checkbox label="Add constructor"
                          :default-value="settings.addConstructor"
                          @on-value-change="val => settings.addConstructor = val"/>
                <Checkbox label="Final classes"
                          :default-value="settings.finalClasses"
                          @on-value-change="val => settings.finalClasses = val"/>
                <Checkbox label="Add from json method"
                          :default-value="settings.addFromJsonMethod"
                          @on-value-change="val => settings.addFromJsonMethod = val"/>
                <Checkbox label="All properties nullable"
                          :default-value="settings.allPropertiesNullable"
                          @on-value-change="val => settings.allPropertiesNullable = val"/>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <Select id="method-constructor-docblock"
                        label="Method/Constructor Docblock"
                        :default-value="settings.docblock"
                        :options="docblockOptions"
                        @on-value-change="val => settings.docblock = val"/>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {default as SettingsModel} from '@/dto/Settings';
    import Checkbox from '@/components/form/Checkbox.vue';
    import Select from '@/components/form/Select.vue';
    import SelectOption from '@/dto/SelectOption';
    import EnumSelect from '@/support/EnumSelect';
    import {PhpVersion} from '@/enums/PhpVersion';
    import {StringCase} from '@/enums/StringCase';
    import {PhpVisibility} from '@/enums/PhpVisibility';
    import {PhpDocblock} from '@/enums/PhpDocblock';
    import {PropertyDocblockType} from '@/enums/PropertyDocblockType';

    @Component({
        components: {
            Checkbox,
            Select
        }
    })
    export default class Settings extends Vue {
        @Prop(Object) private readonly settings!: SettingsModel;

        private get phpVersionOptions(): SelectOption[] {
            return EnumSelect.getOptions(PhpVersion);
        }

        private get caseOptions(): SelectOption[] {
            return EnumSelect.getOptions(StringCase);
        }

        private get phpVisibilityOptions(): SelectOption[] {
            return EnumSelect.getOptions(PhpVisibility);
        }

        private get docblockOptions(): SelectOption[] {
            return EnumSelect.getOptions(PhpDocblock);
        }

        private get propertyDocblockTypeOptions(): SelectOption[] {
            return EnumSelect.getOptions(PropertyDocblockType);
        }

        private get propertyDocblockVisible(): boolean {
            return this.settings.propertyDocblock !== PhpDocblock.None;
        }
    }
</script>