<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$id= $_GET["idpos"];

$sql = "DELETE FROM posiciones WHERE Id_Posicion='$id'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Posicion Eliminada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>