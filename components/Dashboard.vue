<script setup >
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const devis = ref(null)
const facture = ref(null)

let devisTrie = {
  onhold: [],
  valid: [],
  denied: [],
  draft: [],
}
let devisDashborad = ref({
  onhold: {},
  valid: {},
  denied: {},
  draft: {},
})
let factureTrie = {
  onhold: [],
  create: [],
  paid: [],
}
let factureDashborad = ref({
  onhold: {},
  create: {},
  paid: {},
})

async function getDevis() {
  const { data } = await supabase.from('devis').select('total_ttc, status').eq('owner', user.value.id)
  devis.value = data
  triageDevis(devis.value)
}
async function getFacture() {
  const { data } = await supabase.from('facture').select('total_ttc, status').eq('owner', user.value.id)
  facture.value = data
  triageFacture(facture.value)
}

function triageDevis(list) {
  list.forEach(elt => {
    elt.status == 'onhold' ? devisTrie.onhold.push(elt) : false
    elt.status == 'valid' ? devisTrie.valid.push(elt) : false
    elt.status == 'denied' ? devisTrie.denied.push(elt) : false
    elt.status == 'draft' ? devisTrie.draft.push(elt) : false
  });
  for (const key in devisTrie) {
    let total = 0
    let nb = devisTrie[key].length
    devisTrie[key].forEach(x => {
      total += x.total_ttc
    });
    devisDashborad.value[key] = {total : total, nb : nb}
  }
}
function triageFacture(list) {
  list.forEach(elt => {
    elt.status == 'onhold' ? factureTrie.onhold.push(elt) : false
    elt.status == 'create' ? factureTrie.create.push(elt) : false
    elt.status == 'paid' ? factureTrie.paid.push(elt) : false
  });
  for (const key in factureTrie) {
    let total = 0
    let nb = factureTrie[key].length
    factureTrie[key].forEach(x => {
      total += x.total_ttc
    });
    factureDashborad.value[key] = {total : total, nb : nb}
  }
}

onMounted(() => {
  getDevis()
  getFacture()
})

</script>

<template>
  <div class="space-y-5">
    <div class="p-3 rounded-lg shadow-xl h-full space-y-3 opacity-90 bg-white">
      <div class="space-y-1">
        <div class="flex justify-between space-x-1">
          <div class="text-center bg-white w-full p-3">Devis</div>
          <div class="text-center bg-green-400 w-full p-3 text-xs md:text-base">En attente</div>
          <div class="text-center bg-green-400 w-full p-3 text-xs md:text-base">Validé</div>
          <div class="text-center bg-green-400 w-full p-3 text-xs md:text-base">Refusé</div>
          <div class="text-center bg-green-400 w-full p-3 text-xs md:text-base">Brouillon</div>
        </div>
        <div class="flex justify-between space-x-1">
          <div class="text-center bg-green-400 w-full p-3">2023</div>
          <div class="text-center bg-green-400 w-full p-3 text-xs md:text-base font-semibold">{{ devisDashborad.onhold.nb + ' / ' + devisDashborad.onhold.total + '€' }}</div>
          <div class="text-center bg-green-400 w-full p-3 text-xs md:text-base font-semibold">{{ devisDashborad.valid.nb + ' / ' + devisDashborad.valid.total + '€' }}</div>
          <div class="text-center bg-orange-400 w-full p-3 text-xs md:text-base font-semibold">{{ devisDashborad.denied.nb + ' / ' + devisDashborad.denied.total + '€' }}</div>
          <div class="text-center bg-green-400 w-full p-3 text-xs md:text-base font-semibold">{{ devisDashborad.draft.nb + ' / ' + devisDashborad.draft.total + '€' }}</div>
        </div>
      </div>
    </div>
    <div class="p-3 rounded-lg shadow-xl h-full space-y-3 opacity-90 bg-white">
      <div class="space-y-1">
        <div class="flex justify-between space-x-1 ite">
          <div class="text-center bg-white w-full p-3">Facture</div>
          <div class="text-center bg-blue-400 w-full p-3 text-xs md:text-base">Créé</div>
          <div class="text-center bg-blue-400 w-full p-3 text-xs md:text-base">Payé</div>
          <div class="text-center bg-blue-400 w-full p-3 text-xs md:text-base">En attente</div>
        </div>
        <div class="flex justify-between space-x-1">
          <div class="text-center bg-blue-400 w-full p-3">2023</div>
          <div class="text-center bg-blue-400 w-full p-3 text-xs md:text-base font-semibold">{{ factureDashborad.create.nb + ' / ' + factureDashborad.create.total + '€' }}</div>
          <div class="text-center bg-blue-400 w-full p-3 text-xs md:text-base font-semibold">{{ factureDashborad.paid.nb + ' / ' + factureDashborad.paid.total + '€' }}</div>
          <div class="text-center bg-orange-400 w-full p-3 text-xs md:text-base font-semibold">{{ factureDashborad.onhold.nb + ' / ' + factureDashborad.onhold.total + '€' }}</div>
        </div>
      </div>
    </div>
    <div class="p-3 rounded-lg shadow-xl h-full space-y-3 opacity-90 bg-white">
      <div class="space-y-1">
        <div class="flex justify-between">
          <div class="text-center bg-white w-full p-3">Historique des actions</div>
        </div>
        <div class="flex justify-between space-x-1 border-b-2">
          <div class="">Facture</div>
          <div class="">n° 197</div>
          <div class="">Créé</div>
          <div class="">le 18/09/2023</div>
          <div class="">En attente</div>
        </div>
        <div class="flex justify-between space-x-1 border-b-2">
          <div class="">Facture</div>
          <div class="">n° 197</div>
          <div class="">Envoyé</div>
          <div class="">le 18/09/2023</div>
          <div class="">En attente</div>
        </div>
        <div class="flex justify-between space-x-1 border-b-2">
          <div class="">Facture</div>
          <div class="">n° 197</div>
          <div class="">Créé</div>
          <div class="">le 18/09/2023</div>
          <div class="">En attente</div>
        </div>
        <div class="flex justify-between space-x-1 border-b-2">
          <div class="">Facture</div>
          <div class="">n° 197</div>
          <div class="">Envoyé</div>
          <div class="">le 18/09/2023</div>
          <div class="">En attente</div>
        </div>
        <div class="flex justify-between space-x-1 border-b-2">
          <div class="">Facture</div>
          <div class="">n° 197</div>
          <div class="">Créé</div>
          <div class="">le 18/09/2023</div>
          <div class="">En attente</div>
        </div>
        <div class="flex justify-between space-x-1 border-b-2">
          <div class="">Facture</div>
          <div class="">n° 197</div>
          <div class="">Envoyé</div>
          <div class="">le 18/09/2023</div>
          <div class="">En attente</div>
        </div>
      </div>
    </div>

  </div>
</template>