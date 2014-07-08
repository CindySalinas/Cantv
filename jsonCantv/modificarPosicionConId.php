<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$id= $_GET["idpos"];
$posicion= $_GET["pos"];

$sql = "UPDATE posiciones SET Posicion='$posicion' WHERE Id_Posicion='$id'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Posición Modificada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>