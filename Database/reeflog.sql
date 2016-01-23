-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2015 at 02:58 AM
-- Server version: 10.1.8-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reeflog`
--

-- --------------------------------------------------------

--
-- Table structure for table `coral`
--

CREATE TABLE `coral` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `venomous` tinyint(4) NOT NULL,
  `rarity` tinyint(4) NOT NULL,
  `habitat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coral`
--

INSERT INTO `coral` (`id`, `name`, `venomous`, `rarity`, `habitat`) VALUES
(1, 'Brain Coral', 0, 2, 'Hersenkoraal is een naam voor bolvormige kolonies van steenkoralen. Zij ontlenen hun naam aan de kanalen in het oppervlak van de koraalkolonies, die veel weg hebben van de groeven en windingen van de menselijke hersenen, of een labyrint'),
(2, 'Yellow Frogspawn', 0, 8, 'Is geel en dingen en zeldzaam en ja.'),
(3, 'Fire Coral', 1, 4, 'All Fire corals are calcareous hydrozoans and belong to the genus, Millepora.'),
(4, 'Boulder star coral', 0, 3, 'Inhabit most reef environments and the species is often the predominant coral between 7 and 25 m. The flattened plates are most common at deeper reefs, down to 50 m.'),
(5, 'Wire Coral', 0, 7, 'Inhabit a wide range of deep water environments, but is most common along vertical rocky faces, growing horizontally outward, at least to 120 m depth.');

-- --------------------------------------------------------

--
-- Table structure for table `entry`
--

CREATE TABLE `entry` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `coralId` int(11) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `description` varchar(1000) NOT NULL,
  `year` smallint(4) NOT NULL,
  `month` tinyint(2) NOT NULL,
  `day` tinyint(2) NOT NULL,
  `time` time NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `avatarThumbnail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `entry`
--

INSERT INTO `entry` (`id`, `userId`, `coralId`, `lat`, `lng`, `description`, `year`, `month`, `day`, `time`, `avatar`, `avatarThumbnail`) VALUES
(1, 3, 3, 31.592, 29.4078, 'Vuurkoraal! super cool. mooie kleuren. #duikersleven', 2014, 4, 22, '09:30:07', 'http://puu.sh/lMO1C/cb0c87d03a.jpg', ''),
(2, 2, 4, 31.8257, 31.5611, 'uuuhh eigenlijk weet ik niet wat voor koraal het is maar oke. Zier er wel cool uit. #cool', 2014, 4, 25, '11:26:00', 'http://puu.sh/lMNZo/4ad2479d99.jpg', ''),
(3, 2, 5, -15.7997, 149.735, 'draadjes. super vreemd. #draadjes', 2014, 5, 27, '13:30:26', 'http://puu.sh/lMNFd/c23e74ae4e.jpg', ''),
(4, 3, 4, 31.8257, 31.5611, 'nog meer van dit koraal. #vuur', 2014, 6, 10, '11:29:29', 'http://puu.sh/lMNZo/4ad2479d99.jpg', ''),
(5, 3, 3, 17.9431, -78.1198, 'Vuurkoraal is super cool!', 2014, 6, 12, '08:47:49', 'http://puu.sh/lMO4g/991cfd4007.jpg', ''),
(6, 2, 3, 17.9431, -78.1198, 'cool man bosjes takken enzo', 2014, 7, 14, '09:28:33', 'http://puu.sh/lMO4g/991cfd4007.jpg', ''),
(7, 2, 3, 31.592, 29.4078, '#que wat is dit maar wel cool', 2014, 8, 26, '11:29:26', 'http://puu.sh/lMO1C/cb0c87d03a.jpg', ''),
(8, 1, 4, 101.373, 10.3825, 'koraal enzo! #duikavonturen', 2014, 12, 25, '19:37:21', 'http://puu.sh/lMLD1/7723b52f13.jpg', ''),
(9, 3, 5, -21.7463, 149.647, 'blij met draadjes #draadjesleven', 2015, 2, 20, '16:30:27', 'http://puu.sh/lMNFd/c23e74ae4e.jpg', ''),
(10, 2, 1, 9.06197, -76.796, '#hersenenonderwater jaja', 2015, 3, 7, '13:27:26', 'http://puu.sh/lMOa3/0812df837a.jpg', ''),
(11, 1, 5, 114.887, -8.07411, 'Club van Draadje #draadjesclub', 2015, 3, 8, '13:28:22', 'http://puu.sh/lMLHw/7e8d1975ac.jpg', ''),
(12, 3, 2, 11.4765, -71.1358, 'Super gele dingen. lijkt wel giftig.', 2015, 3, 26, '11:00:00', 'http://puu.sh/lMOcW/cbfb80e67b.jpg', ''),
(13, 2, 2, 11.4765, -71.1358, 'kaas is baas!', 2015, 3, 31, '12:36:33', 'http://puu.sh/lMOcW/cbfb80e67b.jpg', ''),
(14, 1, 1, 13.2339, -74.9076, 'BREEEIIIINNNNNNNN mon nom nom zombies.', 2015, 4, 6, '13:27:00', 'http://puu.sh/lMLuz/c0c14106d3.jpg', ''),
(15, 3, 1, 9.06197, -76.796, 'super vet #hersenkoraal', 2015, 4, 8, '06:36:00', 'http://puu.sh/lMOa3/0812df837a.jpg', ''),
(16, 2, 4, -24.7938, 152.701, 'super cool koraal denk ik', 2015, 5, 1, '07:28:24', 'http://puu.sh/lMNPn/136a23bab1.jpg', ''),
(17, 2, 1, -4.11825, 106.553, 'visjes die dit eten zijn zombies #zombievissen', 2015, 5, 6, '09:27:26', 'http://puu.sh/lMNU9/57d6708653.jpg', ''),
(18, 3, 2, 14.2055, -74.527, 'geeel geeeel geeeeeeeeeeeeeeeeeeeeel #koraal', 2015, 5, 28, '15:30:26', 'http://puu.sh/lMOdo/f1f4e0e18a.jpg', ''),
(19, 3, 5, -15.7997, 149.735, 'Ik krijg trek in draadjes vlees. beetje vreemd. #draadjes', 2015, 5, 29, '07:26:27', 'http://puu.sh/lMNFd/c23e74ae4e.jpg', ''),
(20, 1, 2, 147.208, -18.6556, 'geel koraal man man man man.', 2015, 6, 1, '10:23:00', 'http://puu.sh/lMLkX/eb719a9863.jpg', ''),
(21, 2, 5, -21.7463, 149.647, 'Draadjes enzo.', 2015, 6, 3, '08:25:37', 'http://puu.sh/lMNFd/c23e74ae4e.jpg', ''),
(22, 1, 5, 105.321, -6.4545, 'draadjes overal draadjes.', 2015, 9, 20, '08:34:46', 'http://puu.sh/lMLH2/c9ae29ff26.jpg', ''),
(23, 2, 2, 14.2055, -74.527, 'GEEEL GEEEL GEEEEEEEEL #geel', 2015, 6, 30, '07:32:23', 'http://puu.sh/lMOdo/f1f4e0e18a.jpg', ''),
(24, 1, 4, 114.87, -8.57551, 'ja jaja dit ziet er best wel apart uit.', 2015, 9, 20, '08:35:39', 'http://puu.sh/lMLER/908d07417b.jpg', ''),
(25, 3, 4, -24.7938, 152.701, '#boulderstar', 2015, 7, 28, '11:00:35', 'http://puu.sh/lMNPn/136a23bab1.jpg', ''),
(26, 1, 3, 144.006, -14.1422, 'brand braaaaaand braaaaaand #vuuronderwater', 2015, 8, 7, '14:21:00', 'http://puu.sh/lMLC5/177daa9009.jpg', ''),
(27, 1, 3, 148.266, -19.4182, 'VUUUUUUR VUUUUUUUUUUUURRRRRR', 2015, 9, 20, '11:36:00', 'http://puu.sh/lMLBJ/d7e04b0fe3.jpg', ''),
(28, 1, 2, 147.032, -18.2342, 'fucking vaag koraal is dit.', 2015, 9, 20, '13:15:00', 'http://puu.sh/lMLof/36ef1af152.jpg', ''),
(29, 3, 1, -4.11825, 106.553, 'nom nom nom krijg er honger van.', 2015, 9, 28, '15:24:25', 'http://puu.sh/lMNU9/57d6708653.jpg', ''),
(30, 1, 1, 13.2675, -74.1016, 'Hersenen! oke dan lekker dan onderwater. #hersenen', 2015, 11, 16, '16:23:00', 'http://puu.sh/lMLyr/266ee389b1.jpg', '');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` tinyint(4) NOT NULL,
  `userId` tinyint(4) NOT NULL,
  `scheme` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `userId`, `scheme`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `avatar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `password`, `email`, `avatar`) VALUES
(1, 'Potion', 'Seller', 'test', 'potionseller@test.nl', 'http://puu.sh/lPewK/55b0c4d235.jpg'),
(2, 'Bert', 'van Dale', 'test', 'bertvandale@test.nl', 'http://puu.sh/lscUm/a754b7ef35.jpg'),
(3, 'Niek', 'Smolders', 'test', 'nieksmolders@test.nl', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/005/062/3a0/214d29e.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coral`
--
ALTER TABLE `coral`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `entry`
--
ALTER TABLE `entry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coral`
--
ALTER TABLE `coral`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `entry`
--
ALTER TABLE `entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
