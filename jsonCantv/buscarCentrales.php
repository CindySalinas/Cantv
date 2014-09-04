<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$nombre = $_GET['nom'];

$sql = "SELECT Id_Central,Nombre,Direccion,Latitud,Longitud FROM centrales WHERE Nombre LIKE '%$nombre%'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idCtrl"]= $row[0];
	$dat[$i]["nomCtrl"]= $row[1];
	$dat[$i]["dirCtrl"]= $row[2];
	$dat[$i]["latCtrl"]= $row[3];
	$dat[$i]["longCtrl"]= $row[4];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Hay Centrales";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>