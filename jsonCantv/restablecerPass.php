<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$cedula= $_GET["cedula"];
$id= $_GET["id"];

$sql = "UPDATE usuarios SET Password='$cedula' WHERE Id_Usuario='$id'";
/*
$sql2 = "UPDATE equipos SET Id_Tipo_Equipo='$idTp', Id_Sala='$idSa',Id_Condicion = '$idC',Funcion_Principal= '$fun', Ubicacion ='$ubi', Id_Marca='$marca'  WHERE Id_Equipo='$id'";
*/
$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Usuario Modificado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>