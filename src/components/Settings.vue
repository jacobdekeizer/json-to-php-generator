<template>
  <TabPanel>
    <TabNav>
      <TabNavItem
        :is-active="activeTab === 'general'"
        @click="activeTab = 'general'"
      >
        General
      </TabNavItem>
      <TabNavItem
        :is-active="activeTab === 'letter-case'"
        @click="activeTab = 'letter-case'"
      >
        Letter case
      </TabNavItem>
      <TabNavItem
        :is-active="activeTab === 'docblock'"
        @click="activeTab = 'docblock'"
      >
        Docblock
      </TabNavItem>
      <TabNavItem
        :is-active="activeTab === 'from-json'"
        @click="activeTab = 'from-json'"
      >
        From JSON
      </TabNavItem>
    </TabNav>

    <TabContent :is-active="activeTab === 'general'">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <FormGroup>
            <Label for="php-version">
              Class
            </Label>
            <Select
              id="php-version"
              :model-value="props.modelValue.phpVersion"
              :options="phpVersionOptions"
              @update:model-value="(val) => updateSettings({ phpVersion: val })"
            />
          </FormGroup>

          <Checkbox
            label="Final classes"
            :model-value="props.modelValue.finalClasses"
            @update:model-value="(val) => updateSettings({ finalClasses: val })"
          />

          <Checkbox
            v-if="supportsReadonlyClasses(props.modelValue)"
            label="Readonly classes"
            :model-value="props.modelValue.readonlyClasses"
            @update:model-value="(val) => updateSettings({ readonlyClasses: val })"
          />

          <Checkbox
            label="Add constructor"
            :model-value="props.modelValue.addConstructor"
            @update:model-value="(val) => updateSettings({ addConstructor: val })"
          />

          <Checkbox
            v-if="supportsConstructorPropertyPromotion(props.modelValue)"
            label="Constructor property promotion"
            :model-value="props.modelValue.constructorPropertyPromotion"
            @update:model-value="(val) => updateSettings({ constructorPropertyPromotion: val })"
          />
        </div>
        <div>
          <FormGroup>
            <Label for="property-visibility">
              Properties
            </Label>
            <Select
              id="property-visibility"
              :model-value="props.modelValue.propertyVisibility"
              :options="phpVisibilityOptions"
              @update:model-value="(val) => updateSettings({ propertyVisibility: val })"
            />
          </FormGroup>

          <Checkbox
            label="All properties nullable"
            :model-value="props.modelValue.allPropertiesNullable"
            @update:model-value="(val) => updateSettings({ allPropertiesNullable: val })"
          />

          <Checkbox
            label="Add extra new line after property"
            :model-value="props.modelValue.propertyAddExtraNewLine"
            @update:model-value="(val) => updateSettings({ propertyAddExtraNewLine: val })"
          />

          <Checkbox
            v-if="supportsReadonlyProperties(props.modelValue) && !props.modelValue.readonlyClasses"
            label="Readonly properties"
            :model-value="props.modelValue.readonlyProperties"
            @update:model-value="(val) => updateSettings({ readonlyProperties: val })"
          />
        </div>
        <div>
          <Label>
            Methods
          </Label>

          <Checkbox
            label="Add getters"
            :model-value="props.modelValue.addGetters"
            @update:model-value="(val) => updateSettings({ addGetters: val })"
          />

          <Checkbox
            v-if="!hasReadonlyProperties"
            label="Add setters"
            class="mr-4"
            :model-value="props.modelValue.addSetters"
            @update:model-value="(val) => updateSettings({ addSetters: val })"
          />

          <Checkbox
            v-if="props.modelValue.addSetters"
            label="Is fluent setter"
            :model-value="props.modelValue.isFluentSetter"
            @update:model-value="(val) => updateSettings({ isFluentSetter: val })"
          />
        </div>
      </div>
    </TabContent>

    <TabContent
      :is-active="activeTab === 'letter-case'"
      class="space-y-2"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <FormGroup>
            <Label for="class-case">
              Class case
            </Label>
            <Select
              id="class-case"
              :model-value="props.modelValue.classCase"
              :options="caseOptions"
              @update:model-value="(val) => updateSettings({ classCase: val })"
            />
          </FormGroup>

          <FormGroup>
            <Label for="property-case">
              Property case
            </Label>
            <Select
              id="property-case"
              :model-value="props.modelValue.propertyCase"
              :options="caseOptions"
              @update:model-value="(val) => updateSettings({ propertyCase: val })"
            />
          </FormGroup>


          <FormGroup>
            <Label for="getter-case">
              Getter case
            </Label>
            <Select
              id="getter-case"
              :model-value="props.modelValue.getterCase"
              :options="caseOptions"
              @update:model-value="(val) => updateSettings({ getterCase: val })"
            />
          </FormGroup>


          <FormGroup>
            <Label for="setter-case">
              Setter case
            </Label>
            <Select
              id="setter-case"
              :model-value="props.modelValue.setterCase"
              :options="caseOptions"
              @update:model-value="(val) => updateSettings({ setterCase: val })"
            />
          </FormGroup>
        </div>
      </div>
    </TabContent>

    <TabContent :is-active="activeTab === 'docblock'">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <FormGroup>
            <Label for="property-docblock">
              Property docblock
            </Label>
            <Select
              id="property-docblock"
              :model-value="props.modelValue.propertyDocblock"
              :options="docblockOptions"
              @update:model-value="(val) => updateSettings({ propertyDocblock: val })"
            />
          </FormGroup>
          <FormGroup>
            <Label for="property-docblock">
              Property docblock type
            </Label>
            <Select
              id="property-docblock"
              :model-value="props.modelValue.propertyDocblockType"
              :options="propertyDocblockTypeOptions"
              @update:model-value="(val) => updateSettings({ propertyDocblockType: val })"
            />
          </FormGroup>
          <FormGroup>
            <Label for="method-constructor-docblock">
              Method/Constructor docblock
            </Label>
            <Select
              id="method-constructor-docblock"
              :model-value="props.modelValue.docblock"
              :options="docblockOptions"
              @update:model-value="(val) => updateSettings({ docblock: val })"
            />
          </FormGroup>
        </div>
      </div>
    </TabContent>

    <TabContent :is-active="activeTab === 'from-json'">
      <FormGroup>
        <Checkbox
          label="Add from json method"
          :model-value="props.modelValue.addFromJsonMethod"
          @update:model-value="(val) => updateSettings({ addFromJsonMethod: val })"
        />

        <Checkbox
          label="JSON response is an array"
          :model-value="props.modelValue.jsonIsArray"
          @update:model-value="(val) => updateSettings({ jsonIsArray: val })"
        />
      </FormGroup>
    </TabContent>
  </TabPanel>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits, ref, computed} from 'vue';

import Checkbox from '@/components/form/Checkbox.vue';
import FormGroup from '@/components/form/FormGroup.vue';
import Label from '@/components/form/Label.vue';
import Select from '@/components/form/Select.vue';
import TabContent from '@/components/tab-panel/TabContent.vue';
import TabNav from '@/components/tab-panel/TabNav.vue';
import TabNavItem from '@/components/tab-panel/TabNavItem.vue';
import TabPanel from '@/components/tab-panel/TabPanel.vue';

import {
  default as SettingsModel,
  supportsConstructorPropertyPromotion,
  supportsReadonlyClasses,
  supportsReadonlyProperties
} from '@/dto/Settings';
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

const hasReadonlyProperties = computed(() => props.modelValue.readonlyProperties || props.modelValue.readonlyClasses);

const updateSettings = (newProps: Partial<SettingsModel>): void => {
  emit('update:modelValue', { ...props.modelValue, ...newProps });
}
</script>