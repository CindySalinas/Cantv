<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$id = $_GET["idFalla"];
$estatus =  $_GET["estatus"];


$sql2 = "UPDATE fallas SET Id_Estatus='$estatus' WHERE Id_Falla='$id'";


$result2 = mysql_query($sql2) or die("Error de Consulta". mysql_error());



$estado["mensaje"]= "Estatus Cambiado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>