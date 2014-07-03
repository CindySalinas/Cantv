<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$ids= $_GET["id"];

$sql = "DELETE FROM fallas WHERE Id_falla='$ids'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Falla Eliminada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>