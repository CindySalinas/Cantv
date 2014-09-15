<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id= $_GET["id"];
$sql = "SELECT F.Fecha FROM fallas F INNER JOIN enlaces E ON F.Id_Enlace=E.Id_Enlace INNER JOIN equipos Q ON E.Id_Equipo=Q.Id_Equipo INNER JOIN salas S ON Q.Id_Sala=S.Id_Sala INNER JOIN centrales C ON S.Id_Central = C.Id_Central WHERE C.Id_Central='$id' ORDER BY F.Id_Falla DESC";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["fecha"]= $row[0];
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