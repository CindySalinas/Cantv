<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$idSala= $_GET["idSala"];
$idTipoE = $_GET["tipoE"];
$idCon = $_GET["condi"];
$funcP = $_GET["fun"];
$ubi = $_GET["Ubi"];

$sql = "INSERT INTO equipos (Id_Sala,Id_Tipo_Equipo,Id_Condicion,Funcion_Principal,Ubicacion) VALUES ('$idSala','idTipoE','$idCon','$funcP','$ubi')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nueva Equipo Agregado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>