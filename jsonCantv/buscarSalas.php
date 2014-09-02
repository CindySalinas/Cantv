<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$id = $_GET['idSala'];
$sql = "SELECT DISTINCT S.Id_Sala,S.Id_Central,S.Nombre,S.Piso,S.Descipcion,C.Nombre, C.Direccion FROM salas S INNER JOIN centrales C ON S.Id_Central = C.Id_Central WHERE Id_Sala = '$id'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idSala"]= $row[0];
	$dat[$i]["idCentral"]= $row[1];
	$dat[$i]["nomb"]= $row[2];
	$dat[$i]["piso"]= $row[3];
	$dat[$i]["desc"]= $row[4];
	$dat[$i]["nomC"]= $row[5];
	$dat[$i]["dirCen"]= $row[6];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Salas clientes";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>