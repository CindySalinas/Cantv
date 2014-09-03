<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$numero = $_GET['buscarNum'];

$sql = "SELECT E.Id_Enlace, E.Numero_Enlace, E.Ruta, C.Cliente, T.Tipo_Equipo, Q.Id_Equipo FROM enlaces E INNER JOIN equipos Q ON E.Id_Equipo=Q.Id_Equipo INNER JOIN  tipo_equipos T ON Q.Id_Tipo_Equipo=T.Id_Tipo_Equipo INNER JOIN clientes C ON E.Id_Cliente=C.Id_Cliente WHERE E.Numero_Enlace LIKE '%$numero%'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idEnlace"]= $row[0];
	$dat[$i]["numeroEnlace"]= $row[1];
	$dat[$i]["ruta"]= $row[2];
	$dat[$i]["cliente"]= $row[3];
	$dat[$i]["equipo"]= $row[4];
	$dat[$i]["idEquipo"]= $row[5];
	$i++;	
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>