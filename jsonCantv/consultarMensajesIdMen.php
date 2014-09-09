<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$id = $_GET['mensaje'];

$sql = "SELECT * FROM mensajes WHERE Id_Mensaje ='$id'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idmen"]= $row[0];
	$dat[$i]["men"]= $row[1];
	$dat[$i]["asunto"]= $row[2];
	$dat[$i]["emisor"]= $row[3];
	$dat[$i]["receptor"]= $row[4];
	$dat[$i]["fecha"]= $row[5];
	$dat[$i]["hora"]= $row[6];
	$i++;	
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>