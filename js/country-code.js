// https://restcountries.com/v2/all?fields=alpha2Code,callingCodes,flag
console.log('country-codes.js START... v17')
var countryCode = document.getElementById('countryCode')
var countries = document.getElementById('countries')
// let countriesBox = document.getElementById('countriesBox')
var html = document.getElementsByTagName('html')[0]

countryCode.addEventListener("click", async function() {
    window.addEventListener("hashchange",onPressKeyBack , false);
    window.addEventListener("keyup",escKey , false);
    window.location.hash = "##" // OK
    // window.location.replace("##")
    // --->> VER : window.history.replaceState('', '', '/teste5.php'); // altera url e nao vai p historico
    // --->> VER : window.history.pushState('', '', '/teste5.php'); // altera url e vai p historico
    html.classList.add("countriesOpen")
    // console.log("click BUSCA DADOS")
    // if (templateRendered == false) {
    //     let data = await getCountries()
    //     templateRender(data)
    //     countriesAddEvent()
    // }
}, false)


countries.addEventListener("click", function() {
    // let language = document.documentElement.lang
    // window.location.hash = "#"
    // window.location.replace("#") // OK v1
    window.history.pushState('', '', window.location.pathname); // OK v2
    window.removeEventListener("hashchange",onPressKeyBack , false)
    window.removeEventListener("keyup",escKey , false)
    html.classList.remove("countriesOpen")
}, false);

// Fechar a lista ao pressionar ESC

 function escKey(event) {
    console.info('escKey')
    if (event.key === "Escape") { 
        countries.click()
        // event.preventDefault() 
    }
}
// Fechar a lista ao pressionar Botao de voltar
// window.onhashchange = onPressKeyBack;



function onPressKeyBack(event) {
    console.info('onPressKeyBack')
    if(event.oldURL.length > event.newURL.length) {
        countries.click()
    }
}

let countrySelected = function (event) {
    console.info('countrySelected')
    // console.log('Selecionado : ', event.target.id)
    // console.log('Selecionado : ', event.target.value)
    // console.log('Selecionado : ', event.target.dataset.name)
    // console.log(event.target)

    // let callingCode = document.getElementById("callingCode")
    // callingCode.value = parseInt(event.target.value, 10);
    // document.getElementById("code").innerText = event.target.value
    // document.getElementById("country").innerText = event.target.dataset.name
    // let alpha3Code = event.target.dataset.alpha3code
    // alpha3Code = alpha3Code.toLowerCase()
    // document.getElementById("flag").src = ""
    // let flag = "https://restcountries.com/data/" + alpha3Code + ".svg"
    // document.getElementById("flag").src = flag


    let name = event.target.dataset.name
    callingCode = event.target.value
    let alpha2Code = event.target.id
    alpha3Code = event.target.dataset.alpha3code
    let data = {name:name, alpha2Code:alpha2Code, alpha3Code:alpha3Code, callingCode:callingCode}

    countrySelectedFillForm(data)

    // console.log(data)

    // Salva no cache
    let date = new Date()
    let days = 30
    date.setTime(date.getTime() + (days*24*60*60*1000))
    localStorage.setItem(`whatsGo::CountrySelected`, JSON.stringify({"data": data, "expires": date}))
    localStorage.setItem(`whatsGo::CountrySelected`, JSON.stringify(data))

}

function countrySelectedFillForm(data) {
    console.info('countrySelectedFillForm')
    document.getElementById("callingCode").value = parseInt(data.callingCode, 10);
    document.getElementById("alpha2Code").value = data.alpha2Code
    document.getElementById("code").innerText = data.callingCode
    document.getElementById("country").innerText = data.name
    var flag = document.getElementById("flag")
    let alpha3Code = data.alpha3Code.toLowerCase()
    flag.src = ""
    // flag.src = "https://restcountries.com/data/" + alpha3Code + ".svg"
    flag.src = "./data/" + alpha3Code + ".svg"
}




let countriesAddEvent = function () {
    console.info('countriesAddEvent')
    document.querySelectorAll("input[name='country']").forEach((input) => {
        input.addEventListener('change', countrySelected);
    });
}


let getCountries = async function () {
    console.info("getCountries")

    let countriesData = getCountriesFromCache()
    if ( countriesDataIsValid(countriesData) ) return countriesData
    console.warn('getCountriesFromCache FAIL')
    
    // -------------------- Se não tem dados em cache, busca na API
    countriesData = await getCountriesFromApi()
    if ( countriesDataIsValid(countriesData) ) return countriesData
    console.warn('getCountriesFromApi FAIL')

    // -------------------- Se der erro na api, pega dados do disco
    countriesData = await getCountriesFromDisk()
    if ( countriesDataIsValid(countriesData) ) return countriesData
    console.warn('getCountriesFromDisk FAIL')

    
    return countriesData 
}


let countriesDataIsValid = function (countriesData) { 
    if (
        countriesData === null
        || typeof countriesData === 'undefined'
        || typeof countriesData[0] === 'undefined'
        || 'name' in countriesData[0] === false
        || 'alpha2Code' in countriesData[0] === false
        || 'alpha3Code' in countriesData[0] === false
        || 'name' in countriesData[0] === false
        || typeof countriesData[0].callingCodes[0] == 'undefined' 
        ) {
        return false
    }
    return true
}


let getCountriesFromCache = function (){
    console.info('getCountriesFromCache')
    // Confere se existem dados em localStorage 
    let localData = localStorage.getItem(`whatsGo::Countries`)
    if (localData !== null) {
        // console.log("getCountries DADOS EM CACHE")
        localData = JSON.parse(localData)
        let dateNow = new Date()
        let dateExpires = new Date(localData.expires)
        // Verifica se esta dentro da data de expiracao 
        if (dateNow > dateExpires) {
            // Se os dados expiraram, exclui dados armazenados 
            localStorage.removeItem(`whatsGo::Countries`)
            localData = null
        } else {
            // Se não expiraram, retorna dados armazenados
            localData = localData.data
        }
    }
    return localData
}


let getCountriesFromApi = async function (){
    console.info('getCountriesFromApi')
    try {
        const controller = new AbortController()
        let signal = controller.signal
        const timeoutId = setTimeout(() => controller.abort(), 1000)
        const response = await fetch( 'https://restcountries.com/v2/all?fields=alpha2Code,callingCodes,alpha3Code,name', {signal})
        clearTimeout(timeoutId)
        if (response.ok === false) return null
        data = await response.json()
    } catch (error) {
        console.error('ERRO', error.message)
        return null
    }

    // Salva no cache
    let date = new Date()
    let days = 30
    date.setTime(date.getTime() + (days*24*60*60*1000))
    localStorage.setItem(`whatsGo::Countries`, JSON.stringify({"data": data, "expires": date}))

    return data
}


let getCountriesFromDisk = async function (){
    console.info('getCountriesFromDisk')
    const response  = await fetch( './data/countries.json' )
    data = await response.json()

    // Salva no cache
    let date = new Date()
    let days = 30
    date.setTime(date.getTime() + (days*24*60*60*1000))
    localStorage.setItem(`whatsGo::Countries`, JSON.stringify({"data": data, "expires": date}))

    return data
}


let templateRender = function (data) {
    console.log("templateRender")
    
    let container = document.getElementById("countriesList")
    let template = document.getElementById("countriesList-item").innerHTML 
    let displayNames
    // let userLanguage = window.navigator.language || window.navigator.userLanguage || "en-US"
    let userLanguage = document.documentElement.lang || "en-US"
    if (Intl.DisplayNames) {
        displayNames = new Intl.DisplayNames([userLanguage], { type: 'region' })

        // Coloca nome do pais na lingua informada acima
        data.forEach((item, index, array) => {
                item.name = displayNames.of( item.alpha2Code ) 
        });
    }
    // data = data.slice(0,20)

    //Coloca em ordem Alfabetica
    data = data.sort((a, b) => {
        return new Intl.Collator(userLanguage).compare(a.name, b.name)
    });
    container.innerText =''
    let templateContent =''
    data.forEach(item => {
        let name = item.name
        variaveis = {
            id: item.alpha2Code, 
            code: "+" + item.callingCodes[0],
            alpha3Code: item.alpha3Code,
            name: name,
        }
        templateContent += templateApply(template, variaveis)
    });
    container.insertAdjacentHTML( 'beforeend', templateContent )
    let id = document.getElementById("alpha2Code").value
    document.getElementById(id).checked = true;
    countriesAddEvent()
} 

let templateApply = (tpl, args) => tpl.replace(/\${(\w+)}/g, (_, v) => { return args[v] || '' });


// Polyfill --> https://github.com/ungap/promise-any
var any=(Promise.any||function(n){return new Promise(function(e,o,i,t){i=[],t=n.map(function(n,r){return Promise.resolve(n).then(e,function(n){return i[r]=n,--t||o({errors:i})})}).length})}).bind(Promise);

function getAlpha2CodeApi() {
    console.info('getAlpha2CodeApi')
    url1 = 'https://www.cloudflare.com/cdn-cgi/trace' // free // EUA/coudflare
    url2 = 'https://api.ipdata.co/?api-key=fffa7cea25ed36143ad42f42a817708ad147c6557a6e2c7dfc4aa333' // 1.5k - dia // 45k mes // EUA/amazon
    url3 = 'https://ipinfo.io/json?token=631a25319ecf43'  // 50k - mes // EUA/google
    
    ipdata = fetch(url2).then(response => response.json())
    .then(json => {
        if( json.country_code == undefined ) throw('Error!!!')
        return json.country_code
    })

    ipinfo = fetch(url3).then(response => response.json())
    .then(json => {
        if( json.country == undefined ) throw('Error!!!')
        return json.country
    })

    cloudflare = fetch(url1).then(response => response.text())
    .then(text => {
        let json = text.trim().split('\n').reduce(function(object, line) {
            line = line.split('=')
            object[line[0]] = line[1]
            return object;
        }, {});
        return json
    }).then(json => {
        if( json.loc == undefined ) throw('Error!!!')
        return json.loc
    })

    return any( [cloudflare, ipdata, ipinfo] )
        .then(value => {
            console.log("IP Country...: ", value)
            return value
        })
        .catch((error)=>{
            console.error('ERROR... ',error);
            return false;
        });
    
}


// --------------------------------------------------------------------------------------- CHANGE LANGUAGE
document.querySelectorAll("#languages .language").forEach((element) => {
    element.addEventListener('click', ()=>{
        console.log(element.dataset.language)
        changeLanguage(element.dataset.language)
    });
});


function changeLanguage(language) {
    // localStorage.setItem(`whatsGo::language`, language)
    Cookies.set('whatsGo_language', language, { expires: 3650, secure: true })

    // TESTE para PWA: -Ver se é necessário-
    if( document.querySelectorAll(".langBlock span:lang(" + language + ")").length ){
        console.log('está no index.html')
        document.documentElement.lang = language
        // --->> VER : window.history.replaceState('', '', '/teste5.php'); // altera url e nao vai p historico
        // --->> VER : window.history.pushState('', '', '/teste5.php'); // altera url e vai p historico
        // --->> VER : window.location.pathname // retorna o caminho e o nome do arquivo da página atual
        // --->> https://www.w3schools.com/js/js_window_location.asp 
        window.history.replaceState('', '', '/'+language+'/')
        if (Intl.DisplayNames) {
            fillInitialComponents()
        }
        return
    }
    
    if (window.location.hostname !== "localhost") {
        window.location.replace("/"+language+"/")
    } else {
        window.location.replace("/whatsgo/"+language+"/")
    }
}





// INICIALIZAÇÃO
// Carrega lista de paises no localStorge
var countriesList = getCountries()

// preenche o formulario se tiver dados em cache
window.addEventListener('DOMContentLoaded', fillInitialComponents, false);

// verifica se tem cookie para ingles, pois no htaccess nao é possivel selecionar ingles pq o google complica com o R=302
let userLanguageCookie = Cookies.get('whatsGo_language')

if (userLanguageCookie !== document.documentElement.lang) {
    if (userLanguageCookie !== undefined) {
        document.querySelector("#languages ."+userLanguageCookie).click()
    }
}


async function fillInitialComponents() {
    console.log('window - DOMContentLoaded - Load Settings')

    // Carrega lista de paises no localStorge
    // var countriesList = await getCountries()
    
    let localData = localStorage.getItem(`whatsGo::CountrySelected`)
    let country
    // let userLanguage = window.navigator.language || window.navigator.userLanguage || "en-US"
    let userLanguage = document.documentElement.lang || "en-US"

    if (localData !== null) {
        country = JSON.parse(localData)
    } else {
        alpha2Code = await getAlpha2CodeApi()
        country =  await countriesList
        console.log(country)
        country = country.find(country => country.alpha2Code == alpha2Code)
        country = JSON.parse(JSON.stringify( country )) 
        country.callingCode = "+" + country.callingCodes[0]
        delete country.callingCodes
    }

    // Se o browser suporta tradução de nomes
    if (Intl.DisplayNames) {
        let displayNames = new Intl.DisplayNames([userLanguage], { type: 'region' })
        country.name = displayNames.of( country.alpha2Code )
    }
    
    countrySelectedFillForm(country)
    // Salva no cache
    localStorage.setItem(`whatsGo::CountrySelected`, JSON.stringify(country))

    console.table(country)

    templateRender(await countriesList)


}




