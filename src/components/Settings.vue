<template>
    <TabPanel>
        <TabNav>
            <TabNavItem :isActive="isActive('general')" @click="setActive('general')">
                General
            </TabNavItem>
            <TabNavItem :isActive="isActive('letter-case')" @click="setActive('letter-case')">
                Letter case
            </TabNavItem>
            <TabNavItem :isActive="isActive('docblock')" @click="setActive('docblock')">
                Docblock
            </TabNavItem>
            <TabNavItem :isActive="isActive('from-json')" @click="setActive('from-json')">
                From JSON
            </TabNavItem>
        </TabNav>

        <TabContent :isActive="isActive('general')">
             <div class="flex flex-wrap md:space-x-3">
                  <div class="w-full md:w-1/3 mb-2">
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
                   <div class="w-full md:w-1/3 mb-2">
                        <FormGroup>
                            <Label for="property-visibility">
                                Property visibility
                            </Label>
                            <Select id="property-visibility"
                                    v-model="settings.propertyVisibility"
                                    :options="phpVisibilityOptions"
                            />
                        </FormGroup>
                  </div>
            </div>

            <FormGroup>
                <Checkbox label="Final classes" v-model="settings.finalClasses" />

                <Checkbox label="All properties nullable" v-model="settings.allPropertiesNullable" />

                <Checkbox label="Add extra new line after property" v-model="settings.propertyAddExtraNewLine" />

                <Checkbox label="Add constructor" v-model="settings.addConstructor" />

                <Checkbox label="Add getters" v-model="settings.addGetters" />

                <div class="flex">
                  <Checkbox label="Add setters" v-model="settings.addSetters" class="mr-4" />

                  <Checkbox v-if="settings.addSetters"
                            label="Is fluent setter"
                            v-model="settings.isFluentSetter"
                  />

                </div>
            </FormGroup>
        </TabContent>

        <TabContent :isActive="isActive('letter-case')" class="space-y-2">
            <FormGroup class="w-full md:w-1/3">
                <Label for="class-case">
                    Class case
                </Label>
                <Select id="class-case"
                        v-model="settings.classCase"
                        :options="caseOptions"
                />
            </FormGroup>

            <FormGroup class="w-full md:w-1/3">
                <Label for="property-case">
                    Property case
                </Label>
                <Select id="property-case"
                        v-model="settings.propertyCase"
                        :options="caseOptions"
                />
            </FormGroup>


            <FormGroup class="w-full md:w-1/3">
                <Label for="getter-case">
                    Getter case
                </Label>
                <Select id="getter-case"
                        v-model="settings.getterCase"
                        :options="caseOptions"
                />
            </FormGroup>


            <FormGroup class="w-full md:w-1/3">
                <Label for="setter-case">
                    Setter case
                </Label>
                <Select id="setter-case"
                        v-model="settings.setterCase"
                        :options="caseOptions"
                />
            </FormGroup>
        </TabContent>

        <TabContent :isActive="isActive('docblock')">
            <div class="flex flex-wrap md:space-x-3">
                <div class="w-full md:w-1/3 mb-2">
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
                <div class="w-full md:w-1/3 mb-2">
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
            
            <div class="flex">
                <FormGroup class="w-full md:w-1/3">
                    <Label for="method-constructor-docblock">
                        Method/Constructor docblock
                    </Label>
                    <Select id="method-constructor-docblock"
                            v-model="settings.docblock"
                            :options="docblockOptions"
                    />
                </FormGroup>
            </div>
        </TabContent>

        <TabContent :isActive="isActive('from-json')">
            <FormGroup>
                <Checkbox label="Add from json method" v-model="settings.addFromJsonMethod" />

                <Checkbox label="JSON response is an array" v-model="settings.jsonIsArray" />
            </FormGroup>
        </TabContent>
    </TabPanel>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {default as SettingsModel} from '@/dto/Settings';
    import Checkbox from '@/components/form/Checkbox.vue';
    import FormGroup from '@/components/form/FormGroup.vue';
    import Label from '@/components/form/Label.vue';
    import Select from '@/components/form/Select.vue';
    import TabContent from '@/components/tab-panel/TabContent.vue';
    import TabNav from '@/components/tab-panel/TabNav.vue';
    import TabNavItem from '@/components/tab-panel/TabNavItem.vue';
    import TabPanel from '@/components/tab-panel/TabPanel.vue';
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
            Select,
            TabContent,
            TabPanel,
            TabNav,
            TabNavItem
        }
    })
    export default class Settings extends Vue {
        @Prop(Object) private readonly settings!: SettingsModel;

        private activeTab = 'general';

        private isActive(tab: string): boolean {
            return this.activeTab === tab;
        }

        private setActive(tab: string): void {
            this.activeTab = tab;
        }

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