<template>
    <div>
        <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full md:w-1/3 px-3">
                <FormGroup>
                    <Label for="php-version">
                        PHP version
                    </Label>
                    <Select id="php-version"
                            v-model="settings.phpVersion"
                            :options="phpVersionOptions"
                    />
                </FormGroup>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <FormGroup>
                    <Label for="class-case">
                        Class case
                    </Label>
                    <Select id="class-case"
                            v-model="settings.classCase"
                            :options="caseOptions"
                    />
                </FormGroup>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <FormGroup>
                    <Label for="property-case">
                        Property case
                    </Label>
                    <Select id="property-case"
                            v-model="settings.propertyCase"
                            :options="caseOptions"
                    />
                </FormGroup>
            </div>
        </div>
        <hr class="mb-3"/>
        <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full md:w-1/3 px-3">
                <FormGroup>
                    <Label for="property-visibility">
                        Property visibility
                    </Label>
                    <Select id="property-visibility"
                            v-model="settings.propertyVisibility"
                            :options="phpVisibilityOptions"
                    />
                </FormGroup>

                <Checkbox class="mt-3"
                          label="Add extra new line after property"
                          v-model="settings.propertyAddExtraNewLine"
                />
            </div>
            <div class="w-full md:w-1/3 px-3">
                <FormGroup>
                    <Label for="property-docblock">
                        Property docblock
                    </Label>
                    <Select id="property-docblock"
                            v-model="settings.propertyDocblock"
                            :options="docblockOptions"
                    />
                </FormGroup>
            </div>
            <div class="w-full md:w-1/3 px-3" v-if="propertyDocblockVisible">
                <FormGroup>
                    <Label for="property-docblock">
                        Property docblock type
                    </Label>
                    <Select id="property-docblock"
                            v-model="settings.propertyDocblockType"
                            :options="propertyDocblockTypeOptions"
                    />
                </FormGroup>
            </div>
        </div>
        <hr class="mb-3"/>
        <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/3 px-3">
                <Checkbox class="mb-3" label="Add getters" v-model="settings.addGetters" />

                <FormGroup v-if="settings.addGetters">
                    <Label for="getter-case">
                        Getter case
                    </Label>
                    <Select class="mb-3"
                            id="getter-case"
                            v-model="settings.getterCase"
                            :options="caseOptions"
                    />
                </FormGroup>
            </div>
            <div class="w-full md:w-1/3 px-3">
                <div class="flex flex-wrap">
                    <div class="w-full md:w-1/2">
                        <Checkbox label="Add setters" v-model="settings.addSetters" />
                    </div>
                    <div class="w-full md:w-1/2">
                        <Checkbox v-if="settings.addSetters"
                                  class="mb-3"
                                  label="Is fluent setter"
                                  v-model="settings.isFluentSetter"
                        />
                    </div>
                </div>

                <FormGroup v-if="settings.addSetters">
                    <Label for="setter-case">
                        Setter case
                    </Label>
                    <Select class="mb-3"
                            id="setter-case"
                            v-model="settings.setterCase"
                            :options="caseOptions"
                    />
                </FormGroup>
            </div>
        </div>
        <hr class="mb-3"/>
        <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/3 px-3">
                <Checkbox label="Add constructor" v-model="settings.addConstructor" />
                <Checkbox label="Final classes" v-model="settings.finalClasses" />
                <Checkbox label="Add from json method" v-model="settings.addFromJsonMethod" />
                <Checkbox label="All properties nullable" v-model="settings.allPropertiesNullable" />
            </div>
            <div class="w-full md:w-1/3 px-3">
                <FormGroup v-if="settings.addSetters">
                    <Label for="method-constructor-docblock">
                        Method/Constructor Docblock
                    </Label>
                    <Select id="method-constructor-docblock"
                            v-model="settings.docblock"
                            :options="docblockOptions"
                    />
                </FormGroup>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {default as SettingsModel} from '@/dto/Settings';
    import Checkbox from '@/components/form/Checkbox.vue';
    import FormGroup from '@/components/form/FormGroup.vue';
    import Label from '@/components/form/Label.vue';
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
            FormGroup,
            Label,
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