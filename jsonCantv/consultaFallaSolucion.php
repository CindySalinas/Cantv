<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id2 = $_GET['idFal'];
$sql = "SELECT F.Id_Fallas_Solucion, F.Fecha, F.Hora, U.Nombre, U.Apellido, U.Id_Usuario FROM fallas_solucion F INNER JOIN usuarios U ON F.Id_Usuario=U.Id_Usuario WHERE F.Id_Falla='$id2'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idFallaSolucion"]= $row[0];
	$dat[$i]["fecha"]= $row[1];
	$dat[$i]["hora"]= $row[2];
	$dat[$i]['nombre'] = $row[3];
	$dat[$i]["apellido"]= $row[4];
	$dat[$i]['idUsuario'] = $row[5];
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