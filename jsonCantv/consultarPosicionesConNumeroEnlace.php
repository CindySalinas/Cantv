<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id = $_GET['numero'];

$sql = "SELECT DISTINCT T.Id_Posicion, T.Posicion FROM posiciones T INNER JOIN enlaces E ON T.Id_Enlace=E.Id_Enlace WHERE E.Numero_Enlace = '$id'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idposicion"]= $row[0];
	$dat[$i]["posicion"]= $row[1];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Hay Posiciones";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>