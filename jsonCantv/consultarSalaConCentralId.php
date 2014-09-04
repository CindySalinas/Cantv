<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$busc = $_GET['id'];
$sql = "SELECT S.Id_Sala,S.Id_Central,S.Nombre,S.Piso,S.Descipcion,C.Nombre,C.Direccion,C.Latitud,C.Longitud FROM salas S INNER JOIN centrales C ON S.Id_Central = C.Id_Central WHERE S.Id_Central='$busc' ORDER BY S.Id_Sala asc";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idSala"]= $row[0];
	$dat[$i]["idCentral"]= $row[1];
	$dat[$i]["salaNombre"]= $row[2];
	$dat[$i]["salaPiso"]= $row[3];
	$dat[$i]["salaDesc"]= $row[4];
	$dat[$i]["centralNombre"]= $row[5];
	$dat[$i]["dentralDir"]= $row[6];
	$dat[$i]["centralLatitud"]= $row[7];
	$dat[$i]["centralLongitud"]= $row[8];

	$i++;	
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>