<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const menu = ref('')

</script>

<template>
  <div class="p-3">
    <div v-if="!menu" class="flex flex-col items-center justify-around space-y-10">
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center" @click="menu = 'newprestas'">Ajouter des prestations</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center" @click="menu = 'newdevis'">Nouveau Devis</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center" @click="menu = 'listdevis'">Liste des Devis</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center" @click="menu = 'setting'">Parametres Devis</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center" @click="menu = 'myaccount'">Mon compte</div>
      <!--
        <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center line-through" @click="menu = 'newinvoice'">Nouvelle Facture</div>
        <div class="rounded-lg shadow-xl p-3 bg-slate-200 w-60 text-center line-through" @click="menu = 'listinvoices'">Liste des Facture</div>
      -->
    </div>
    <div v-if="menu" @click="menu = ''" class="flex space-x-3 text-white mb-4 w-full">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>Menu Principal</p>
      
    </div>
    <DevisSetting v-if="menu === 'setting'" />
    <DevisInsert v-if="menu === 'newdevis'" />
    <PrestationsInsert v-if="menu === 'newprestas'" />
    <DevisList v-if="menu === 'listdevis'" />
    <Account v-if="menu === 'myaccount'" />

  </div>
</template>