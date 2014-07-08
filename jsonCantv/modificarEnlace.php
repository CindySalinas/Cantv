
<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$id= $_GET["idEnlace"];
$idEq= $_GET["IdEquipo"];
$idCl= $_GET["idCliente"];
$idNum= $_GET["numero"];
$idRut= $_GET["ruta"];

$sql2 = "UPDATE enlaces SET Id_Equipo='$idEq', Id_Cliente='$idCl', Numero_Enlace='$idNum', Ruta='$idRut' WHERE Id_Enlace='$id'";

$result2 = mysql_query($sql2) or die("Error de Consulta". mysql_error());



$estado["mensaje"]= "Enlace Modificado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>