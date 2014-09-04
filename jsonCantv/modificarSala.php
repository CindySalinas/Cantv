<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$nombre= $_GET["nom"];
$descripcion= $_GET["desc"];
$piso= $_GET["piso"];
$central= $_GET["idCentral"];
$sala = $_GET["idSala"];

$sql2 = "UPDATE salas SET Id_Central='$central', Nombre='$nombre',Piso = '$piso',Descipcion= '$descripcion' WHERE Id_Sala='$sala'";

$result2 = mysql_query($sql2) or die("Error de Consulta". mysql_error());

$estado["mensaje"]= "Sala Actualizada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>