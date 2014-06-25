<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$sql = "SELECT DISTINCT Id_Marca, marca FROM marca";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;
$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idMarca"]= $row[0];
	$dat[$i]["marca"]= $row[1];
	$i++;	
}

if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Se cargaron las marcas";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>