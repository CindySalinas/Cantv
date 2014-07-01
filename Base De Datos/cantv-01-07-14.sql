-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 01-07-2014 a las 23:22:41
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `centrales`
--

INSERT INTO `centrales` (`Id_Central`, `Nombre`, `Direccion`, `Latitud`, `Longitud`) VALUES
(1, 'CANTV la Quizanda', 'Avenida Prolongación Michelena Valencia', '10.174869', '-67.962385'),
(2, 'CANTV Moron', 'Moron, Edo Carabobo', '10.486686', '-68.203542'),
(3, 'CANTV la Esmeralda', 'Avenida Circunvalación Sur San Diego 2006', '10.228779', '-67.969900'),
(4, 'prueba', 'morro 1', '10.34004864389419', '-67.49560553580523'),
(5, 'prueba', 'morro 1', '10.12503333113257', '-67.5908088684082'),
(6, 'prueba', 'morro 1', '10.003677090839949', '-67.91069984436035'),
(7, 'prueba', 'morro 1', '10.465530333075606', '-65.0969123840332');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`Id_Cliente`, `Cliente`, `Descripcion`) VALUES
(1, 'Movilnet', 'Cliente Fi');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `condicion`
--

INSERT INTO `condicion` (`Id_Condicion`, `Condicion`, `Descripcion`) VALUES
(1, 'En Servicio', ''),
(2, 'Fuera De Servicio', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enlaces`
--

CREATE TABLE IF NOT EXISTS `enlaces` (
  `Id_Enlace` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Equipo` int(11) NOT NULL,
  `Id_Cliente` int(11) NOT NULL,
  `Numero_Enlace` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `Ruta` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`Id_Enlace`),
  UNIQUE KEY `Numero_Enlace` (`Numero_Enlace`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=36 ;

--
-- Volcado de datos para la tabla `enlaces`
--

INSERT INTO `enlaces` (`Id_Enlace`, `Id_Equipo`, `Id_Cliente`, `Numero_Enlace`, `Ruta`) VALUES
(34, 1, 1, '22', 'df'),
(35, 1, 1, '6576778', 'gfh');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`Id_Equipo`, `Id_Sala`, `Id_Tipo_Equipo`, `Id_Condicion`, `Funcion_Principal`, `Ubicacion`) VALUES
(1, 1, 1, 1, 'Proveer servicios', 'Fila Nro 1');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`Id_Marca`, `Marca`, `Descripcion`) VALUES
(1, 'Huawei', ''),
(2, 'Ericcson', '');

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
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`Id_Posicion`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=15 ;

--
-- Volcado de datos para la tabla `posiciones`
--

INSERT INTO `posiciones` (`Id_Posicion`, `Id_Enlace`, `Posicion`, `Descripcion`) VALUES
(12, 34, 'q2', NULL),
(13, 34, '4', NULL),
(14, 34, '3', NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`Id_Sala`, `Id_Central`, `Nombre`, `Piso`, `Descipcion`, `Imagen`) VALUES
(1, 3, 'sala 1', '3', 'asd', NULL),
(2, 3, 'Sala 2', 'Piso 3', 'Salasss', NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `tipo_equipos`
--

INSERT INTO `tipo_equipos` (`Id_Tipo_Equipo`, `Id_Marca`, `Tipo_Equipo`, `Descripcion`) VALUES
(1, 1, 'ODF', ''),
(2, 2, 'DDF', '');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`Id_Tipo_Usuario`, `Rol`, `Descripcion`) VALUES
(1, 'Administrador', ''),
(2, 'Tecnico', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transitos`
--

CREATE TABLE IF NOT EXISTS `transitos` (
  `Id_Transito` int(11) NOT NULL AUTO_INCREMENT,
  `Id_Enlace` int(11) NOT NULL,
  `Transito` varchar(70) COLLATE utf8_spanish2_ci NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`Id_Transito`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `transitos`
--

INSERT INTO `transitos` (`Id_Transito`, `Id_Enlace`, `Transito`, `Descripcion`) VALUES
(1, 34, '2', NULL),
(2, 34, 'e', NULL),
(3, 34, '3', NULL);

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
  `nombre_usuario` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `Password` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `Nombre` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `Apellido` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `Fecha_Nacimiento` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `Telefono` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `Foto_Perfil` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`Id_Usuario`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id_Usuario`, `Id_Tipo_Usuario`, `Id_Cargo`, `Id_Municipio`, `Email`, `nombre_usuario`, `Password`, `Nombre`, `Apellido`, `Fecha_Nacimiento`, `Telefono`, `Foto_Perfil`) VALUES
(1, 1, 1, 1, 'abrantemanuel@gmail.com', 'manuelAbrante', '22224963', 'Manuel Alejandro', 'Abrante Talavera', '11/03/1993', '04244210770', 'Img/fotoPerfil/m1.png'),
(2, 1, 1, 2, 'cindysalinas15@gmail.com', 'cindySalinas', '21029953', 'Cindy Yarimar', 'Salinas Zambrano', '14/02/1993', '04263431078', 'Img/fotoPerfil/c1.png');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
