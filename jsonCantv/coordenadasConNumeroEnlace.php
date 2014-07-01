<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id = $_GET['numero'];
$sql = "SELECT C.Id_Central,C.Nombre,C.Direccion,C.Latitud,C.Longitud, S.Nombre, S.Piso FROM centrales C INNER JOIN salas S ON C.Id_Central=S.Id_Central INNER JOIN equipos Q ON S.Id_Sala=Q.Id_Sala WHERE Q.Id_Equipo = '$id'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idCtrl"]= $row[0];
	$dat[$i]["nomCtrl"]= $row[1];
	$dat[$i]["dirCtrl"]= $row[2];
	$dat[$i]["latCtrl"]= $row[3];
	$dat[$i]["longCtrl"]= $row[4];
	$dat[$i]["nomb"]= $row[5];
	$dat[$i]["pisos"]= $row[6];
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