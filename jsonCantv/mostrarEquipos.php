<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$sql = "SELECT DISTINCT Id_Tipo_Equipo,Tipo_Equipo FROM tipo_equipos";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());

$i =0;
$j = 0;
$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idTipo"]= $row[0];
	$dat[$i]["tipoE"]= $row[1];
	$i++;	
}


if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Se cargaron los Equipos";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>