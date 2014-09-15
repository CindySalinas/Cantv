<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$tipoUsuario= $_GET["tipoUsuario"];
$cargo= $_GET["cargo"];
$central= $_GET["central"];
$cedula= $_GET["cedula"];
$email= $_GET["email"];
$nombre= $_GET["nombre"];
$apellido= $_GET["apellido"];
$fechaNacimiento= $_GET["fechaNacimiento"];
$telefono= $_GET["telefono"];
$genero= $_GET["genero"];
$id= $_GET["id"];
$nomUser= $_GET["nomUser"];

$sql = "UPDATE usuarios SET Id_Tipo_Usuario='$tipoUsuario',Id_Cargo='$cargo',Id_Central='$central',Id_Genero='$genero',Cedula='$cedula',Email='$email',nombre_usuario='$nomUser',Nombre='$nombre',Apellido='$apellido',Fecha_Nacimiento='$fechaNacimiento',Telefono='$telefono' WHERE Id_Usuario='$id'";
/*
$sql2 = "UPDATE equipos SET Id_Tipo_Equipo='$idTp', Id_Sala='$idSa',Id_Condicion = '$idC',Funcion_Principal= '$fun', Ubicacion ='$ubi', Id_Marca='$marca'  WHERE Id_Equipo='$id'";
*/
$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Usuario Modificado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>