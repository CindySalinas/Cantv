<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$nom= $_GET["nom"];
$desc= $_GET["desc"];
$piso= $_GET["piso"];
$cnt= $_GET["cnt"];


$sql = "INSERT INTO salas (Nombre,Descipcion,Piso,Id_Central) VALUES ('$nom','$desc','$piso','$cnt')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nueva Sala  Agregada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>