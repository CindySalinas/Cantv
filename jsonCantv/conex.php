<?php

//Conexión a base de datos
$server = "127.0.0.1";
$username = "root";
$password = "";
$database = "cantv";
$con = mysql_connect($server, $username, $password) or die ("Error al conectar: " . mysql_error());
mysql_query("SET NAMES 'utf8'");
mysql_select_db($database, $con);
?>