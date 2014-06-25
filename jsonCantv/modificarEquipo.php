<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$idTp= $_GET["idTp"];
$idSa= $_GET["idSal"];
$idC= $_GET["idCn"];
$fun= $_GET["funcP"];
$ubi = $_GET["ubic"];
$id = $_GET["idE"];

$sql2 = "UPDATE equipos SET Id_Tipo_Equipo='$idTp', Id_Sala='$idSa',Id_Condicion = '$idC',Funcion_Principal= '$fun', Ubicacion ='ubi'  WHERE Id_Equipo='$id'";


$result2 = mysql_query($sql2) or die("Error de Consulta". mysql_error());



$estado["mensaje"]= "Cliente Actualizado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>