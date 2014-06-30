<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$numero= $_GET["numeroEnlace"];
$ruta= $_GET["rutaEnlace"];
$equipo= $_GET["equipoEnlace"];
$cliente= $_GET["clienteEnlace"];

$sql = "INSERT INTO enlaces (Id_Equipo,Id_Cliente,Numero_Enlace,Ruta) VALUES ('$equipo','$cliente','$numero','$ruta')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nuevo Enlace Agregado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>