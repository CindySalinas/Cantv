<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id2 = $_GET['idFal'];

$sql = "SELECT O.Observacion, O.Fecha, O.Hora, U.Nombre, U.Apellido, O.Id_Observacion_Falla, U.Id_Usuario, E.Numero_Enlace FROM observaciones_fallas O INNER JOIN usuarios U ON O.Id_Usuario_Observacion=U.Id_Usuario INNER JOIN fallas f ON f.Id_Falla=O.Id_Falla INNER JOIN enlaces E ON F.Id_Enlace=E.Id_Enlace WHERE O.Id_Falla='$id2'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["obser"]= $row[0];
	$dat[$i]["fecha"]= $row[1];
	$dat[$i]["hora"]= $row[2];
	$dat[$i]["nom"]= $row[3];
	$dat[$i]["ape"]= $row[4];
	$dat[$i]["idObser"]= $row[5];
	$dat[$i]["idUser"]= $row[6];
	$dat[$i]["enlace"]= $row[7];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No se encontro Observaciones";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>