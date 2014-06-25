<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id = $_GET["idCentral"];
$sql = "SELECT DISTINCT Id_Sala,Id_Central,Nombre,Piso,Descipcion FROM salas WHERE Id_Central = '$id' ";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idSala"]= $row[0];
	$dat[$i]["idCentr"]= $row[1];
	$dat[$i]["nomb"]= $row[2];
	$dat[$i]["piso"]= $row[3];
	$dat[$i]["desc"]= $row[4];

	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Hay Equipos";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>