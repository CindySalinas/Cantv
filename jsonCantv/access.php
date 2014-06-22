<?php 
include("conex.php");
header('Content-type: application/json');


$user = $_GET["usr"];
$pass = $_GET["pwd"];

$sql = "SELECT nombre_usuario,Password,Id_Tipo_Usuario FROM usuarios where nombre_usuario ='$user' and Password='$pass'";
$result = mysql_query($sql) or die ("Query error: " . mysql_error());

$cantidad=0;

while($row = mysql_fetch_row($result)) {
	$cantidad++;
	$nom = $row[0];
	$resultados["T"] = $row[2];
}
$resultados["validacion"] = $cantidad;

if($cantidad>0 && $resultados["T"] == 1){
	setcookie("adminSis",$nom,time()+36000,"/");
	$resultados["mensaje"] = "Bienvenido Admin $nom";
}
else
if($cantidad>0 && $resultados["T"] == 2 ){
	setcookie("tecSis",$nom,time()+36000,"/");
	$resultados["mensaje"] = "Bienvenido Tecnico $nom";
}
else{
	$resultados["mensaje"] = "Usuario o Password Incorrectos";
}
/*Convierte los resultados a formato json*/
$resultadosJson = json_encode($resultados);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';

?>


