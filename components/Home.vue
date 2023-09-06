<script setup>
  import { defineAsyncComponent } from 'vue'
  const menu = ref('')
  const titlePage = ref('')

  const AsyncDashboard = defineAsyncComponent(() => import('./Dashboard.vue'))
  const AsyncDevisInsert = defineAsyncComponent(() => import('./Devis/Insert.vue'))
  const AsyncDevisList = defineAsyncComponent(() => import('./Devis/List.vue'))
  const AsyncDevisSetting = defineAsyncComponent(() => import('./Devis/Setting.vue'))
  const AsyncPrestationsInsert = defineAsyncComponent(() => import('./Prestations/insert.vue'))
  const AsyncAccount = defineAsyncComponent(() => import('./Account.vue'))
  const AsyncFactureList = defineAsyncComponent(() => import('./Facture/List.vue'))
</script>

<template>
  <div class="p-3">
    <div v-if="!menu" class="flex flex-col items-center justify-around space-y-10">
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center cursor-pointer" @click="titlePage='Dash Board', menu = 'dashboard'">Dash Board</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center cursor-pointer" @click="titlePage='Nouveau Devis', menu = 'newdevis'">Nouveau Devis</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center cursor-pointer" @click="titlePage='Mes Prestations', menu = 'newprestas'">Mes Prestations</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center cursor-pointer" @click="titlePage='Mes Devis', menu = 'listdevis'">Mes Devis</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center cursor-pointer" @click="titlePage='Mes Facture', menu = 'listfacture'">Mes Facture</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center cursor-pointer" @click="titlePage='Parametres Devis', menu = 'setting'">Parametres Devis</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center cursor-pointer" @click="titlePage='Mon compte', menu = 'myaccount'">Mon compte</div>
      <!--
        <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center line-through" @click="menu = 'newinvoice'">Nouvelle Facture</div>
        <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center line-through" @click="menu = 'listinvoices'">Mes Facture</div>
      -->
    </div>
    <div v-if="menu" class="flex space-x-3 text-white mb-4 w-full">
      <svg @click="menu = ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>{{'Retour - ' + titlePage}}</p>
      
    </div>
    <AsyncDashboard v-if="menu === 'dashboard'" />
    <AsyncDevisSetting v-if="menu === 'setting'" />
    <AsyncDevisInsert v-if="menu === 'newdevis'" />
    <AsyncPrestationsInsert v-if="menu === 'newprestas'" />
    <AsyncFactureList v-if="menu === 'listfacture'" />
    <AsyncDevisList v-if="menu === 'listdevis'" />
    <AsyncAccount v-if="menu === 'myaccount'" />

  </div>
</template>