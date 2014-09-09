<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id = $_GET['idUser'];
$pass = $_GET['pass'];

$sql = "SELECT nombre_usuario FROM usuarios WHERE Id_Usuario = '$id' AND Password ='$pass'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["user"]= $row[0];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "Password Incorrecta";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>