const cheerio = require('cheerio')
const rp = require('request-promise-native')
const fs = require('fs')

let baseURL = 'https://cf.ict-berufsbildung.ch/'
let lang = 'fr' // NOT i18n ready yet...
var moduleDetail = {}

async function run() {
  for (let moduleID = 99; moduleID < 700; moduleID++) {
    console.debug('Processing module', moduleID)
    let url = baseURL + 'modules.php?name=Mbk&a=20101&cmodnr='+ moduleID +'&noheader=0&clang=' + lang
    let body = await getURLBody(url)
    const $ = cheerio.load(body)
    let pdfLink = $('[data-title="Description de module"] .tooltip--top').attr('href') + '&clang=' + lang
    if (typeof pdfLink !== 'undefined' && pdfLink) {
      moduleDetail[moduleID] = {}
      moduleDetail = getDetails($, moduleDetail, moduleID, url)
    }
  }

  fs.writeFileSync("data.json", JSON.stringify(moduleDetail, null, 2), function (err) {
    if (err) {
      return console.log(err)
    }
    console.log("The file was saved!")
  })
}

async function getURLBody(url) {
  return await rp(url).then(function (body) {
    return body
  })
}

function getDetails ($, moduleDetail, moduleID, url) {
    let linkToPDF = baseURL + $('[data-title="Description de module"] .tooltip--top').attr('href') + '&clang=' + lang
    const details = []
    let competences = $('[data-title="Description de module"] dl').children().each(function (i, elem) {
        details[i] = $(this).text()
    })

    for (var i = 0; i < details.length; i++) {
        if (i % 2 == 0) {
            moduleDetail[moduleID][details[i]] = details[i+1]
        }
    }

    moduleDetail[moduleID]['id'] = moduleID
    moduleDetail[moduleID]['name'] = moduleDetail[moduleID]['Module']
    moduleDetail[moduleID]['skill'] = moduleDetail[moduleID]['Compétence']
    moduleDetail[moduleID]['category'] = moduleDetail[moduleID]['Domaine de compétence']
    moduleDetail[moduleID]['object'] = moduleDetail[moduleID]['Objet']
    moduleDetail[moduleID]['level'] = moduleDetail[moduleID]['Niveau']
    moduleDetail[moduleID]['preRequired'] = moduleDetail[moduleID]['Pré-requis']
    moduleDetail[moduleID]['nbLessons'] = moduleDetail[moduleID]['Nombre de leçons']
    moduleDetail[moduleID]['documentFor'] = moduleDetail[moduleID]['Reconnaissance']
    moduleDetail[moduleID]['link'] = url
    moduleDetail[moduleID]['PDFLink'] = linkToPDF

    delete moduleDetail[moduleID]['Objectifs opérationnels']
    delete moduleDetail[moduleID]['Module']
    delete moduleDetail[moduleID]['Compétence']
    delete moduleDetail[moduleID]['Domaine de compétence']
    delete moduleDetail[moduleID]['Objet']
    delete moduleDetail[moduleID]['Niveau']
    delete moduleDetail[moduleID]['Pré-requis']
    delete moduleDetail[moduleID]['Nombre de leçons']
    delete moduleDetail[moduleID]['Reconnaissance']

    const pub = $('[data-title="Description de module"] small').filter(function(i, el) {
        return $(this).text().startsWith('Publié:')
    })
    moduleDetail[moduleID]['date'] = pub.text().substring(8)
    return moduleDetail
}

run()
