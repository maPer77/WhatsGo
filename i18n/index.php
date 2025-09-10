<?php
    $lang = 'pt';
    if ( isset($_GET['lang']) ) {
        // $lang = preg_replace("/[^A-z]+/", "", $_GET['lang']);
        $lang = $_GET['lang'];
        // echo $lang;
        $lang = strtolower($lang);
    }
    $updatedTime= time(); 
    $i18n["pt"] =
            [
            "htmlTitle" => "WhatsGO.app • WhatsApp Número Direto. Inicie uma conversa sem cadastrar o contato !!!",
            "htmlDescription" => "Inicie uma conversa sem cadastrar o contato !!! Informe o número e clique para abrir o WhatsApp.",
            "htmlKeywords" => "Inicie uma conversa sem cadastrar o contato !!! Informe o número e clique para abrir o WhatsApp.",
            "title" => "Inicie uma conversa sem cadastrar o contato !!!",
            "description" => "Informe o número e clique para abrir o WhatsApp.",
            ];

    $i18n['es'] =
            [
            "htmlTitle" => "WhatsGO.app • WhatsApp Número Directo. ¡¡¡Inicia una conversación sin registrar el contacto !!!",
            "htmlDescription" => "¡¡¡Inicia la conversación sin registrar el contacto !!! Ingrese el número y haga clic para abrir WhatsApp.",
            "htmlKeywords" => "¡¡¡Inicia la conversación sin registrar el contacto !!! Ingrese el número y haga clic para abrir WhatsApp.",
            "title" => "¡¡¡Inicia la conversación sin registrar el contacto !!!",
            "description" => "Ingrese el número y haga clic para abrir WhatsApp.",
            ];

    $i18n['fr'] =
            [
            "htmlTitle" => "WhatsGO.app • WhatsApp Numéro Direct. Démarrez une conversation sans enregistrer le contact !!!",
            "htmlDescription" => "Démarrez une conversation sans enregistrer le contact !!! Entrez le numéro et cliquez pour ouvrir WhatsApp.",
            "htmlKeywords" => "Démarrez une conversation sans enregistrer le contact !!! Entrez le numéro et cliquez pour ouvrir WhatsApp.",
            "title" => "Démarrez une conversation sans enregistrer le contact !!!",
            "description" => "Entrez le numéro et cliquez pour ouvrir WhatsApp.",
            ];
            
    $i18n['it'] =
            [
            "htmlTitle" => "WhatsGO.app • WhatsApp Numero diretto. Inizia una conversazione senza registrare il contatto !!!",
            "htmlDescription" => "Inizia una conversazione senza registrare il contatto !!! Inserisci il numero e fai clic per aprire WhatsApp.",
            "htmlKeywords" => "Inizia una conversazione senza registrare il contatto !!! Inserisci il numero e fai clic per aprire WhatsApp.",
            "title" => "Inizia una conversazione senza registrare il contatto !!!",
            "description" => "Inserisci il numero e fai clic per aprire WhatsApp.",
            ];

    $i18n['en'] =
            [
            "htmlTitle" => "WhatsGO.app • WhatsApp Direct Number. Start a conversation without registering the contact !!!",
            "htmlDescription" => "Start a conversation without registering the contact !!! Enter the number and click to open WhatsApp.",
            "htmlKeywords" => "Start a conversation without registering the contact !!! Enter the number and click to open WhatsApp.",
            "title" => "Start a conversation without registering the contact !!!",
            "description" => "Enter the number and click to open WhatsApp.",
            ];

    $i18n['de'] =
            [
            "htmlTitle" => "WhatsGO.app • WhatsApp Direkte nummer. Starten Sie ein Gespräch, ohne den Kontakt zu registrieren !!!",
            "htmlDescription" => "Starten Sie ein Gespräch, ohne den Kontakt zu registrieren !!! Geben Sie die Nummer ein und klicken Sie, um WhatsApp zu öffnen.",
            "htmlKeywords" => "Starten Sie ein Gespräch, ohne den Kontakt zu registrieren !!! Geben Sie die Nummer ein und klicken Sie, um WhatsApp zu öffnen.",
            "title" => "Starten Sie ein Gespräch, ohne den Kontakt zu registrieren !!!",
            "description" => "Geben Sie die Nummer ein und klicken Sie, um WhatsApp zu öffnen.",
            ];

    $i18n['hi'] =
            [
            "htmlTitle" => "WhatsGO.app • WhatsApp डायरेक्ट नंबर। संपर्क को पंजीकृत किए बिना बातचीत शुरू करें !!!",
            "htmlDescription" => "संपर्क को पंजीकृत किए बिना बातचीत शुरू करें !!! नंबर डालें और व्हाट्सएप खोलने के लिए क्लिक करें।",
            "htmlKeywords" => "संपर्क को पंजीकृत किए बिना बातचीत शुरू करें !!! नंबर डालें और व्हाट्सएप खोलने के लिए क्लिक करें।",
            "title" => "संपर्क को पंजीकृत किए बिना बातचीत शुरू करें !!!",
            "description" => "नंबर डालें और व्हाट्सएप खोलने के लिए क्लिक करें।",
            ];

?>

<?php
// $lang = str_replace('/', '', $_GET['lang']);
//  echo $lang;
$dom = new DOMDocument();
// $dom->encoding = 'utf-8';
// $dom->substituteEntities = true;
$dom->validateOnParse = true;
libxml_use_internal_errors(true);
// $dom->loadHTMLFile("../index.html");

$fileContent = file_get_contents("../index.html");
    // $fileContent = htmlentities($fileContent);
$fileContent = mb_convert_encoding($fileContent, 'HTML-ENTITIES', 'UTF-8');
$dom->loadHTML($fileContent);

// HTML
$tagHtml = $dom->documentElement;
$tagHtml->setAttribute("lang", $lang);

// BASE
$tabBaseValue = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['CONTEXT_PREFIX'] . '/';
// $tagBase = $dom->getElementsByTagName('base')->item(0);
$tagBase = $dom->getElementsByTagName('base')[0];
$tagBase->setAttribute("href", $tabBaseValue);

// TITLE
// $title = $dom->getElementsByTagName('title')->item(0);
$title = $dom->getElementsByTagName('title')[0];
$title->nodeValue = $i18n[$lang]["htmlTitle"];


$xpath = new DOMXPath($dom);
/*
// PARA EXCLUIR AS TAG SPAN COM OUTRAS LINGUAGENS QUE NAO SEJA $lang
// para o google identificar corretamente como a lingua do site, se tiver outras linguas junto o google se perde
$content = $dom->getElementById('content');
// our query is relative to the tbody node
$query = "//span[@lang]";
$elementos = $xpath->query($query, $content);

foreach ($elementos as $elemento) {
    // var_dump($elemento );
    if ($elemento->getAttribute("lang") <> $lang ) {
        // var_dump($elemento->getAttribute("lang"));
        $elemento->parentNode->removeChild($elemento);
    }
    // if ($elemento->value == $lang && isset($elemento->name) == true) {
    //     // $elemento->parentNode->removeChild($elemento);
    // }
}
*/
        /*
        // Coloca os <span> da $lang informada no primeiro elemento do bloco para o google identificar como a lingua do site
        $content = $dom->getElementById('content');
        $query = "//span[contains(@class, 'langBlock')]//span[@lang='{$lang}']";
        $elementos = $xpath->query($query, $content);
        foreach ($elementos as $elemento) {
            $elemento->parentNode->insertBefore($elemento, $elemento->parentNode->firstChild);
        }
        */

// METATAGS
$content = $dom->getElementById('metaTags');
$query = "//meta[@class]";
$elementos = $xpath->query($query, $content);

foreach ($elementos as $elemento) {
    $name = $elemento->getAttribute("name");
    $property = $elemento->getAttribute("property");
    if ($name) {
        switch ($name) {
            case 'description':
                $elemento->setAttribute("content", $i18n[$lang]["htmlDescription"] );
                break;
            case 'keywords':
                $elemento->setAttribute("content", $i18n[$lang]["htmlKeywords"] );
                break;
            case 'twitter:title':
                $elemento->setAttribute("content", $i18n[$lang]["title"] );
                break;
            case 'twitter:description':
                $elemento->setAttribute("content", $i18n[$lang]["description"] );
                break;
            
        }
    } else if ($property) {
        switch ($property) {
            case 'og:title':
                $elemento->setAttribute("content", $i18n[$lang]["title"] );
                break;
            case 'og:description':
                $elemento->setAttribute("content", $i18n[$lang]["description"] );
                break;
            case 'og:updated_time':
                $elemento->setAttribute("content", $updatedTime );
                break;
            case 'og:url':
            case 'twitter:url':
                $elemento->setAttribute("content", "https://whatsgo.app/{$lang}/" );
                break;
        }

    }
    
}



$dom->formatOutput = TRUE;
// para retirar os simbolos html
    // $retorno = $dom->saveHTML( $dom->documentElement );
$retorno = $dom->saveHTML();
// $retorno = utf8_decode(  $retorno );
    $retorno = html_entity_decode( $retorno );
echo $retorno;

$dirname = "./cache/{$lang}/";
if (!is_dir($dirname)) {
    mkdir($dirname, 0755, true);
}
    // $dom->saveHTMLFile( $dirname.'index.html');
// para gravar sem os simbolos html
file_put_contents($dirname.'index.html', $retorno);


 
 