<?php 
// conexion bd 
include("conex.php");
//formato JSON
header('Content-type: application/json');

$usr = $_GET["namePerf"];
$sql = "SELECT Foto_Perfil FROM usuarios WHERE u.Email ='$usr'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["fotoPerfil"]= $row[0];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No existe Perfil";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>