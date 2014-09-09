<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$email = $_GET['email'];

$sql = "SELECT Id_Usuario FROM usuarios WHERE Email = '$email'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["obser"]= $row[0];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No se encontro Usuario";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>