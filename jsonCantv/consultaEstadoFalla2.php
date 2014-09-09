<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id2 = $_GET['idFal'];

$sql = "SELECT C.Nombre, C.Direccion, C.Latitud, C.Longitud, S.Nombre, S.Descipcion, S.Piso, E.Ubicacion, E.Funcion_Principal, T.Tipo_Equipo, M.Marca FROM fallas F INNER JOIN enlaces D ON F.Id_Enlace=D.Id_Enlace INNER JOIN equipos E ON D.Id_Equipo=E.Id_Equipo INNER JOIN salas S ON E.Id_Sala=S.Id_Sala INNER JOIN centrales C ON S.Id_Central=C.Id_Central INNER JOIN tipo_equipos T ON E.Id_Tipo_Equipo=T.Id_Tipo_Equipo INNER JOIN marca M ON E.Id_Marca=M.Id_Marca WHERE F.Id_Falla='$id2'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["nomCentral"]= $row[0];
	$dat[$i]["dirCentral"]= $row[1];
	$dat[$i]["latitud"]= $row[2];
	$dat[$i]["longitud"]= $row[3];
	$dat[$i]["nomSala"]= $row[4];
	$dat[$i]['desSala'] = $row[5];
	$dat[$i]["pisoSala"]= $row[6];
	$dat[$i]['ubiEquipo'] = $row[7];
	$dat[$i]["funPrincipal"]= $row[8];
	$dat[$i]["tipoEquipo"]= $row[9];
	$dat[$i]["marca"] = $row[10];
	$i++;	
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>