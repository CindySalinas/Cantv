<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$id = $_GET["mail"];

$sql = "SELECT M.Id_Mensaje, M.Mensaje, M.Asunto, M.Emisor, M.Receptor, M.Fecha, M.Hora, U.Foto_Perfil FROM mensajes M INNER JOIN usuarios U ON U.Email = M.Emisor WHERE M.Emisor = '$id' ";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idMensaje"]= $row[0];
	$dat[$i]["mensaje"]= $row[1];
	$dat[$i]["asunto"]= $row[2];
	$dat[$i]["emisor"]= $row[3];
	$dat[$i]["receptor"]= $row[4];
	$dat[$i]["fecha"]= $row[5];
	$dat[$i]["hora"]= $row[6];
	$dat[$i]["foto"]= $row[7];
	$i++;	
}
if($cantidad==0)
{
	$dat["num"] = 0;
	$dat["mensaje"]= "No Hay Emails";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>