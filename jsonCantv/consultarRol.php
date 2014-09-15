<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$sql = "SELECT Id_Tipo_Usuario, Rol FROM tipo_usuario";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idRol"]= $row[0];
	$dat[$i]["rol"]= $row[1];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Existe Ningun Rol";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>