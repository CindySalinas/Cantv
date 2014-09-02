<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');

$sql = "SELECT E.Id_Equipo,E.Id_Sala,E.Id_Tipo_Equipo,T.Tipo_Equipo,E.ID_Marca,M.Marca,E.Id_Condicion,C.Condicion,E.Funcion_Principal,E.Ubicacion FROM equipos E INNER JOIN tipo_equipos T ON E.Id_Tipo_Equipo = T.Id_Tipo_Equipo INNER JOIN  marca M ON E.Id_Marca = M.Id_Marca INNER JOIN condicion C ON E.Id_Condicion = C.Id_Condicion ";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["idEquipo"]= $row[0];
	$dat[$i]["idSala"]= $row[1];
	$dat[$i]["idTipoE"]= $row[2];
	$dat[$i]["tipoEquipo"]= $row[3];
	$dat[$i]["idMarca"]= $row[4];
	$dat[$i]["marca"]= $row[5];
	$dat[$i]["idCond"]= $row[6];
	$dat[$i]["condi"]= $row[7];
	$dat[$i]["func"]= $row[8];
	$dat[$i]["ubic"]= $row[9];

	$i++;	
}
if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Hay Equipos";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>