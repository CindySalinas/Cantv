<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$nom= $_GET["tipoE"];

$sql = "INSERT INTO tipo_equipos (Tipo_Equipo) VALUES ('$nom')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nueva Equipo Agregado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>