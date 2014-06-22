-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 22-06-2014 a las 13:07:55
-- Versión del servidor: 5.5.24
-- Versión de PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `cantv`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `centrales`
--

INSERT INTO `centrales` (`Id_Central`, `Nombre`, `Direccion`, `Latitud`, `Longitud`) VALUES
(1, 'CANTV la Quizanda', 'Avenida Prolongación Michelena Valencia', '10.174869', '-67.962385'),
(2, 'CANTV Moron', 'Moron, Edo Carabobo', '10.486686', '-68.203542'),
(3, 'CANTV la Esmeralda', 'Avenida Circunvalación Sur San Diego 2006', '10.228779', '-67.969900');

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
