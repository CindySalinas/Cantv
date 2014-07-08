<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id= $_GET["idEnlace"];

$sql = "SELECT E.Numero_Enlace, E.Ruta, C.Id_Cliente, T.Tipo_Equipo, S.Id_Sala, N.Id_Central, Q.Id_Equipo FROM enlaces E INNER JOIN equipos Q ON E.Id_Equipo=Q.Id_Equipo INNER JOIN  tipo_equipos T ON Q.Id_Tipo_Equipo=T.Id_Tipo_Equipo INNER JOIN clientes C ON E.Id_Cliente=C.Id_Cliente INNER JOIN salas S ON S.Id_Sala=Q.Id_Sala INNER JOIN centrales N ON N.Id_Central=S.Id_Central WHERE E.Id_Enlace='$id'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["numEnlace"]= $row[0];
	$dat[$i]["ruta"]= $row[1];
	$dat[$i]["cliente"]= $row[2];
	$dat[$i]["equipo"]= $row[3];
	$dat[$i]["sala"]= $row[4];
	$dat[$i]["central"]= $row[5];
	$dat[$i]["idEquipo"]= $row[6];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Hay Enlaces";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>