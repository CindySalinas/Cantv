
<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$idUsuario= $_GET["idUser"];
$usuario= $_GET["user"];
$email= $_GET["correo"];
$nacimiento= $_GET["fecha"];
$telefono= $_GET["tel"];
$central= $_GET["cen"];

$sql2 = "UPDATE usuarios SET Id_Central='$central', Email='$email', nombre_usuario='$usuario', Fecha_Nacimiento='$nacimiento', Telefono='$telefono' WHERE Id_Usuario='$idUsuario'";

$result2 = mysql_query($sql2) or die("Error de Consulta". mysql_error());



$estado["mensaje"]= "Usuario Modificado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>