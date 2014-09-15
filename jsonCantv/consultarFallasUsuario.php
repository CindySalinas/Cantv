<?php 
// conexion bd 
include("conex.php");
//formato JSON
header('Content-type: application/json');

$id = $_GET["id"];
$sql = "SELECT S.Id_Fallas_Solucion, S.Id_Falla, S.Fecha, S.Hora, F.Descripcion, E.Numero_Enlace FROM fallas_solucion S INNER JOIN fallas F ON S.Id_Falla = F.Id_Falla INNER JOIN enlaces E ON F.Id_Enlace=E.Id_Enlace WHERE S.Id_Usuario ='$id'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idFallasSolucion"]= $row[0];
	$dat[$i]["idFallas"]= $row[1];
	$dat[$i]["fecha"]= $row[2];
	$dat[$i]["hora"]= $row[3];
	$dat[$i]["desc"]= $row[4];
	$dat[$i]["enlace"]= $row[5];
	$i++;	
}

$dat["num"] = $cantidad;

$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>