-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 20, 2023 at 09:18 AM
-- Server version: 8.0.32-0ubuntu0.22.04.2
-- PHP Version: 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Computacion_UTM`
--

-- --------------------------------------------------------

--
-- Table structure for table `Alumnos`
--

CREATE TABLE `Alumnos` (
  `matricula` bigint NOT NULL,
  `nombre` text NOT NULL,
  `edad` int NOT NULL DEFAULT '18',
  `sexo` text NOT NULL,
  `grado` int NOT NULL DEFAULT '1',
  `grupo` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'A',
  `materias` text NOT NULL,
  `P1` decimal(10,0) NOT NULL,
  `P2` decimal(10,0) NOT NULL,
  `P3` decimal(10,0) NOT NULL,
  `Ordinario` decimal(10,0) NOT NULL,
  `promedio` decimal(10,0) NOT NULL,
  `hora_disp` text NOT NULL,
  `aula` text NOT NULL,
  `prof_tutor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Alumnos`
--

INSERT INTO `Alumnos` (`matricula`, `nombre`, `edad`, `sexo`, `grado`, `grupo`, `materias`, `P1`, `P2`, `P3`, `Ordinario`, `promedio`, `hora_disp`, `aula`, `prof_tutor`) VALUES
(1, 'Omar Cruz', 25, 'masculino', 6, 'A', 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos', '9', '0', '0', '0', '2', '4:00pm-5:00pm', 'Computación 2, Aula 4, Aula 41, Computación 7, Aula 8', 'Erik Ramos'),
(2, 'Jesús Said', 21, 'masculino', 6, 'A', 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos, Ecuaciones Diferenciales', '8', '0', '0', '0', '1', '4:00pm-5:00pm', 'Aula 9, Computación 2, Computación 2, Aula 10, Aula 7, Aula 13', 'Gerardo Cruz'),
(3, 'Maribel Martínez', 21, 'femenino', 6, 'A', 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos', '10', '0', '0', '0', '2', '10:00am-12:00pm-4:00pm-5:00pm', 'Computación 2, Aula 4, Aula 41, Computación 7, Aula 8', 'Erik Ramos'),
(4, 'Arturo Vázquez', 21, 'masculino', 6, 'A', 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos', '0', '0', '0', '0', '0', '4:00pm-5:00pm', 'Computación 2, Aula 4, Aula 41, Computación 7, Aula 8', 'Gerardo Cruz'),
(5, 'Esmeralda Avendaño', 21, 'femenino', 6, 'A', 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos', '0', '0', '0', '0', '0', '4:00pm-5:00pm', 'Computación 2, Aula 4, Aula 41, Computación 7, Aula 8', 'Erik Ramos'),
(6, 'Karla Yereni', 22, 'femenino', 6, 'A', 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos, Ecuaciones Diferenciales', '0', '0', '0', '0', '0', '4:00pm-5:00pm', 'Computación 2, Aula 4, Aula 41, Computación 7, Aula 8, Aula 13', 'Gerardo Cruz');

--
-- Triggers `Alumnos`
--
DELIMITER $$
CREATE TRIGGER `actualizar_promedio_alumno` BEFORE UPDATE ON `Alumnos` FOR EACH ROW SET NEW.promedio = (NEW.P1 + NEW.P2 + NEW.P3)/6 + (NEW.Ordinario)/2
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `actualizar_promedio_alumno2` BEFORE INSERT ON `Alumnos` FOR EACH ROW SET NEW.promedio = (NEW.P1 + NEW.P2 + NEW.P3)/6 + (NEW.Ordinario)/2
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `de_tu` AFTER DELETE ON `Alumnos` FOR EACH ROW DELETE FROM Tutoria
    WHERE id_al = OLD.matricula
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `in_tu` AFTER INSERT ON `Alumnos` FOR EACH ROW INSERT INTO Tutoria (id_al, nombre_alumno, nombre_prof)
    VALUES (NEW.matricula, NEW.nombre, NEW.prof_tutor)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tg_alumnos_delete` AFTER DELETE ON `Alumnos` FOR EACH ROW BEGIN
    DELETE FROM Horario_Alumno WHERE id_alumno = OLD.matricula;
    DELETE FROM Tutorados WHERE id_alu = OLD.matricula;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tg_alumnos_insert` AFTER INSERT ON `Alumnos` FOR EACH ROW BEGIN
    INSERT INTO Horario_Alumno (id_alumno, semestre, materia, hora, salon)
    VALUES (NEW.matricula, NEW.grado, NEW.materias, NEW.hora_disp, NEW.aula);
    
    INSERT INTO Tutorados (id_alu, nombre_alumno, tutor)
    VALUES (NEW.matricula, NEW.nombre, NEW.prof_tutor);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tg_alumnos_update` AFTER UPDATE ON `Alumnos` FOR EACH ROW BEGIN
    UPDATE Horario_Alumno
    SET semestre = NEW.grado,
        materia = NEW.materias,
        hora = NEW.hora_disp,
        salon = NEW.aula
    WHERE id_alumno = NEW.matricula;
    
    UPDATE Tutorados
    SET nombre_alumno = NEW.nombre,
        tutor = NEW.prof_tutor
    WHERE id_alu = NEW.matricula;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `up_tu` AFTER UPDATE ON `Alumnos` FOR EACH ROW UPDATE Tutoria
    SET nombre_alumno = NEW.nombre, nombre_prof = NEW.prof_tutor
    WHERE id_al = OLD.matricula
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Horario_Alumno`
--

CREATE TABLE `Horario_Alumno` (
  `id_alumno` bigint NOT NULL,
  `semestre` int NOT NULL,
  `materia` text NOT NULL,
  `hora` text NOT NULL,
  `salon` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Horario_Alumno`
--

INSERT INTO `Horario_Alumno` (`id_alumno`, `semestre`, `materia`, `hora`, `salon`) VALUES
(1, 6, 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos', '4:00pm-5:00pm', 'Computación 2, Aula 4, Aula 41, Computación 7, Aula 8'),
(2, 6, 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos, Ecuaciones Diferenciales', '4:00pm-5:00pm', 'Aula 9, Computación 2, Computación 2, Aula 10, Aula 7, Aula 13'),
(3, 6, 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos', '10:00am-12:00pm-4:00pm-5:00pm', 'Computación 2, Aula 4, Aula 41, Computación 7, Aula 8'),
(4, 6, 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos', '4:00pm-5:00pm', 'Computación 2, Aula 4, Aula 41, Computación 7, Aula 8'),
(5, 6, 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos', '4:00pm-5:00pm', 'Computación 2, Aula 4, Aula 41, Computación 7, Aula 8'),
(6, 6, 'Programación Web II, Desarrollo de Software Orientado a Objetos, Redes I, Sistemas Operativos, Sistemas Embebidos, Ecuaciones Diferenciales', '4:00pm-5:00pm', 'Computación 2, Aula 4, Aula 41, Computación 7, Aula 8, Aula 13');

-- --------------------------------------------------------

--
-- Table structure for table `Horario_Profesor`
--

CREATE TABLE `Horario_Profesor` (
  `id_profesor` bigint NOT NULL,
  `nombre_profesor` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `grado_` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `num_salon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `hora_` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Horario_Profesor`
--

INSERT INTO `Horario_Profesor` (`id_profesor`, `nombre_profesor`, `grado_`, `num_salon`, `hora_`) VALUES
(1, 'Alejandro López', '2', 'Computación 2, Aula 41', '8:00am-9:00am y 11:00am-12:00pm'),
(2, 'Erik Ramos', '6', 'Computación 2', '9:00am-10:00am'),
(3, 'Gerardo Cruz', '6', 'Computación 7', '5:00pm-6:00pm'),
(4, 'Mónica García', '8', 'Computación 1', '6:00pm-7:00pm'),
(23, 'Christian Millan', NULL, NULL, NULL),
(24, 'Hugo God', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Profesores`
--

CREATE TABLE `Profesores` (
  `id` bigint NOT NULL,
  `nombre` text NOT NULL,
  `edad` int NOT NULL,
  `sexo` text NOT NULL,
  `materias_impartidas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `correo` text NOT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `tipo` int NOT NULL,
  `Grado` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Salon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Hora` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `horario_tutoria` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Profesores`
--

INSERT INTO `Profesores` (`id`, `nombre`, `edad`, `sexo`, `materias_impartidas`, `correo`, `password`, `tipo`, `Grado`, `Salon`, `Hora`, `horario_tutoria`) VALUES
(1, 'Alejandro López', 45, 'masculino', 'POO', 'jefazo@gs.utm.mx', '$2a$10$qx2c6f6R9.C.EGhAZ2sB2ehOBF6Zd1QcRC8WTkYIAe4o39uxgcam.', 1, '2', 'Computación 2, Aula 41', '8:00am-9:00am y 11:00am-12:00pm', '4:00pm-7:00pm'),
(2, 'Erik Ramos', 45, 'masculino', 'Programación Web II', 'erikue@gs.utm.mx', '$2a$10$I839Gf1boae/O64ZAcBEUORk8Tf0TJBm8ndIq6ILKXywA9rSZB4fm', 2, '6', 'Computación 2', '9:00am-10:00am', '4:00pm-7:00pm'),
(3, 'Gerardo Cruz', 50, 'masculino', 'Sistemas Operativos', 'gerardito@gs.utm.mx', '$2a$10$Yz.OXQa2uHq0C7GoNwhIHuKoQA5WDhbr/UVOYjyH6SnniNWT5xq3K', 2, '6', 'Computación 7', '5:00pm-6:00pm', '6:00pm-7:00pm'),
(4, 'Mónica García', 40, 'femenino', 'Sistema de cómputo paralelo y distribuido', 'monica@gs.utm.mx', '$2a$10$HTb6RNH/9FLYFHA3ibuvQelnj85IYCb5HgDSJ6IcbVqGi/OLL3AZq', 2, '8', 'Computación 1', '6:00pm-7:00pm', '4:00pm-6:00pm'),
(23, 'Christian Millan', 45, 'masculino', NULL, 'millan@gs.utm.mx', '$2a$10$4bQGlEvIsKAtw8zdIBO2h.Yv2.sXhojRnkTFMh07b8O4HIQ1jlu3W', 2, NULL, NULL, NULL, '4:00pm-7:00pm'),
(24, 'Hugo God', 50, 'masculino', NULL, 'hugod@gs.utm.mx', '$2a$10$4bQGlEvIsKAtw8zdIBO2h.IhxgiLN8FZ5g6PGRivRrDl/WK9lbMV.', 2, NULL, NULL, NULL, '4:00pm-7:00pm');

--
-- Triggers `Profesores`
--
DELIMITER $$
CREATE TRIGGER `de` AFTER DELETE ON `Profesores` FOR EACH ROW DELETE FROM Horario_Profesor WHERE id_profesor = OLD.id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `de2` AFTER DELETE ON `Profesores` FOR EACH ROW DELETE FROM Tutores WHERE id_prof = OLD.id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `in` AFTER INSERT ON `Profesores` FOR EACH ROW INSERT INTO Horario_Profesor (id_profesor, nombre_profesor, grado_, num_salon, hora_)
    VALUES (NEW.id, NEW.nombre, NEW.Grado, NEW.Salon, NEW.Hora)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `in2` AFTER INSERT ON `Profesores` FOR EACH ROW INSERT INTO Tutores (id_prof, nombre_profesor, horario_asesoria)
    VALUES (NEW.id, NEW.nombre, NEW.horario_tutoria)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `up` AFTER UPDATE ON `Profesores` FOR EACH ROW UPDATE Horario_Profesor SET nombre_profesor = NEW.nombre, grado_ = NEW.Grado, num_salon = NEW.Salon, hora_ = NEW.Hora
    WHERE id_profesor = OLD.id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `up2` AFTER UPDATE ON `Profesores` FOR EACH ROW UPDATE Tutores SET nombre_profesor = NEW.nombre, horario_asesoria = NEW.horario_tutoria
    WHERE id_prof = OLD.id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Tutorados`
--

CREATE TABLE `Tutorados` (
  `id_alu` bigint NOT NULL,
  `nombre_alumno` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tutor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Tutorados`
--

INSERT INTO `Tutorados` (`id_alu`, `nombre_alumno`, `tutor`) VALUES
(1, 'Omar Cruz', 'Erik Ramos'),
(2, 'Jesús Said', 'Gerardo Cruz'),
(3, 'Maribel Martínez', 'Erik Ramos'),
(4, 'Arturo Vázquez', 'Gerardo Cruz'),
(5, 'Esmeralda Avendaño', 'Erik Ramos'),
(6, 'Karla Yereni', 'Gerardo Cruz');

-- --------------------------------------------------------

--
-- Table structure for table `Tutores`
--

CREATE TABLE `Tutores` (
  `id_prof` bigint NOT NULL,
  `nombre_profesor` text NOT NULL,
  `horario_asesoria` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Tutores`
--

INSERT INTO `Tutores` (`id_prof`, `nombre_profesor`, `horario_asesoria`) VALUES
(1, 'Alejandro López', '4:00pm-7:00pm'),
(2, 'Erik Ramos', '4:00pm-7:00pm'),
(3, 'Gerardo Cruz', '6:00pm-7:00pm'),
(4, 'Mónica García', '4:00pm-6:00pm'),
(23, 'Christian Millan', '4:00pm-7:00pm'),
(24, 'Hugo God', '4:00pm-7:00pm');

-- --------------------------------------------------------

--
-- Table structure for table `Tutoria`
--

CREATE TABLE `Tutoria` (
  `id_al` bigint NOT NULL,
  `nombre_prof` text NOT NULL,
  `nombre_alumno` text NOT NULL,
  `hora_tutoria` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `fecha` text,
  `comentarios` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Tutoria`
--

INSERT INTO `Tutoria` (`id_al`, `nombre_prof`, `nombre_alumno`, `hora_tutoria`, `fecha`, `comentarios`) VALUES
(1, 'Erik Ramos', 'Omar Cruz', '12:00pm-1:00pm', '27/10/2022', 'No nos enseñaron bien bases de datos'),
(2, 'Gerardo Cruz', 'Jesús Said', '12:00pm-1:00pm', '27/10/2022', 'No sé Bases de Datos'),
(3, 'Erik Ramos', 'Maribel Martínez', NULL, NULL, NULL),
(4, 'Gerardo Cruz', 'Arturo Vázquez', NULL, NULL, NULL),
(5, 'Erik Ramos', 'Esmeralda Avendaño', NULL, NULL, NULL),
(6, 'Gerardo Cruz', 'Karla Yereni', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Alumnos`
--
ALTER TABLE `Alumnos`
  ADD PRIMARY KEY (`matricula`);

--
-- Indexes for table `Horario_Alumno`
--
ALTER TABLE `Horario_Alumno`
  ADD PRIMARY KEY (`id_alumno`);

--
-- Indexes for table `Horario_Profesor`
--
ALTER TABLE `Horario_Profesor`
  ADD PRIMARY KEY (`id_profesor`);

--
-- Indexes for table `Profesores`
--
ALTER TABLE `Profesores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Tutorados`
--
ALTER TABLE `Tutorados`
  ADD PRIMARY KEY (`id_alu`);

--
-- Indexes for table `Tutores`
--
ALTER TABLE `Tutores`
  ADD PRIMARY KEY (`id_prof`);

--
-- Indexes for table `Tutoria`
--
ALTER TABLE `Tutoria`
  ADD PRIMARY KEY (`id_al`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Alumnos`
--
ALTER TABLE `Alumnos`
  MODIFY `matricula` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2018140136;

--
-- AUTO_INCREMENT for table `Horario_Alumno`
--
ALTER TABLE `Horario_Alumno`
  MODIFY `id_alumno` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2018140136;

--
-- AUTO_INCREMENT for table `Horario_Profesor`
--
ALTER TABLE `Horario_Profesor`
  MODIFY `id_profesor` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Profesores`
--
ALTER TABLE `Profesores`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Tutorados`
--
ALTER TABLE `Tutorados`
  MODIFY `id_alu` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `Tutores`
--
ALTER TABLE `Tutores`
  MODIFY `id_prof` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Tutoria`
--
ALTER TABLE `Tutoria`
  MODIFY `id_al` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Horario_Alumno`
--
ALTER TABLE `Horario_Alumno`
  ADD CONSTRAINT `id_alu` FOREIGN KEY (`id_alumno`) REFERENCES `Alumnos` (`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Tutoria`
--
ALTER TABLE `Tutoria`
  ADD CONSTRAINT `alumno_` FOREIGN KEY (`id_al`) REFERENCES `Alumnos` (`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
