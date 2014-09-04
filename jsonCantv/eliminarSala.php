<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$sala= $_GET["idSala"];

$sql = "DELETE FROM salas WHERE Id_Sala='$sala'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Sala Eliminada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>