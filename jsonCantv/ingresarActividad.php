<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$perfil= $_GET["idPerfil"];
$actividad= $_GET["acti"];
$fecha= $_GET["fecha"];
$hora= $_GET["hora"];

$sql = "INSERT INTO actividades (Id_Usuario,Actividad,Fecha,Hora) VALUES ('$perfil','$actividad','$fecha','$hora')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nueva Actividad Agregada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>