<?php 
// conexion bd 
include("conex.php");
//formato JSON
//header('Content-type: application/json');
$id= $_GET["falla"];

$sql = "SELECT F.Descripcion, F.Fecha, F.Hora, E.Numero_Enlace, E.Ruta, L.Cliente, L.Descripcion, Q.Funcion_Principal, Q.Ubicacion, O.Condicion, M.Marca, T.Tipo_Equipo, S.Nombre, S.Piso, S.Descipcion, C.Nombre, C.Direccion, C.Latitud, C.Longitud, A.Estatus FROM fallas F INNER JOIN enlaces E ON F.Id_Enlace = E.Id_Enlace INNER JOIN clientes L ON E.Id_Cliente = L.Id_Cliente INNER JOIN equipos Q ON E.Id_Equipo = Q.Id_Equipo INNER JOIN condicion O ON Q.Id_Condicion = O.Id_Condicion INNER JOIN marca M ON Q.Id_Marca = M.Id_Marca INNER JOIN tipo_equipos T ON Q.Id_Tipo_Equipo = T.Id_Tipo_Equipo INNER JOIN salas S ON Q.Id_Sala = S.Id_Sala INNER JOIN centrales C ON S.Id_Central = C.Id_Central INNER JOIN estatus A ON F.Id_Estatus = A.Id_Estatus WHERE F.Id_Falla='$id' ORDER BY F.Id_Falla DESC";

$result = mysql_query($sql) or die("Error de Consulta". mysql_error());
$i =0;

$cantidad = mysql_num_rows($result);

while($row = mysql_fetch_row($result)){
	$dat[$i]["descripcionFalla"]= $row[0];
	$dat[$i]["fechaFalla"]= $row[1];
	$dat[$i]["horaFalla"]= $row[2];
	$dat[$i]["numeroEnlace"]= $row[3];
	$dat[$i]["ruta"]= $row[4];
	$dat[$i]["nombreCliente"]= $row[5];
	$dat[$i]["descripcionCliente"]= $row[6];
	$dat[$i]["funcionEquipo"]= $row[7];
	$dat[$i]["ubicacionEquipo"] = $row[8];
	$dat[$i]["condicionEquipo"] = $row[9];
	$dat[$i]["marcaEquipo"] = $row[10];
	$dat[$i]["tipoEquipo"] = $row[11];
	$dat[$i]["nombreSala"] = $row[12];
	$dat[$i]["pisoSala"] = $row[13];
	$dat[$i]["descripcionSala"] = $row[14];
	$dat[$i]["nombreCentral"] = $row[15];
	$dat[$i]["direccionCentral"] = $row[16];
	$dat[$i]["latitudCentral"] = $row[17];
	$dat[$i]["longitudCentral"] = $row[18];
	$dat[$i]["estatusFallas"] = $row[19];
	$i++;	
}

if($cantidad == 0){
	$dat["num"] = 0;
	$dat["mensaje"]= "No Hay Fallas";
}
$datJson = json_encode($dat);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $datJson . ');';
?>