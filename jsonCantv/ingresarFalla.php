<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$idEnlace = $_GET["idEnla"];
$idUsr = $_GET["usr"];
$idStat = $_GET["status"];
$desc = $_GET["descr"];
$fecha = $_GET["fc"];
$hora = $_GET["hr"];

$sql = "INSERT INTO fallas (Id_Enlace,Id_Usuario_Falla,Id_Estatus,Descripcion,Fecha,Hora) VALUES ('$idEnlace','$idUsr','$idStat','$desc','$fecha ','$hora ')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nueva Falla Agregada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>