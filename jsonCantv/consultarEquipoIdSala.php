<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$id = $_GET['idSal'];
$sql = "SELECT E.Id_Equipo, T.Tipo_Equipo, E.Ubicacion FROM equipos E INNER JOIN tipo_equipos T ON T.Id_Tipo_Equipo = E.Id_Tipo_Equipo WHERE Id_Sala = '$id'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idEquipo"]= $row[0];
	$dat[$i]["nombreEquipo"]= $row[1];
	$dat[$i]["ubicacion"]= $row[2];
	$i++;	
}
if($cantidad==0)
{
	$dat["mensaje"]=0;
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>