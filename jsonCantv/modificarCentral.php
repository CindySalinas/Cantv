
<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$nom= $_GET["nom"];
$dir= $_GET["dir"];
$latitud = $_GET["lat"];
$longitud = $_GET["lon"];
$id = $_GET["id"];

$sql2 = "UPDATE centrales SET Nombre='$nom', Direccion='$dir', Latitud='$latitud', Longitud='$longitud' WHERE Id_Central='$id'";

$result2 = mysql_query($sql2) or die("Error de Consulta". mysql_error());



$estado["mensaje"]= "Central Actualizada";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>