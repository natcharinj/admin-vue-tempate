<template>
  <div class="px-2.5 pt-[60px]">
    <div
      :class="[`text-[#6b6b6b]`, 'text-3xl font-bold  py-6 pl-[60px]']"
    >
      รายการขอขึ้นทะเบียน
    </div>
    <TabGroup>
      <TabList class="flex">
        <Tab
          v-for="(tab, tdx) in tabList"
          as="template"
          :key="tab"
          v-slot="{ selected }"
        >
          <div
            :class="[
              'px-6 py-1.5 cursor-pointer w-[180px] text-sm text-center outline-none',
              tdx === 0 ? 'rounded-tr-full' : 'rounded-t-full -ml-3',
              `${tabIndexClassName[tab]}`,
              selected ? `bg-[#d9d9d9] z-20` : `bg-[#f1f1f1]`,
            ]"
          >
            {{ tab }}
          </div>
        </Tab>
      </TabList>
      <TabPanels :class="[`bg-[#d9d9d9]`, 'p-2.5']">
        <TabPanel v-for="(tabName, idx) in tabList" :key="idx">
          <div class="w-full flex justify-end mb-2.5">
            <div class="relative">
              <DebouncedInput
                :modelValue="globalFilter ?? ''"
                @update:modelValue="(value) => (globalFilter = String(value))"
                :class="[
                  'outline-none rounded-full text-sm leading-4 min-h-[30px] pl-10 pr-4 relative',
                  `bg-[#f1f1f1]`,
                ]"
                placeholder="ค้นหา"
              />
              <FontAwesomeIcon
                :icon="faSearch"
                :class="[`text-[#c2c2c2]`, 'absolute top-2 left-4 text-sm']"
              />
            </div>
          </div>
          <div class="bg-white px-5 py-4">
            <table class="w-full">
              <thead>
                <tr>
                  <th
                    v-for="(row, rdx) in table.options.columns"
                    :class="[
                      'text-sm font-normal',
                      rdx > 2 ? 'text-center' : 'text-left',
                    ]"
                  >
                    {{ row.header }}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, rtdx) in table
                    .getRowModel()
                    .rows.filter((item) =>
                      tabName === 'ตรวจสอบความถูกต้อง'
                        ? true
                        : item.original.status.search(tabName) !== -1
                    )"
                  :key="row.id"
                  :class="[rtdx !== 0 ? 'border-t' : '']"
                >
                  <td
                    v-for="(cell, cdx) in row.getVisibleCells()"
                    :key="cell.id"
                    :class="[
                      cdx === 0 ? 'font-bold' : '',
                      cdx > 2 ? 'text-center' : 'text-left',
                    ]"
                  >
                    <FlexRender
                      :render="cell.column.columnDef.cell"
                      :props="cell.getContext()"
                      v-if="cdx < 5"
                    />
                    <div
                      v-else
                      :class="[
                        'text-white max-w-[180px] text-sm py-1 rounded-full mx-auto',
                        cell.row.original.statusName == STATUS_REGISTER
                          ? 'bg-green-700'
                          : cell.row.original.statusName == STATUS_IN_REVIEW
                            ? 'bg-rose-600'
                            : cell.row.original.statusName == STATUS_PUBLISH_DOC
                              ? 'bg-blue-600'
                              : cell.row.original.statusName == STATUS_MODIFY
                                ? 'bg-amber-400'
                                : 'bg-neutral-400',
                      ]"
                    >
                      {{ cell.getValue() }}
                    </div>
                  </td>
                  <td>
                    <FontAwesomeIcon :icon="faTrash" class="cursor-pointer" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  ColumnDef,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from '@tanstack/vue-table';
import { ref } from 'vue';
import DebouncedInput from '../../components/DebouncedInput.vue';
import {
  RequestRegistration,
  tabIndexClassName,
  defaultTabList,
  defaultColumn,
  getStatusButtonClassName,
  STATUS_IN_REVIEW,
  STATUS_REGISTER,
  STATUS_PUBLISH_DOC,
  STATUS_MODIFY,
} from './dummpy.const';

const requestRegistration = ref<RequestRegistration[]>([]);
const globalFilter = ref<string>('');
const tabList = ref(defaultTabList);

fetch('https://test-api-py77dwlbxa-df.a.run.app/data')
  .then((response) => response.json())
  .then(
    (data) =>
      (requestRegistration.value = data.map((item: RequestRegistration) => ({
        ...item,
        statusName: getStatusButtonClassName(item.status),
      })))
  );

const columns: ColumnDef<RequestRegistration>[] = defaultColumn;
const table = useVueTable<RequestRegistration>({
  columns,
  get data() {
    return requestRegistration.value;
  },
  state: {
    get globalFilter() {
      return globalFilter.value;
    },
  },
  onGlobalFilterChange: (updaterOrValue) => {
    globalFilter.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(globalFilter.value)
        : updaterOrValue;
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getFacetedMinMaxValues: getFacetedMinMaxValues(),
});
</script>

<style scoped>
tr {
  height: 45px;
  color: #9ca3af;
}
</style>
