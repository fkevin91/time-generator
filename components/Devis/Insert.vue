<script setup >
import { BLANK_PDF, generate } from '@pdfme/generator';
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const title = ref('')
const description = ref('')
const numberDevis = ref('')
const full_name_client = ref('')
const adress_client = ref('')
const prestations_devis = ref('')
const total_ttc = ref('')
const text_loi = ref('La loi n°92/1442 du 31 décembre 1992 nous fait l\'obligation de vous indiquer que le non-respect des conditions de paiement entraine des intérêts de retard suivant modalités et taux défini par la loi. Une indemnité forfaitaire de 40€ sera due pour frais de recouvrement en cas de retard de paiement.')


const template = {
  basePdf: BLANK_PDF,
  schemas: [
    {
      a: {
        type: 'text',
        position: { x: 0, y: 0 },
        width: 10,
        height: 10,
      },
      b: {
        type: 'text',
        position: { x: 10, y: 10 },
        width: 10,
        height: 10,
      },
      c: {
        type: 'text',
        position: { x: 20, y: 20 },
        width: 10,
        height: 10,
      },
    },
  ],
};

async function insertDevis() {
  console.log(JSON.stringify(prestations_devis.value))
  const { data, error } = await supabase.from('devis').insert([
    { 
      title: title.value, 
      description: description.value, 
      number: numberDevis.value, 
      full_name_client: full_name_client.value, 
      adress_client: adress_client.value,
      prestations: JSON.stringify(prestations_devis.value),
      total_ttc: total_ttc.value
    },
  ])
  let result = data
  const inputs = [{ a: title.value, b: description.value, c: JSON.stringify(total_ttc.value) }];
  generate({ template, inputs }).then((pdf) => {
    console.log(pdf);
    // Browser
    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));

    // Node.js
    // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
  })
}

</script>

<template>
  <div class="p-3 rounded-lg shadow-xl">
    <div class="flex justify-end">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="numberdevis">
          N° de devis
        </label>
        <input v-model="numberDevis" class="shadow appearance-none border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numberdevis" type="number" placeholder="n° devis">
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
        Titre
      </label>
      <input v-model="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="titre">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
        Description
      </label>
      <input v-model="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="description">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="full_name_client">
        Nom prénom du client
      </label>
      <input v-model="full_name_client" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="full_name_client" type="text" placeholder="nom prénom">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="adress_client">
        Adresse du client
      </label>
      <input v-model="adress_client" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adress_client" type="text" placeholder="adresse">
    </div>

    <PrestationsList @totalttc="(n)=>total_ttc = n" @presta="(n)=>prestations_devis = n"/>
    <button class="p-1 italic w-full text-center bg-blue-500 text-white rounded-lg" @click="insertDevis">Générer le devis</button>
  </div>
  
</template>