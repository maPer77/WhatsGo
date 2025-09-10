var isMobile = mobileCheck();
var phoneNumber = document.getElementById("phoneNumber");
var newWindow;


if (isMobile === false) {
    var whatsappDesktopInput = document.getElementById("whatsappDesktopInput");
    var switches = document.getElementById("whatsappDesktop");
    switches.style.display = 'block'
    whatsappDesktopInput.checked = Cookies.get('desktopVersion') == "true";

    // --------------------------------------------------------------------------------------- KEYPRESS 
    // document.getElementById("phoneNumber").addEventListener("keypress", function(event) {
    //     let key = event.key
    //     key = parseInt( key )
    //     if ( key >= 0 && key <= 9 ) {
        //         this.value = formatPhoneNumber(this.value + event.key)
        //     }
        //     event.preventDefault()
        // }, false);
        phoneNumber.addEventListener("keypress", function(event) {
            let key = parseInt( event.key )
            if ( (key >= 0 && key <= 9) == false ) {
                event.preventDefault()
            }
        }, false);
        
}

// Formata o numero ex: 999.9999.9999 
function formatPhoneNumber(number) {
    return number.replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1.')
}

// function formatPhoneNumberAlternative(number) {
//     console.log(number);
//     [number, group3] = pops(number, 4);
//     [number, group2]  = pops(number, 4);
//     [number, group1]  = pops(number, 4);
//     result = group3.length ? group3 : "";
//     result = group2.length ? (group2 + "." + result) : result;
//     result = group1.length ? (group1 + "." + result) : result;
//     result = number.length ? (number + "." + result) : result;
//     console.log(result); 
//     return result 
// }
// Retorna X caracteres do final de uma string e também a string informada sem os X caracteres finais
// Argumentos (str, length)
//      - str - uma string
//      - length - quantidade de caracteres
// Retorno [array]:
//      - array[0] : a string sem os X ultimos caracteres
//      - array[1] : os X ultimos caracteres requisitados
// function pops(str, length) {
//     length = (length > str.length) ? str.length : length
//     str = str.split("")
//     let result = ''
//     for (let i = 0; i < length; i++) {
//         result = str.pop() + result
//     }
//     str = str.join("")
//     return [str, result]
// } 


// --------------------------------------------------------------------------------------- KEYUP
phoneNumber.addEventListener("keyup", function(event) {
    // console.log(event.type)
    let number = this.value.replace(/\D/g, '')
    validateLength(number)
    this.value = formatPhoneNumber(number)

    if (event.key === "Enter" || event.keyCode === 13) { 
        event.preventDefault();  
        document.getElementById("whatsappLink").click();
    }

}, false)



// --------------------------------------------------------------------------------------- INPUT
phoneNumber.addEventListener("input", function(event) {
    validateLength(this.value)
}, false)


function validateLength(number) {
    if ( number.length >= 6 ) {
        whatsappLink.disabled = false
        messageNumber.style.display = 'none'
        messageSend.style.display = 'block'
    } else {
        whatsappLink.disabled = true
        messageNumber.style.display = 'block'
        messageSend.style.display = 'none'
    }
}



// --------------------------------------------------------------------------------------- PASTE
phoneNumber.addEventListener("paste", function(event) {
    event.preventDefault()
    let text = (event.originalEvent || event).clipboardData.getData('text/plain')
    this.value = text.replace(/\D/g, '').slice(0,14)
}, false)



// --------------------------------------------------------------------------------------- CLICK
phoneNumber.addEventListener("click", function() { 
    if (isMobile) {
        // document.body.classList.add("keyboardOn")
        html.classList.add("keyboardOn")
    }
    // console.log(event.type)    
}, false)



// --------------------------------------------------------------------------------------- BLUR
phoneNumber.addEventListener("blur", function() {
    if (isMobile) {
        // document.body.classList.remove("keyboardOn")
        html.classList.remove("keyboardOn")
    }
    // console.log(event.type)    
}, false)

if (isMobile === false) {
    // --------------------------------------------------------------------------------------- USE DESKTOP CLICK
    whatsappDesktopInput.addEventListener("click", function() {
        if (this.checked) {
            Cookies.set('desktopVersion', true, { expires: 3650, secure: true });
        } else {
            Cookies.set('desktopVersion', false, { expires: 3650, secure: true });
        }
        console.log(this.checked);
        // console.log(event.type)    
    }, false)
}



// --------------------------------------------------------------------------------------- mobileCheck()
// window.mobileCheck = function() {
function mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check
};



// --------------------------------------------------------------------------------------- whatsGo()
document.getElementById("whatsappLink").addEventListener("click", function() { 

    let isMobile = mobileCheck()
    var callingCode = document.getElementById("callingCode").value
    var phoneNumber = document.getElementById('phoneNumber').value
    phoneNumber = phoneNumber.replace(/\D/g, '')
    let link
    if (isMobile) {
        link = "whatsapp://send?phone=" + callingCode + phoneNumber;
        window.location = link;
    } else {
        let useDesktopVersion = whatsappDesktopInput.checked;
        if (useDesktopVersion) {
            link = "whatsapp://send?phone=" + callingCode + phoneNumber;
            window.location = link;
        } else {
            link = "https://web.whatsapp.com/send?phone=" + callingCode + phoneNumber;
            console.log(link)
            newWindow !== undefined ? newWindow.close() : null;
            newWindow = window.open(link, "whatsapp");
        }
    }
    
}, false); // END whatsGo




