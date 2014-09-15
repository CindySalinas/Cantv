<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id= $_GET["id"];
$sql = "SELECT S.Fecha FROM fallas F INNER JOIN fallas_solucion S ON F.Id_Falla=S.Id_Falla WHERE S.Id_Usuario='$id' ORDER BY F.Id_Falla DESC";

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