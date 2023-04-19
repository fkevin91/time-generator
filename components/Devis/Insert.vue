<script setup >
import { BLANK_PDF, generate } from '@pdfme/generator';
const supabase = useSupabaseClient()
const user = useSupabaseUser()

let inputs
const title = ref('')
const description = ref('')
const numberDevis = ref('')
const full_name_client = ref('')
const adress_client = ref('')
const cp_client = ref('')
const city_client = ref('')
const tel_client = ref('')
const mail_client = ref('')
const prestations_devis = ref('')
const total_ttc = ref('')
const warn = ref('')
const text_loi = ref('La loi n°92/1442 du 31 décembre 1992 nous fait l\'obligation de vous indiquer que le non-respect des conditions de paiement entraine des intérêts de retard suivant modalités et taux défini par la loi. Une indemnité forfaitaire de 40€ sera due pour frais de recouvrement en cas de retard de paiement.')


const template = 
{
  schemas: [
    {
      "number": {
        "type": "text",
        "position": {
          "x": 152,
          "y": 48
        },
        "width": 30,
        "height": 9,
        "fontSize": 28,
        "fontColor": "#3282f0",
        "alignment": "right"
      },
      "siret_enterprise": {
        "type": "text",
        "position": {
          "x": 14,
          "y": 58
        },
        "width": 65,
        "height": 6,
        "alignment": "left",
        "fontSize": 13,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "name_enterprise": {
        "type": "text",
        "position": {
          "x": 14,
          "y": 64
        },
        "width": 65,
        "height": 6,
        "alignment": "left",
        "fontSize": 13,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "adress_enterprise": {
        "type": "text",
        "position": {
          "x": 14,
          "y": 70
        },
        "width": 65,
        "height": 6,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "cp_city_enterprise": {
        "type": "text",
        "position": {
          "x": 14,
          "y": 76
        },
        "width": 65,
        "height": 6,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "tel_enterprise": {
        "type": "text",
        "position": {
          "x": 14,
          "y": 82
        },
        "width": 65,
        "height": 6,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "mail_enterprise": {
        "type": "text",
        "position": {
          "x": 14,
          "y": 88
        },
        "width": 65,
        "height": 6,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "name_client": {
        "type": "text",
        "position": {
          "x": 131,
          "y": 64
        },
        "width": 65,
        "height": 6,
        "alignment": "right",
        "fontSize": 13,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "adress_client": {
        "type": "text",
        "position": {
          "x": 131,
          "y": 70
        },
        "width": 65,
        "height": 6,
        "alignment": "right",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "cp_city_client": {
        "type": "text",
        "position": {
          "x": 131,
          "y": 76
        },
        "width": 65,
        "height": 6,
        "alignment": "right",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "tel_client": {
        "type": "text",
        "position": {
          "x": 131,
          "y": 82
        },
        "width": 65,
        "height": 6,
        "alignment": "right",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "mail_client": {
        "type": "text",
        "position": {
          "x": 131,
          "y": 88
        },
        "width": 65,
        "height": 6,
        "alignment": "right",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "label_total_1": {
        "type": "text",
        "position": {
          "x": 139,
          "y": 256
        },
        "width": 30,
        "height": 6,
        "alignment": "right",
        "fontSize": 15,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "label_total_2": {
        "type": "text",
        "position": {
          "x": 139,
          "y": 262
        },
        "width": 30,
        "height": 6,
        "alignment": "right",
        "fontSize": 15,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "label_total_3": {
        "type": "text",
        "position": {
          "x": 139,
          "y": 268
        },
        "width": 30,
        "height": 6,
        "alignment": "right",
        "fontSize": 15,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "label_total_4": {
        "type": "text",
        "position": {
          "x": 139,
          "y": 275
        },
        "width": 56,
        "height": 6,
        "alignment": "left",
        "fontSize": 8,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "total_1": {
        "type": "text",
        "position": {
          "x": 170,
          "y": 256
        },
        "width": 24.94,
        "height": 6,
        "alignment": "right",
        "fontSize": 15,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "total_2": {
        "type": "text",
        "position": {
          "x": 170,
          "y": 262
        },
        "width": 24.94,
        "height": 6,
        "alignment": "right",
        "fontSize": 15,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "total_3": {
        "type": "text",
        "position": {
          "x": 170,
          "y": 268
        },
        "width": 24.94,
        "height": 6,
        "alignment": "right",
        "fontSize": 15,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "text_bottom_left_1": {
        "type": "text",
        "position": {
          "x": 13,
          "y": 256
        },
        "width": 126,
        "height": 4,
        "alignment": "left",
        "fontSize": 11,
        "characterSpacing": 0,
        "lineHeight": 1,
        "fontColor": "#3282f0"
      },
      "text_bottom_left_2": {
        "type": "text",
        "position": {
          "x": 13,
          "y": 260
        },
        "width": 126,
        "height": 9,
        "alignment": "left",
        "fontSize": 8,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "text_bottom_left_3": {
        "type": "text",
        "position": {
          "x": 13,
          "y": 269
        },
        "width": 126,
        "height": 4,
        "alignment": "left",
        "fontSize": 11,
        "characterSpacing": 0,
        "lineHeight": 1,
        "fontColor": "#3282f0"
      },
      "sign_1": {
        "type": "text",
        "position": {
          "x": 13,
          "y": 274
        },
        "width": 50,
        "height": 4,
        "alignment": "center",
        "fontSize": 10,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "sign_2": {
        "type": "text",
        "position": {
          "x": 89,
          "y": 273.95
        },
        "width": 50,
        "height": 4,
        "alignment": "center",
        "fontSize": 10,
        "characterSpacing": 0,
        "lineHeight": 1
      },
      "page_number": {
        "type": "text",
        "position": {
          "x": 165,
          "y": 12
        },
        "width": 39,
        "height": 6,
        "alignment": "right",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1
      },
    }
  ],
  basePdf: "data:application/pdf;base64,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MDQgXQovTWVkaWFCb3ggWyAwLjAgMC4wIDU5NS4zMjAwMSA4NDEuOTIwMDQgXQovUGFyZW50IDIgMCBSCi9SZXNvdXJjZXMgNiAwIFIKL1JvdGF0ZSAwCi9UeXBlIC9QYWdlCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9Db3VudCAxCi9LaWRzIFsgMyAwIFIgXQovVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjEgMCBvYmoKPDwKL1BhZ2VzIDIgMCBSCi9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago3IDAgb2JqCjw8Ci9BdXRob3IgKDMzNjI4KQovQ3JlYXRpb25EYXRlIChEOjIwMjMwNDE3MTYxMzA0KzAyJzAwJykKL01vZERhdGUgKEQ6MjAyMzA0MTcxNjEzMDQrMDInMDAnKQovUHJvZHVjZXIgKE1pY3Jvc29mdDogUHJpbnQgVG8gUERGKQovVGl0bGUgKG1vZGVsZSBkZXZpcyBhbnRobyAtIEdvb2dsZaBTaGVldHMpCj4+CmVuZG9iagp4cmVmCjAgOA0KMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDM1MjY4IDAwMDAwIG4NCjAwMDAwMzUyMDkgMDAwMDAgbg0KMDAwMDAzNTAzMiAwMDAwMCBuDQowMDAwMDAwMDA5IDAwMDAwIG4NCjAwMDAwMjg5ODUgMDAwMDAgbg0KMDAwMDAzNDk4MiAwMDAwMCBuDQowMDAwMDM1MzE3IDAwMDAwIG4NCnRyYWlsZXIKPDwKL0luZm8gNyAwIFIKL1Jvb3QgMSAwIFIKL1NpemUgOAo+PgpzdGFydHhyZWYKMzU1MTAKJSVFT0YK"
}

function generateSchemaInputs(prestation) {
  let tabPrestaToPdf = []
  for (const key in prestation) {
    tabPrestaToPdf.push([key, ' ', ' ', ' '])
    for (const k in prestation[key]) {
      tabPrestaToPdf.push(
        [
          prestation[key][k].title, 
          prestation[key][k].price+'/'+prestation[key][k].unit_volum, 
          JSON.stringify(prestation[key][k].quantity), 
          JSON.stringify(prestation[key][k].total)
        ]
      )
    }
  }
  testing(tabPrestaToPdf)
}
//let nbPage = (Math.trunc( tabPrestaToPdf.length / 24 ))+( (tabPrestaToPdf.length % 24) == 0 ? 0 : 1 )
//nbPage < 1 ? nbPage = 1 : false

function testing(tabPrestaToPdf){
  let ordonate
  let bgc = false
  let newtab = repartiteurPage(tabPrestaToPdf)

  for (let idx = 0; idx < newtab.length; idx++) {
    ordonate = 112
    debugger
    for (let index = 0; index < newtab[idx].length; index++) {
      bgc = !bgc
      generateTemplatePresta(index, ordonate, newtab, idx, bgc)
      //hydratation des variables
      inputs[idx]['presta_title_'+index]= newtab[idx][index][0]
      inputs[idx]['presta_pu_'+index]= newtab[idx][index][1]
      inputs[idx]['presta_qte_'+index]= newtab[idx][index][2]
      inputs[idx]['presta_total_'+index]= newtab[idx][index][3]
      inputs[idx]['page_number']= 'Page n° '+ JSON.stringify(idx+1) + '/' + newtab.length 
      ordonate +=6
      if (index == 22) {
        newtab[idx+1].length > 0 ? inputs.push({}) : false
        break
      }
    }
  }
}

function repartiteurPage(tabPrestaToPdf){
  let newtab = []
  for (let index = 0; index < 25; index++) {
    if (tabPrestaToPdf.length > 0) {
      newtab[index] = tabPrestaToPdf.slice(0,23)
      tabPrestaToPdf.splice(0,23)
    } else {
      break
    }
  }
  /*
  newtab[0] = tabPrestaToPdf.slice(0,23)
  tabPrestaToPdf.splice(0,23)
  if (tabPrestaToPdf.length > 0) {
    newtab[1] = tabPrestaToPdf.slice(0,23)
    tabPrestaToPdf.splice(0,23)
  }
  if (tabPrestaToPdf.length > 0) {
    newtab[2] = tabPrestaToPdf.slice(0,23)
    tabPrestaToPdf.splice(0,23)
  }
  if (tabPrestaToPdf.length > 0) {
    newtab[3] = tabPrestaToPdf.slice(0,23)
    tabPrestaToPdf.splice(0,23)
  }
  if (tabPrestaToPdf.length > 0) {
    newtab[4] = tabPrestaToPdf.slice(0,23)
    tabPrestaToPdf.splice(0,23)
  }
  if (tabPrestaToPdf.length > 0) {
    newtab[5] = tabPrestaToPdf.slice(0,23)
    tabPrestaToPdf.splice(0,23)
  }
  */

  return newtab
}

function generateTemplatePresta(index, ordonate, newtab, idx, bgc){
  let bgcolor = "#d3d3d3"
  bgc ? bgcolor= '': false
  //automatisation de la generation du template (basePdf)
  template.schemas[0]['presta_title_'+index]= {
    "type": "text",
    "position": {
      "x": 14,
      "y": ordonate
    },
    "width": 112,
    "height": 5,
    "fontSize": 10,
    "lineHeight": 1,
    "backgroundColor": bgcolor
  }
  template.schemas[0]['presta_pu_'+index]= {
    "type": "text",
    "position": {
      "x": 138,
      "y": ordonate
    },
    "width": 29,
    "height": 5,
    "fontSize": 10,
    "alignment": "right",
    "backgroundColor": bgcolor
  }
  template.schemas[0]['presta_qte_'+index]= {
    "type": "text",
    "position": {
      "x": 126,
      "y": ordonate
    },
    "width": 12,
    "height": 5,
    "fontSize": 10,
    "alignment": "right",
    "backgroundColor": bgcolor
  }
  template.schemas[0]['presta_total_'+index]= {
    "type": "text",
    "position": {
      "x": 167,
      "y": ordonate
    },
    "width": 28,
    "height": 5,
    "fontSize": 10,
    "alignment": "right",
    "backgroundColor": bgcolor
  }
  if (newtab[idx][index][1] == ' ') {
    template.schemas[0]['presta_title_'+index].fontColor = "#f1c232"
    template.schemas[0]['presta_title_'+index].fontSize = 13
    template.schemas[0]['presta_title_'+index].backgroundColor = ''
    template.schemas[0]['presta_pu_'+index].backgroundColor = ''
    template.schemas[0]['presta_qte_'+index].backgroundColor = ''
    template.schemas[0]['presta_total_'+index].backgroundColor = ''
    bgc = false
  }
}

function checkInput(){
  if (title && numberDevis && full_name_client && adress_client && cp_client && city_client) {
    return true
  }
}

async function insertDevis() {
  const { data, error } = await supabase.from('devis').insert([
    { 
      title: title.value, 
      description: description.value, 
      number: numberDevis.value, 
      full_name_client: full_name_client.value, 
      adress_client: adress_client.value,
      cp_client: cp_client.value,
      city_client: city_client.value,
      tel_client: tel_client.value,
      mail_client: mail_client.value,
      prestations: JSON.stringify(prestations_devis.value),
      total_ttc: total_ttc.value,
      owner: user.value.id
    },
  ])
  let result = data
  inputs = [{}]
  generateSchemaInputs(prestations_devis.value)
  inputs.forEach(elt => {
    elt.siret_enterprise = "Siret : 81896417300020",
    elt.name_enterprise = "Anthony Maçonnerie",
    elt.adress_enterprise = "268, chemin Capdebarthe",
    elt.cp_city_enterprise = "64140, GELOS",
    elt.tel_enterprise = "06 50 91 32 91",
    elt.mail_enterprise = "anthonymaconnerie@gmail.com",
    elt.number = JSON.stringify(numberDevis.value)
    elt.name_client = full_name_client.value
    elt.adress_client = adress_client.value
    elt.cp_city_client = cp_client.value+', '+city_client.value
    elt.tel_client = tel_client.value
    elt.mail_client = mail_client.value
  });
  let source = {
    total_1 : JSON.stringify(total_ttc.value)+' €',
    total_3 : JSON.stringify(total_ttc.value)+' €',
    label_total_1 : "Total HT",
    label_total_2 : "",
    label_total_3 : "Net à payer",
    label_total_4 : "TVA non Applicablearticle 293B du CGI",
    total_2 : " ",
    text_bottom_left_1 : "Conditions de règlement :",
    text_bottom_left_2 : "30% au démarrage chantier -Acomptes selon avancement des travaux",
    text_bottom_left_3 : "« Bon pour accord et commande »",
    sign_1 : " Pour l'entreprise",
    sign_2 : "Pour le client "
  }
  console.log(inputs)
  console.log(inputs[inputs.length-1])
  Object.assign(inputs[inputs.length-1],source)

  generate({ template, inputs }).then((pdf) => {
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
        Adresse
      </label>
      <input v-model="adress_client" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adress_client" type="text" placeholder="adresse">
    </div>
    <div class="flex justify-between">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="cp">
          Code postal
        </label>
        <input v-model="cp_client" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cp" type="number" placeholder="code postal">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
          Ville
        </label>
        <input v-model="city_client" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" placeholder="ville">
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="tel">
        telephone
      </label>
      <input v-model="tel_client" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tel" type="tel" placeholder="telephone">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="mail">
        mail du client
      </label>
      <input v-model="mail_client" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mail" type="text" placeholder="mail">
    </div>
    <DevisCreateWithPresta @totalttc="(n)=>total_ttc = n" @presta="(n)=>prestations_devis = n"/>
    <div>{{ warn }}</div>
    <button class="p-1 italic w-full text-center bg-blue-500 text-white rounded-lg" @click="insertDevis">Générer le devis</button>
  </div>
  
</template>