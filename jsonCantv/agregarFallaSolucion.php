<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$falla = $_GET["idFalla"];
$hora = $_GET["hora"];
$fecha = $_GET["fecha"];
$perfil = $_GET["perfil"];

$sql = "INSERT INTO fallas_solucion (Id_Falla, Id_Usuario, Fecha, Hora) VALUES ('$falla','$perfil','$fecha ','$hora ')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nueva Falla Solución Agregada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>