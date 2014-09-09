<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$busc = $_GET['buscar'];
$sql = "SELECT F.Id_Enlace,E.Numero_Enlace,U.nombre_usuario,F.Id_Estatus,S.Estatus,F.Descripcion,F.Fecha,F.Hora,F.Id_Falla, U.Nombre, U.Apellido FROM fallas F INNER JOIN enlaces E ON F.Id_Enlace = E.Id_Enlace INNER JOIN estatus S ON F.Id_Estatus = S.Id_Estatus INNER JOIN usuarios U ON F.Id_Usuario_Falla = U.Id_Usuario WHERE E.Numero_Enlace LIKE '%$busc%' ORDER BY F.Id_Falla DESC";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idEnla"]= $row[0];
	$dat[$i]["numEnla"]= $row[1];
	$dat[$i]["nomApell"]= $row[2];
	$dat[$i]["idStat"]= $row[3];
	$dat[$i]["stat"]= $row[4];
	$dat[$i]["descri"]= $row[5];
	$dat[$i]["fecha"]= $row[6];
	$dat[$i]["hora"]= $row[7];
	$dat[$i]["idFall"] = $row[8];
	$dat[$i]["nombre"] = $row[9];
	$dat[$i]["apellido"] = $row[10];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Hay Fallas";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>