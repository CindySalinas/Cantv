<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id = $_GET['idEnla'];
$sql = "SELECT  O.Observacion, O.Id_Usuario_Observacion,U.nombre_usuario,O.Id_Falla,E.Numero_Enlace,O.Fecha,O.Hora,C.Id_Central,C.Nombre,S.Nombre,S.Piso,F.Id_Estatus,F.Id_Falla FROM observaciones_fallas O INNER JOIN Usuarios U ON  O.Id_Usuario_Observacion = U.Id_Usuario INNER JOIN fallas F ON O.Id_Falla = F.Id_Falla INNER JOIN enlaces E ON F.Id_Enlace = E.Id_Enlace INNER JOIN equipos Q ON E.Id_Equipo = Q.Id_Equipo INNER JOIN salas S ON Q.Id_Sala = S.Id_Sala INNER JOIN centrales C ON S.Id_Central = C.Id_Central WHERE E.Id_Enlace = '$id'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["obser"]= $row[0];
	$dat[$i]["nomUsr"]= $row[2];
	$dat[$i]["numEnla"]= $row[4];
	$dat[$i]["fecha"]= $row[5];
	$dat[$i]["hora"]= $row[6];
	$dat[$i]['idCent'] = $row[7];
	$dat[$i]["nombreCen"]= $row[8];
	$dat[$i]['salaNom'] = $row[9];
	$dat[$i]["pisoSala"]= $row[10];
	$dat[$i]["estadoF"]= $row[11];
	$dat[$i]["idFalla"] = $row[12];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No se encontro Observaciones";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>