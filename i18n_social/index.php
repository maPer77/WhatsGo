<?php
$lang = 'pt';
if ( isset($_GET['lang']) ) {
    $lang = preg_replace("/[^A-z]+/", "", $_GET['lang']);
    $lang = strtolower($lang);
}
$updatedTime= time();
$i18n["pt"] =
            [
            "titleHtml" => "WhatsGO.app • WhatsApp Direct Number !!!",
            "descriptionHtml" => "Inicie a conversa sem cadastrar o contato !!! Informe o número e clique para abrir o WhatsApp.",
            "keywordsHtml" => "Inicie a conversa sem cadastrar o contato !!! Informe o número e clique para abrir o WhatsApp.",
            "title" => "Inicie a conversa sem cadastrar o contato !!!",
            "description" => "Informe o número e clique para abrir o WhatsApp.",
            ];

$i18n['es'] =
            [
            "titleHtml" => "WhatsGO.app • WhatsApp Número Directo !!!",
            "descriptionHtml" => "¡¡¡Inicia la conversación sin registrar el contacto !!! Ingrese el número y haga clic para abrir WhatsApp.",
            "keywordsHtml" => "¡¡¡Inicia la conversación sin registrar el contacto !!! Ingrese el número y haga clic para abrir WhatsApp.",
            "title" => "¡¡¡Inicia la conversación sin registrar el contacto !!!",
            "description" => "Ingrese el número y haga clic para abrir WhatsApp.",
            ];


 $i18n['fr'] =
            [
            "titleHtml" => "WhatsGO.app • WhatsApp Número Directo !!!",
            "descriptionHtml" => "Frances",
            "keywordsHtml" => "Frances",
            "title" => "Frances",
            "description" => "Frances",
            ];

// var_dump($_GET);

?>




<!DOCTYPE html>
<html lang="<?=$lang?>">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$i18n[$lang]["titleHtml"];?></title>


    <!-- Facebook Meta Tags -->
    <meta name=description content="<?=$i18n[$lang]["descriptionHtml"];?>" />
    <meta name=keywords content="<?=$i18n[$lang]["keywordsHtml"];?>" />
    <meta property="og:updated_time" content="<?=$updatedTime;?>" />
    <meta property="og:title" content="<?=$i18n[$lang]["title"];?>" />
    <meta property="og:description" content="<?=$i18n[$lang]["description"];?>"/>
    <meta property="og:url" content="https://whatsgo.app/developer/site/<?=$lang;?>/" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="https://whatsgo.app/image/ogImage.png?8" />
    <meta property="og:image:type" content="image/png">
    <meta property="og:site_name" content="WhatsGO.app">
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="315" />



    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:domain" content="whatsgo.app">
    <meta property="twitter:url" content="https://whatsgo.app/<?=$lang;?>/">
    <meta name="twitter:title" content="<?=$i18n[$lang]["title"];?>">
    <meta name="twitter:description" content="<?=$i18n[$lang]["description"];?>">
    <meta name="twitter:image" content="https://whatsgo.app/image/ogImage.png?8">

</head>
<body>
    <?
    echo phpinfo();
    ?>
    
</body>
</html>