<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$idFalla = $_GET["idFalla"];
$obser = $_GET["obser"];
$fecha = $_GET["fecha"];
$hora = $_GET["hora"];
$perfil = $_GET["idP"];

$sql = "INSERT INTO observaciones_fallas (Id_Falla,Id_Usuario_Observacion,Observacion,Fecha,Hora) VALUES ('$idFalla','$perfil','$obser','$fecha','$hora')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nueva Falla Observacion Agregada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>