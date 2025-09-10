<?php
error_reporting(E_ALL & ~E_WARNING);

// if (str_contains($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST']) === false) {
//     echo "ERRO";
//     return;
// }
// $geoPlugin = file_get_contents('http://www.geoplugin.net/php.gp?ip=' . $_SERVER['REMOTE_ADDR'] );

$geoPlugin = file_get_contents('http://www.geoplugin.net/php.gp?ip=' . '177.52.146.3' );
if ($geoPlugin !== false) {
    $geoPlugin_array = unserialize( $geoPlugin );
    $status =  $geoPlugin_array['geoplugin_status'];
    if ($status == 200) {
        $countryCode =  $geoPlugin_array['geoplugin_countryCode'];
        $countryCode = ["country" => "{$countryCode}"];
        echo json_encode($countryCode);
        exit;
    }
    
}
http_response_code(404);


