<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id = $_GET['falla'];
$sql = "SELECT T.Transito FROM transitos T INNER JOIN enlaces E ON T.Id_Enlace=E.Id_Enlace INNER JOIN fallas F ON E.Id_Enlace=F.Id_Enlace WHERE F.Id_Falla = 38 ORDER BY T.Id_Transito ASC";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idtransito"]= $row[0];
	$dat[$i]["transito"]= $row[1];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Hay Transitos";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>