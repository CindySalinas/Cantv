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
$foto= $_GET["foto"];

$sql = "INSERT INTO usuarios (Id_Tipo_Usuario,Id_Cargo,Id_Central,Id_Genero,Cedula,Email,nombre_usuario,Password,Nombre,Apellido,Fecha_Nacimiento,Telefono,Foto_Perfil) VALUES ('$tipoUsuario','$cargo','$central','$genero','$cedula','$email','$cedula','$cedula','$nombre','$apellido','$fechaNacimiento','$telefono','$foto')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nuevo Usuario Agregado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>