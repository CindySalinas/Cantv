<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$receptor= $_GET["mensaje"];
$emisor= $_GET["asunto"];
$mensaje= $_GET["emisor"];
$fecha= $_GET["receptor"];
$hora= $_GET["fecha"];
$asunto= $_GET["hora"];

$sql = "INSERT INTO mensajes (Mensaje,Asunto,Emisor,Receptor,Fecha,Hora) VALUES ('$receptor','$emisor','$mensaje','$fecha','$hora','$asunto')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nuevo Mensaje Enviado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>