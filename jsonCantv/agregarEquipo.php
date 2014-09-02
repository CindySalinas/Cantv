<?php
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$idSala= $_GET["idSala"];
$idTipoE = $_GET["tipoE"];
$idCon = $_GET["condicc"];
$funcP = $_GET["fun"];
$ubi = $_GET["Ubicc"];
$marca = $_GET["marcaE"];
$verNuevoTipo = $_GET["nuevoTipo"];
$verNuevaMarca = $_GET["nuevaMarca"];

$tipoDefinitiva;
$marcaDefinitiva;

if($verNuevoTipo==1)
{
	$sqlNewTipo = "INSERT INTO tipo_equipos (Tipo_Equipo) VALUES ('$idTipoE')";
	
	$result2 = mysql_query($sqlNewTipo) or die("Error de Consulta". mysql_error());
	
	$tipoDefinitiva = mysql_insert_id();
}
else
{
	$tipoDefinitiva=$idTipoE;
}

if($verNuevaMarca==1)
{
	$sqlNewMarca = "INSERT INTO marca (Marca) VALUES ('$marca')";
	
	$result3 = mysql_query($sqlNewMarca) or die("Error de Consulta". mysql_error());

	$marcaDefinitiva = mysql_insert_id();
}
else
{
	$marcaDefinitiva=$marca;
}

$sql = "INSERT INTO equipos (Id_Sala, Id_Tipo_Equipo, Id_Marca, Id_Condicion, Funcion_Principal, Ubicacion) VALUES ('$idSala','$tipoDefinitiva','$marcaDefinitiva','$idCon','$funcP','$ubi')";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());


$estado["mensaje"]= "Nueva Equipo Agregado";
//Convertir los resultados a formato json
$estadoJson = json_encode($estado);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $estadoJson . ');';
?>