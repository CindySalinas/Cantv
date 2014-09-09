<?php
// conexion bd 
include("conex.php");
//formato JSON
header('Content-type: application/json');
$id= $_GET["idPerfil"];
$sql = "SELECT u.Foto_Perfil, A.Actividad, A.Fecha, A.Hora FROM actividades a INNER JOIN usuarios u ON A.Id_Usuario=u.Id_Usuario WHERE u.id_usuario='$id' ORDER BY A.Id_Actividad DESC";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$records = array();
$i =0;

$cantidad = mysql_num_rows($result);
//$estado["num"]= $cantidad;
while($row = mysql_fetch_row($result)){

	$estado[$i]["ftPerfil"]= $row[0];
	$estado[$i]["acti"]= $row[1];
	$estado[$i]["fecha"]= $row[2];
	$estado[$i]["hora"]= $row[3];
	$i++;	
}
//Convertir los resultados a formato json
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No se encontro Observaciones";
}
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
//$sql= "SELECT Cedula,Nombre,Apellido,Correo FROM usuario WHERE Cedula='$usr'";
?>