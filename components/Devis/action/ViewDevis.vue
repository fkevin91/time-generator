<script setup >
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const props = defineProps(['item', 'infoUser', 'logo'])


import { BLANK_PDF, generate } from '@pdfme/generator';
import { Viewer } from '@pdfme/ui';

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const infoUser = ref('')
const src = ref('')
let formulaire = ref(true)
let { data } = await supabase
  .from('profiles')
  .select(`siret_enterprise, name_enterprise, avatar_url, adress_enterprise, cp_enterprise, city_enterprise, tel_enterprise, mail_enterprise`)
  .eq('id', user.value.id)
  .single()

if (data) {
  infoUser.value = data
}

for (const key in props.item) {
  if (!props.item[key]) {
    props.item[key] = ''
  }
}

let inputs
const title = ref(props.item.title)
const description = ref(props.item.description)
const numberDevis = ref(props.item.number)
const full_name_client = ref(props.item.full_name_client)
const adress_client = ref(props.item.adress_client)
const cp_client = ref(JSON.stringify(props.item.cp_client))
const city_client = ref(props.item.city_client)
const tel_client = ref(JSON.stringify(props.item.tel_client))
const mail_client = ref(props.item.mail_client)
const prestations_devis = ref(JSON.parse(props.item.prestations))
const total_ttc = ref(props.item.total_ttc)

let label_total_1 = ref("")
let label_total_2 = ref("")
let label_total_3 = ref("")
let label_total_4 = ref("")
let total_2 = ref(0)
let text_bottom_left_1 = ref("")
let text_bottom_left_2 = ref("")
let text_bottom_left_3 = ref("")
let sign_1 = ref("")
let sign_2 = ref("")
let useTVA = ref(null)

const notifyError = (text) => {  
  toast.error(text, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: toast.TRANSITIONS.BOUNCE,
  });
}

const notifyInfo = (text) => {  
  toast.success(text, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: toast.TRANSITIONS.BOUNCE,
  });
}

async function getSetting() {
  let { data } = await supabase.from('settingdevis').select('*').eq('user', user.value.id)
  console.log(data)
  if (data[0]) {
    label_total_1.value = data[0].label_total_1 
    label_total_2.value = data[0].label_total_2
    label_total_3.value = data[0].label_total_3
    label_total_4.value = data[0].label_total_4
    total_2.value = data[0].total_2
    text_bottom_left_1.value = data[0].text_bottom_left_1
    text_bottom_left_2.value = data[0].text_bottom_left_2
    text_bottom_left_3.value = data[0].text_bottom_left_3
    sign_1.value = data[0].sign_1
    sign_2.value = data[0].sign_2
    useTVA.value = data[0].useTVA
  }
}

const template = 
{
  schemas: [
    {
      "top_bar": {
        "type": "text",
        "position": {
          "x": 6.5,
          "y": 9.5
        },
        "width": 197,
        "height": 2,
        "alignment": "left",
        "fontSize": 61,
        "characterSpacing": 0,
        "lineHeight": 2,
        "fontName": "Roboto",
        "fontColor": "#5a14dc",
        "dynamicFontSize": {
          "min": 9,
          "max": 19
        },
        "backgroundColor": "#5a14dc"
      },
      "type": {
        "type": "text",
        "position": {
          "x": 108.75,
          "y": 47.69
        },
        "width": 41.34,
        "height": 11.76,
        "alignment": "right",
        "fontSize": 22,
        "characterSpacing": 0,
        "lineHeight": 1,
        "fontName": "Roboto",
        "verticalAlignment": "middle",
        "fontColor": "#4d4d4d"
      },
      "middle_bar": {
        "type": "text",
        "position": {
          "x": 14,
          "y": 94
        },
        "width": 181,
        "height": 0.5,
        "alignment": "left",
        "fontSize": 13,
        "characterSpacing": 0,
        "lineHeight": 1,
        "fontName": "Roboto",
        "fontColor": "#000",
        "backgroundColor": "#a3a3a3"
      },
      "title_column_description": {
        "type": "text",
        "position": {
          "x": 15.5,
          "y": 102.5
        },
        "width": 23,
        "height": 5,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1,
        "fontName": "Roboto",
        "fontColor": "#a3a3a3"
      },
      "title_column_qte": {
        "type": "text",
        "position": {
          "x": 130.5,
          "y": 102.5
        },
        "width": 8,
        "height": 5,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1,
        "fontName": "Roboto",
        "fontColor": "#a3a3a3"
      },
      "title_column_prix_unitaire": {
        "type": "text",
        "position": {
          "x": 144.5,
          "y": 102.5
        },
        "width": 23,
        "height": 5,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1,
        "fontName": "Roboto",
        "fontColor": "#a3a3a3"
      },
      "title_column_total": {
        "type": "text",
        "position": {
          "x": 177,
          "y": 102.5
        },
        "width": 18,
        "height": 5,
        "alignment": "left",
        "fontSize": 12,
        "characterSpacing": 0,
        "lineHeight": 1,
        "fontName": "Roboto",
        "fontColor": "#a3a3a3"
      },
      "logo": {
        "type": "image",
        "position": {
          "x": 14,
          "y": 18
        },
        "width": 65,
        "height": 40
      },
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
  basePdf: BLANK_PDF
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

function testing(tabPrestaToPdf){
  let ordonate
  let bgc = false
  let newtab = repartiteurPage(tabPrestaToPdf)

  for (let idx = 0; idx < newtab.length; idx++) {
    ordonate = 112
    for (let index = 0; index < newtab[idx].length; index++) {
      bgc = !bgc
      generateTemplatePresta(index, ordonate, newtab, idx, bgc)
      //hydratation des variables
      inputs[idx]['presta_title_'+index]= newtab[idx][index][0]
      inputs[idx]['presta_pu_'+index]= newtab[idx][index][1]
      inputs[idx]['presta_qte_'+index]= newtab[idx][index][2]
      inputs[idx]['presta_total_'+index]= newtab[idx][index][3]
      inputs[idx]['page_number']= 'Page n° '+ JSON.stringify(idx+1) + '/' + newtab.length 
      ordonate +=8
      if (index == 16) {
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
      newtab[index] = tabPrestaToPdf.slice(0,17)
      tabPrestaToPdf.splice(0,17)
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
    "height": 7,
    "fontSize": 9,
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
    "height": 7,
    "fontSize": 9,
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
    "height": 7,
    "fontSize": 9,
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
    "height": 7,
    "fontSize": 9,
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

async function sendDevis() {}

async function saveDevis() {
  const data = await supabase.from('devis').insert([
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
  data.status != 201 ? notifyError('Veuillez remplir les champs manquants') : notifyInfo('Le devis a bien été enregistré')
  return data
}

async function previewDevis() {
    inputs = [{}]
    generateSchemaInputs(prestations_devis.value)
    inputs.forEach(elt => {
      elt.logo = getBase64Image(document.getElementById('logo'))
      elt.siret_enterprise = "Siret : " + infoUser.value.siret_enterprise,
      elt.name_enterprise = infoUser.value.name_enterprise,
      elt.adress_enterprise = infoUser.value.adress_enterprise,
      elt.cp_city_enterprise = infoUser.value.cp_enterprise + ", " + infoUser.value.city_enterprise,
      elt.tel_enterprise = infoUser.value.tel_enterprise,
      elt.mail_enterprise = infoUser.value.mail_enterprise,
      elt.number = JSON.stringify(numberDevis.value)
      elt.name_client = full_name_client.value
      elt.adress_client = adress_client.value
      elt.cp_city_client = cp_client.value+', '+city_client.value
      elt.tel_client = tel_client.value
      elt.mail_client = mail_client.value
      //Elements block de la page
      elt.top_bar = " ",
      elt.type = "Devis n°",
      elt.middle_bar = " ",
      elt.title_column_description = "Description",
      elt.title_column_qte = "Qté",
      elt.title_column_prix_unitaire = "Prix unitaire",
      elt.title_column_total = "Total H.T"
    });
    // verifier affichage de total_2
    total_2.value = (total_2.value == 0 ? '' : JSON.stringify(total_2.value)+ '%')
    let source = {
      total_1 : JSON.stringify(total_ttc.value)+' €',
      total_3 : JSON.stringify(total_ttc.value)+' €',
      total_2 : total_2.value,
      label_total_1 : label_total_1.value,
      label_total_2 : label_total_2.value,
      label_total_3 : label_total_3.value,
      label_total_4 : label_total_4.value,
      text_bottom_left_1 : text_bottom_left_1.value,
      text_bottom_left_2 : text_bottom_left_2.value,
      text_bottom_left_3 : text_bottom_left_3.value,
      sign_1 : sign_1.value,
      sign_2 : sign_2.value
    }
    Object.assign(inputs[inputs.length-1],source)
    formulaire.value = false
    const domContainer = document.getElementById('container');
    const viewer = new Viewer({ domContainer, template, inputs });
  
    /*generate({ template, inputs }).then((pdf) => {
      // Browser
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
      window.open(URL.createObjectURL(blob));
  
      // Node.js
      // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
    })*/

}

async function downloadDevis() {
    inputs = [{}]
    generateSchemaInputs(prestations_devis.value)
    inputs.forEach(elt => {
      elt.logo = getBase64Image(document.getElementById('logo'))
      elt.siret_enterprise = "Siret : " + infoUser.value.siret_enterprise,
      elt.name_enterprise = infoUser.value.name_enterprise,
      elt.adress_enterprise = infoUser.value.adress_enterprise,
      elt.cp_city_enterprise = infoUser.value.cp_enterprise + ", " + infoUser.value.city_enterprise,
      elt.tel_enterprise = infoUser.value.tel_enterprise,
      elt.mail_enterprise = infoUser.value.mail_enterprise,
      elt.number = JSON.stringify(numberDevis.value)
      elt.name_client = full_name_client.value
      elt.adress_client = adress_client.value
      elt.cp_city_client = cp_client.value+', '+city_client.value
      elt.tel_client = tel_client.value
      elt.mail_client = mail_client.value
    });
    total_2.value = (total_2.value == 0 ? '' : JSON.stringify(total_2.value)+ '%')
    let source = {
      total_1 : JSON.stringify(total_ttc.value)+' €',
      total_3 : JSON.stringify(total_ttc.value)+' €',
      total_2 : total_2.value,
      label_total_1 : label_total_1.value,
      label_total_2 : label_total_2.value,
      label_total_3 : label_total_3.value,
      label_total_4 : label_total_4.value,
      text_bottom_left_1 : text_bottom_left_1.value,
      text_bottom_left_2 : text_bottom_left_2.value,
      text_bottom_left_3 : text_bottom_left_3.value,
      sign_1 : sign_1.value,
      sign_2 : sign_2.value
    }
    Object.assign(inputs[inputs.length-1],source)
    generate({ template, inputs }).then((pdf) => {
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });

      // Créer un lien de téléchargement
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'devis_' + numberDevis.value + '.pdf';
      a.click();
      URL.revokeObjectURL(a.href);
    })
}

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(infoUser.value.avatar_url)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}
document.getElementById('logo')

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/jpeg");
  return dataURL
}

onMounted(() => {
  getSetting()
  downloadImage()
})

</script>

<template>
  <div class="space-y-3">
    <div v-show="formulaire" class="p-3 rounded-lg shadow-xl w-full h-full opacity-90 bg-white">
      <img :src="src" alt="" id="logo" class="hidden" >
      <div class="flex justify-between">
        <img :src="src" alt="" style="max-width: 40%; height: auto;">
        <div class="">
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
      <div class="flex justify-between space-x-3">
        <button class="p-1 italic w-full text-center bg-yellow-500 text-white rounded-lg" @click="saveDevis">Enregistrer pour plus tard</button>
        <button class="p-1 italic w-full text-center bg-blue-500 text-white rounded-lg" @click="previewDevis">Générer le devis</button>
      </div>
    </div>
    <div v-if="!formulaire" class="flex justify-between">
      <button @click="formulaire = true" class="text-white p-3 bg-blue-500 rounded-lg">Modifier le PDF</button>
      <button @click="saveDevis" class="text-white p-3 bg-yellow-500 rounded-lg">Sauvegarder</button>
      <button @click="downloadDevis" class="text-gray-700 p-3 bg-white rounded-lg">Télécharger</button>
      <button @click="sendDevis" class="text-white p-3 bg-green-500 rounded-lg">Signer & Envoyer</button>
    </div>
    <div v-show="!formulaire" id="container" style="width: 100%;height: 66vh;"></div>
    <div class="Toastify"></div>

  </div>
  
</template>