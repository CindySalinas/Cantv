<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$id = $_GET["numero"];

$sql = "SELECT Id_Enlace FROM enlaces WHERE Numero_Enlace = '$id' ";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$row = mysql_fetch_row($result);
$dat["mensaje"]=$row[0];

$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>