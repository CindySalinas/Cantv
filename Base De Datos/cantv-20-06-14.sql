-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 20-06-2014 a las 21:10:41
-- Versión del servidor: 5.6.12-log
-- Versión de PHP: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `cantv`
--
CREATE DATABASE IF NOT EXISTS `cantv` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci;
USE `cantv`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE IF NOT EXISTS `actividades` (
  `Id_Actividad` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Usuario` int(11) NOT NULL,
  `Actividad` varchar(140) COLLATE utf8_spanish2_ci NOT NULL,
  `Fecha` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `Hora` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Actividad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE IF NOT EXISTS `cargos` (
  `Id_Cargo` int(11) NOT NULL AUTO_INCREMENT,
  `Cargo` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Cargo`),
  UNIQUE KEY `Cargo` (`Cargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centrales`
--

CREATE TABLE IF NOT EXISTS `centrales` (
  `Id_Central` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(70) COLLATE utf8_spanish2_ci NOT NULL,
  `Direccion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `Latitud` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `Longitud` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Central`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `Id_Cliente` int(11) NOT NULL AUTO_INCREMENT,
  `Cliente` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Cliente`),
  UNIQUE KEY `Cliente` (`Cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `condicion`
--

CREATE TABLE IF NOT EXISTS `condicion` (
  `Id_Condicion` int(11) NOT NULL AUTO_INCREMENT,
  `Condicion` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Condicion`),
  UNIQUE KEY `Condicion` (`Condicion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enlaces`
--

CREATE TABLE IF NOT EXISTS `enlaces` (
  `Id_Enlace` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Equipo` int(11) NOT NULL,
  `Id_Ruta` int(11) NOT NULL,
  `Id_Cliente` int(11) NOT NULL,
  `Numero_Enlace` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Enlace`),
  UNIQUE KEY `Id_Equipo` (`Id_Equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE IF NOT EXISTS `equipos` (
  `Id_Equipo` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Sala` int(11) NOT NULL,
  `Id_Tipo_Equipo` int(11) NOT NULL,
  `Id_Condicion` int(11) NOT NULL,
  `Funcion_Principal` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `Ubicacion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE IF NOT EXISTS `estados` (
  `Id_Estado` int(11) NOT NULL AUTO_INCREMENT,
  `Estado` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estatus`
--

CREATE TABLE IF NOT EXISTS `estatus` (
  `Id_Estatus` int(11) NOT NULL AUTO_INCREMENT,
  `Estatus` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Estatus`),
  UNIQUE KEY `Estatus` (`Estatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fallas`
--

CREATE TABLE IF NOT EXISTS `fallas` (
  `Id_Falla` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Enlace` int(11) NOT NULL,
  `Id_Usuario_Falla` int(11) NOT NULL,
  `Id_Estatus` int(11) NOT NULL,
  `Descripcion` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `Fecha` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `Hora` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Falla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE IF NOT EXISTS `marca` (
  `Id_Marca` int(11) NOT NULL AUTO_INCREMENT,
  `Marca` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Marca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE IF NOT EXISTS `mensajes` (
  `Id_Mensaje` int(11) NOT NULL AUTO_INCREMENT,
  `Mensaje` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `Emisor` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Receptor` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Fecha` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Hora` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Mensaje`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--

CREATE TABLE IF NOT EXISTS `municipios` (
  `Id_Municipio` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Estado` int(11) NOT NULL,
  `Municipio` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Municipio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observaciones_fallas`
--

CREATE TABLE IF NOT EXISTS `observaciones_fallas` (
  `Id_Observacion_Falla` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Falla` int(11) NOT NULL,
  `Id_Usuario_Observacion` int(11) NOT NULL,
  `Observacion` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `Fecha` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `Hora` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Observacion_Falla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posiciones`
--

CREATE TABLE IF NOT EXISTS `posiciones` (
  `Id_Posicion` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Enlace` int(11) NOT NULL,
  `Posicion` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Posicion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutas`
--

CREATE TABLE IF NOT EXISTS `rutas` (
  `Id_Ruta` int(11) NOT NULL AUTO_INCREMENT,
  `Ruta` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Ruta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE IF NOT EXISTS `salas` (
  `Id_Sala` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Central` int(11) NOT NULL,
  `Nombre` varchar(70) COLLATE utf8_spanish2_ci NOT NULL,
  `Piso` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `Descipcion` varchar(150) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `Imagen` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`Id_Sala`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE IF NOT EXISTS `tareas` (
  `Id_Tarea` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Usuario_Asigna` int(11) NOT NULL,
  `Id_Usuario_Tarea` int(11) NOT NULL,
  `Tarea` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `Fecha` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `Hora` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Tarea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_equipos`
--

CREATE TABLE IF NOT EXISTS `tipo_equipos` (
  `Id_Tipo_Equipo` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Marca` int(11) NOT NULL,
  `Tipo_Equipo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Tipo_Equipo`),
  UNIQUE KEY `Tipo_Equipo` (`Tipo_Equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE IF NOT EXISTS `tipo_usuario` (
  `Id_Tipo_Usuario` int(11) NOT NULL AUTO_INCREMENT,
  `Rol` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Tipo_Usuario`),
  UNIQUE KEY `Rol` (`Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transitos`
--

CREATE TABLE IF NOT EXISTS `transitos` (
  `Id_Transito` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Enlace` int(11) NOT NULL,
  `Transito` varchar(70) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Transito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `Id_Usuario` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Tipo_Usuario` int(11) NOT NULL,
  `Id_Cargo` int(11) NOT NULL,
  `Id_Municipio` int(11) NOT NULL,
  `Email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Password` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `Nombre` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `Apellido` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `Fecha_Nacimiento` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `Telefono` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `Foto_Perfil` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`Id_Usuario`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
