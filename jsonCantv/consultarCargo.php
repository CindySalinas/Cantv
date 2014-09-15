<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$cargo= $_GET["cargo"];

$sql = "SELECT Id_Cargo FROM cargos WHERE Cargo='$cargo'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat["mensaje"]= $row[0];
	$i++;	
}
if($cantidad == 0)
{
	$dat["num"] = 0;
	$dat["mensaje"]= "No Existe El Cargo";
	$sql2 = "INSERT INTO cargos (Cargo) VALUES ('$cargo')";
	$result2 = mysql_query($sql2) or die("Error de Consulta". mysql_error());

	$sql3 = "SELECT Id_Cargo FROM cargos WHERE Cargo='$cargo'";

	$result3 = mysql_query($sql3) or die("Error de Consulta". mysql_error());
	$i =0;

	$cantidad3 = mysql_num_rows($result3);

	while($row = mysql_fetch_row($result3)){
		$dat["mensaje"]= $row[0];
		$i++;	
	}
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>