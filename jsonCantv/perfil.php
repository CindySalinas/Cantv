<?php 
// conexion bd 
include("conex.php");
//formato JSON
header('Content-type: application/json');

$usr = $_GET["namePerf"];
$sql = "SELECT u.Nombre, u.Apellido,u.Fecha_Nacimiento,u.Telefono,u.Email,u.Foto_Perfil, t.Rol,u.Id_Usuario, C.Nombre, A.Cargo,C.Id_Central,u.nombre_usuario FROM usuarios u INNER JOIN tipo_usuario t ON u.Id_Tipo_Usuario = t.Id_Tipo_Usuario INNER JOIN centrales C ON C.Id_Central=u.Id_Central INNER JOIN cargos A ON u.Id_Cargo=A.Id_Cargo WHERE u.id_usuario ='$usr'";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["nom"]= $row[0];
	$dat[$i]["apll"]= $row[1];
	$dat[$i]["fechaNac"]= $row[2];
	$dat[$i]["telf"]= $row[3];
	$dat[$i]["mails"]= $row[4];
	$dat[$i]["ftPerfil"]= $row[5];
	$dat[$i]["rol"]= $row[6];
	$dat[$i]["idPer"]= $row[7];
	$dat[$i]["central"]= $row[8];
	$dat[$i]["cargo"]= $row[9];
	$dat[$i]["idCentral"]= $row[10];
	$dat[$i]["nomUser"]= $row[11];
	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No existe Perfil";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>