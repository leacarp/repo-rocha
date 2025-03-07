<template>
  <q-page>
    <div class="q-pa-md">
    <q-list
      bordered
      separator
    >
      <q-item
        v-for="entry in entries"
        :key="entry.id"
      >
        <q-item-section
          class="text-weight-bold"
          :class="useAmountColorClass(entry.amount)">
          {{ entry.name }}
        </q-item-section>

        <q-item-section 
        class="text-weight-bold"
        :class="useAmountColorClass(entry.amount)"
        side
        >
          {{ useCurrencify(entry.amount) }}
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <q-footer
    class="bg-transparent"
  >
    <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
    <div class="col text-grey-7 text-h6">
      Balance:
    </div>
    <div
    :class="useAmountColorClass(balance)" 
    class="col text-h6 text-right">
      {{ useCurrencify(balance) }}
    </div>
    </div>
    <q-form 
      @submit="addEntry"
      class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
    >
      <div class="col">
        <q-input
        v-model="addEntryForm.name" 
        outlined 
        placeholder="Name" 
        bg-color="white" 
        dense />
      </div>
      <div class="col">
        <q-input
        v-model="addEntryForm.amount" 
        outlined 
        placeholder="Amount" 
        bg-color="white" 
        dense 
        input-class="text-right" 
        type="number" 
        step="0.01"/>
      </div>
      <div class="col col-auto">
        <q-btn
        color="primary"
        icon="add"
        type="submit"
        round>
        </q-btn>
      </div>
    </q-form>
  </q-footer>
  </q-page>
</template>

<script setup>

/**Imports */
import { ref, computed, reactive } from 'vue'
import { uid } from 'quasar'
import {useCurrencify} from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'

/**Entries */

const entries = ref([
  {
    id: 'id1',
    name: 'Salary',
    amount: 1000
  },
  {
    id: 'id2',
    name: 'Rent',
    amount: -999
  },
  {
    id: 'id3',
    name: 'Phone',
    amount: -14.99
  },
  {
    id: 'id4',
    name: 'Unknown',
    amount: 0
  }
])

/*Balance*/

const balance = computed(() => {
  return entries.value.reduce((accumulator, {amount}) => {
    return accumulator + amount
  }, 0)
})

/*Agregar entrada de dinero*/

const addEntryForm = reactive({
  name: '',
  amount: null
})

const addEntry = () => {
  const newEntry = {
    id: uid(),
    name: addEntryForm.name,
    amount: addEntryForm.amount
  }
  console.log("newEntry", newEntry)
}
</script>
