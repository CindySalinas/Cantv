<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$enlace= $_GET["idEnlace"];
$posicion= $_GET["element"];

$sql = "INSERT INTO posiciones (Id_Enlace,Posicion) VALUES ('$enlace','$posicion')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nueva Posicion Agregada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>