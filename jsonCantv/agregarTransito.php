<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$enlace= $_GET["idEnlace"];
$transito= $_GET["element"];

$sql = "INSERT INTO transitos (Id_Enlace,Transito) VALUES ('$enlace','$transito')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nuevo Transito Agregado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>