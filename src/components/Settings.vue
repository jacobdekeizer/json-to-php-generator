<template>
    <TabPanel>
        <TabNav>
            <TabNavItem :isActive="activeTab === 'general'" @click="activeTab = 'general'">
                General
            </TabNavItem>
            <TabNavItem :isActive="activeTab === 'letter-case'" @click="activeTab = 'letter-case'">
                Letter case
            </TabNavItem>
            <TabNavItem :isActive="activeTab === 'docblock'" @click="activeTab = 'docblock'">
                Docblock
            </TabNavItem>
            <TabNavItem :isActive="activeTab === 'from-json'" @click="activeTab = 'from-json'">
                From JSON
            </TabNavItem>
        </TabNav>

        <TabContent :isActive="activeTab === 'general'">
             <div class="flex flex-wrap md:space-x-3">
                  <div class="w-full md:w-1/3 mb-2">
                      <FormGroup>
                          <Label for="php-version">
                              PHP version
                          </Label>
                          <Select id="php-version"
                                  :model-value="props.modelValue.phpVersion"
                                  @update:modelValue="(val) => updateSettings({ phpVersion: val })"
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
                                    :model-value="props.modelValue.propertyVisibility"
                                    @update:modelValue="(val) => updateSettings({ propertyVisibility: val })"
                                    :options="phpVisibilityOptions"
                            />
                        </FormGroup>
                  </div>
            </div>

            <FormGroup>
                <Checkbox
                    label="Final classes"
                    :model-value="props.modelValue.finalClasses"
                    @update:modelValue="(val) => updateSettings({ finalClasses: val })"
                />

                <Checkbox
                    label="All properties nullable"
                    :model-value="props.modelValue.allPropertiesNullable"
                    @update:modelValue="(val) => updateSettings({ allPropertiesNullable: val })"
                />

                <Checkbox
                    label="Add extra new line after property"
                    :model-value="props.modelValue.propertyAddExtraNewLine"
                    @update:modelValue="(val) => updateSettings({ propertyAddExtraNewLine: val })"
                />

                <Checkbox
                    label="Add constructor"
                    :model-value="props.modelValue.addConstructor"
                    @update:modelValue="(val) => updateSettings({ addConstructor: val })"
                />

                <Checkbox
                    label="Add getters"
                    :model-value="props.modelValue.addGetters"
                    @update:modelValue="(val) => updateSettings({ addGetters: val })"
                />

                <div class="flex">
                  <Checkbox
                      label="Add setters"
                      class="mr-4"
                      :model-value="props.modelValue.addSetters"
                      @update:modelValue="(val) => updateSettings({ addSetters: val })"
                  />

                  <Checkbox v-if="props.modelValue.addSetters"
                            label="Is fluent setter"
                            :model-value="props.modelValue.isFluentSetter"
                            @update:modelValue="(val) => updateSettings({ isFluentSetter: val })"
                  />

                </div>
            </FormGroup>
        </TabContent>

        <TabContent :isActive="activeTab === 'letter-case'" class="space-y-2">
            <FormGroup class="w-full md:w-1/3">
                <Label for="class-case">
                    Class case
                </Label>
                <Select id="class-case"
                        :model-value="props.modelValue.classCase"
                        @update:modelValue="(val) => updateSettings({ classCase: val })"
                        :options="caseOptions"
                />
            </FormGroup>

            <FormGroup class="w-full md:w-1/3">
                <Label for="property-case">
                    Property case
                </Label>
                <Select id="property-case"
                        :model-value="props.modelValue.propertyCase"
                        @update:modelValue="(val) => updateSettings({ propertyCase: val })"
                        :options="caseOptions"
                />
            </FormGroup>


            <FormGroup class="w-full md:w-1/3">
                <Label for="getter-case">
                    Getter case
                </Label>
                <Select id="getter-case"
                        :model-value="props.modelValue.getterCase"
                        @update:modelValue="(val) => updateSettings({ getterCase: val })"
                        :options="caseOptions"
                />
            </FormGroup>


            <FormGroup class="w-full md:w-1/3">
                <Label for="setter-case">
                    Setter case
                </Label>
                <Select id="setter-case"
                        :model-value="props.modelValue.setterCase"
                        @update:modelValue="(val) => updateSettings({ setterCase: val })"
                        :options="caseOptions"
                />
            </FormGroup>
        </TabContent>

        <TabContent :isActive="activeTab === 'docblock'">
            <div class="flex flex-wrap md:space-x-3">
                <div class="w-full md:w-1/3 mb-2">
                    <FormGroup>
                        <Label for="property-docblock">
                            Property docblock
                        </Label>
                        <Select id="property-docblock"
                                :model-value="props.modelValue.propertyDocblock"
                                @update:modelValue="(val) => updateSettings({ propertyDocblock: val })"
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
                                :model-value="props.modelValue.propertyDocblockType"
                                @update:modelValue="(val) => updateSettings({ propertyDocblockType: val })"
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
                            :model-value="props.modelValue.docblock"
                            @update:modelValue="(val) => updateSettings({ docblock: val })"
                            :options="docblockOptions"
                    />
                </FormGroup>
            </div>
        </TabContent>

        <TabContent :isActive="activeTab === 'from-json'">
            <FormGroup>
                <Checkbox
                    label="Add from json method"
                    :model-value="props.modelValue.addFromJsonMethod"
                    @update:modelValue="(val) => updateSettings({ addFromJsonMethod: val })"
                />

                <Checkbox
                    label="JSON response is an array"
                    :model-value="props.modelValue.jsonIsArray"
                    @update:modelValue="(val) => updateSettings({ jsonIsArray: val })"
                />
            </FormGroup>
        </TabContent>
    </TabPanel>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';

import Checkbox from '@/components/form/Checkbox.vue';
import FormGroup from '@/components/form/FormGroup.vue';
import Label from '@/components/form/Label.vue';
import Select from '@/components/form/Select.vue';
import TabContent from '@/components/tab-panel/TabContent.vue';
import TabNav from '@/components/tab-panel/TabNav.vue';
import TabNavItem from '@/components/tab-panel/TabNavItem.vue';
import TabPanel from '@/components/tab-panel/TabPanel.vue';

import {default as SettingsModel} from '@/dto/Settings';
import EnumSelect from '@/support/EnumSelect';
import {PhpVersion} from '@/enums/PhpVersion';
import {StringCase} from '@/enums/StringCase';
import {PhpVisibility} from '@/enums/PhpVisibility';
import {PropertyDocblockType} from '@/enums/PropertyDocblockType';
import {PhpDocblock} from '@/enums/PhpDocblock';

const props = defineProps<{ modelValue: SettingsModel }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: SettingsModel): void }>()

const phpVersionOptions = EnumSelect.getOptions(PhpVersion);
const caseOptions = EnumSelect.getOptions(StringCase);
const phpVisibilityOptions = EnumSelect.getOptions(PhpVisibility);
const propertyDocblockTypeOptions = EnumSelect.getOptions(PropertyDocblockType);
const docblockOptions = EnumSelect.getOptions(PhpDocblock);

const activeTab = ref('general');

const updateSettings = (newProps: Partial<SettingsModel>): void => {
  emit('update:modelValue', { ...props.modelValue, ...newProps });
}
</script>