<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$id = $_GET['idEqui'];
$sql = "SELECT Ubicacion FROM equipos WHERE Id_Equipo = '$id'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["ubicacion"]= $row[0];
	$i++;	
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>