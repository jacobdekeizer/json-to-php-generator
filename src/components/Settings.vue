<template>
  <TabPanel>
    <TabNav>
      <TabNavItem :is-active="activeTab === 'general'" @click="activeTab = 'general'"> General </TabNavItem>
      <TabNavItem :is-active="activeTab === 'letter-case'" @click="activeTab = 'letter-case'"> Letter case </TabNavItem>
      <TabNavItem :is-active="activeTab === 'docblock'" @click="activeTab = 'docblock'"> Docblock </TabNavItem>
      <TabNavItem :is-active="activeTab === 'namespace'" @click="activeTab = 'namespace'">
        Namespace / Class
      </TabNavItem>
    </TabNav>

    <TabContent :is-active="activeTab === 'general'">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <FormGroup>
            <Label for="php-version"> Class </Label>
            <Select id="php-version" v-model="model.phpVersion" :options="phpVersionOptions" />
          </FormGroup>

          <Checkbox v-model="model.finalClasses" label="Final classes" />

          <Checkbox v-if="supportsReadonlyClasses(model)" v-model="model.readonlyClasses" label="Readonly classes" />

          <Checkbox v-model="model.addConstructor" label="Add constructor" />

          <Checkbox
            v-if="supportsConstructorPropertyPromotion(model)"
            v-model="model.constructorPropertyPromotion"
            label="Constructor property promotion"
          />

          <Checkbox v-model="model.declareStrictTypes" label="Declare strict types" />
        </div>
        <div>
          <FormGroup>
            <Label for="property-visibility"> Properties </Label>
            <Select id="property-visibility" v-model="model.propertyVisibility" :options="phpVisibilityOptions" />
          </FormGroup>

          <Checkbox v-model="model.allPropertiesNullable" label="All properties nullable" />

          <Checkbox v-model="model.propertyAddExtraNewLine" label="Add extra new line after property" />

          <Checkbox
            v-if="supportsReadonlyProperties(model) && !model.readonlyClasses"
            v-model="model.readonlyProperties"
            label="Readonly properties"
          />
        </div>
        <div>
          <Label> Methods </Label>

          <Checkbox v-model="model.addGetters" label="Add getters" />

          <Checkbox v-if="!hasReadonlyProperties" v-model="model.addSetters" label="Add setters" class="mr-4" />

          <Checkbox v-if="model.addSetters" v-model="model.isFluentSetter" label="Is fluent setter" />

          <Label class="mt-2"> From JSON </Label>

          <FormGroup>
            <Checkbox v-model="model.addFromJsonMethod" label="Add from json method" />

            <Checkbox v-model="model.jsonIsArray" label="JSON response is an array" />
          </FormGroup>

          <Label class="mt-2"> To Array </Label>

          <FormGroup>
            <Checkbox v-model="model.addToArrayMethod" label="Add toArray method" />
          </FormGroup>
        </div>
      </div>
    </TabContent>

    <TabContent :is-active="activeTab === 'letter-case'" class="space-y-2">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <FormGroup>
            <Label for="class-case"> Class case </Label>
            <Select id="class-case" v-model="model.classCase" :options="caseOptions" />
          </FormGroup>

          <FormGroup>
            <Label for="property-case"> Property case </Label>
            <Select id="property-case" v-model="model.propertyCase" :options="caseOptions" />
          </FormGroup>

          <FormGroup>
            <Label for="getter-case"> Getter case </Label>
            <Select id="getter-case" v-model="model.getterCase" :options="caseOptions" />
          </FormGroup>

          <FormGroup>
            <Label for="setter-case"> Setter case </Label>
            <Select id="setter-case" v-model="model.setterCase" :options="caseOptions" />
          </FormGroup>
        </div>
      </div>
    </TabContent>

    <TabContent :is-active="activeTab === 'docblock'">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <FormGroup>
            <Label for="property-docblock"> Property docblock </Label>
            <Select id="property-docblock" v-model="model.propertyDocblock" :options="docblockOptions" />
          </FormGroup>
          <FormGroup>
            <Label for="property-docblock"> Property docblock type </Label>
            <Select
              id="property-docblock"
              v-model="model.propertyDocblockType"
              :options="propertyDocblockTypeOptions"
            />
          </FormGroup>
          <FormGroup>
            <Label for="method-constructor-docblock"> Method/Constructor docblock </Label>
            <Select id="method-constructor-docblock" v-model="model.docblock" :options="docblockOptions" />
          </FormGroup>
        </div>
      </div>
    </TabContent>

    <TabContent :is-active="activeTab === 'namespace'">
      <FormGroup>
        <Label for="root-class-name"> Root class name </Label>
        <TextInput id="root-class-name" v-model="model.rootClassName" placeholder="RootObject" />
      </FormGroup>
      <FormGroup>
        <Label for="root-class-name"> Namespace </Label>
        <TextInput id="root-class-name" v-model="model.namespace" />
      </FormGroup>
    </TabContent>
  </TabPanel>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

import Checkbox from '@/components/form/Checkbox.vue';
import FormGroup from '@/components/form/FormGroup.vue';
import Label from '@/components/form/Label.vue';
import Select from '@/components/form/Select.vue';
import TextInput from '@/components/form/TextInput.vue';
import TabContent from '@/components/tab-panel/TabContent.vue';
import TabNav from '@/components/tab-panel/TabNav.vue';
import TabNavItem from '@/components/tab-panel/TabNavItem.vue';
import TabPanel from '@/components/tab-panel/TabPanel.vue';

import {
  default as SettingsModel,
  supportsConstructorPropertyPromotion,
  supportsReadonlyClasses,
  supportsReadonlyProperties,
} from '@/dto/Settings';
import EnumSelect from '@/support/EnumSelect';
import { PhpVersion } from '@/enums/PhpVersion';
import { StringCase } from '@/enums/StringCase';
import { PhpVisibility } from '@/enums/PhpVisibility';
import { PropertyDocblockType } from '@/enums/PropertyDocblockType';
import { PhpDocblock } from '@/enums/PhpDocblock';

const model = defineModel<SettingsModel>({ required: true });

const phpVersionOptions = EnumSelect.getOptions(PhpVersion);
const caseOptions = EnumSelect.getOptions(StringCase);
const phpVisibilityOptions = EnumSelect.getOptions(PhpVisibility);
const propertyDocblockTypeOptions = EnumSelect.getOptions(PropertyDocblockType);
const docblockOptions = EnumSelect.getOptions(PhpDocblock);

const activeTab = ref<'general' | 'letter-case' | 'docblock' | 'namespace'>('general');

const hasReadonlyProperties = computed(() => model.value.readonlyProperties || model.value.readonlyClasses);
</script>
