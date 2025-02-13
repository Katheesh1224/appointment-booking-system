-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2025 at 10:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appointment_booking_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `reason` text NOT NULL,
  `contact_no` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `user_id`, `date`, `time`, `reason`, `contact_no`) VALUES
(1, 1, '2025-02-14', '12:00:00', 'Assessment Submission', '0779781737'),
(2, 1, '2025-02-15', '09:00:00', 'HR meeting', '0779781737'),
(5, 1, '2025-02-11', '15:00:00', 'HR meeting', '0779781737'),
(12, 1, '2025-02-18', '15:00:00', 'Interview', '0779781737'),
(13, 1, '2025-02-13', '16:00:00', 'Project review', '0778945612'),
(14, 1, '2025-02-13', '09:00:00', 'HR meeting', '0778945612'),
(17, 11, '2025-02-14', '16:00:00', 'Assessment Submission', '0779462879'),
(18, 1, '2025-02-17', '11:00:00', 'Project review', '0778138815'),
(19, 11, '2025-02-16', '13:00:00', 'CEO meeting', '0779462879'),
(20, 11, '2025-02-18', '10:00:00', 'Project discusses', '0774236521'),
(21, 1, '2025-02-20', '13:00:00', 'Project review', '0779781737'),
(22, 11, '2025-02-21', '16:00:00', 'Project review', '0779781786'),
(23, 11, '2025-02-20', '12:00:00', 'HR meeting', '0774235176'),
(24, 11, '2025-02-20', '12:00:00', 'HR meeting', '0774235176'),
(27, 18, '2025-02-16', '15:00:00', 'Project Submission', '0775248124'),
(28, 18, '2025-02-19', '09:00:00', 'CEO meeting', '0773245876'),
(30, 18, '2025-02-19', '16:00:00', 'Project review', '0778452135'),
(31, 19, '2025-02-15', '12:00:00', 'Project review', '0778452135'),
(32, 19, '2025-02-18', '16:00:00', 'Project Submission', '0775214649'),
(33, 19, '2025-02-18', '11:00:00', 'CEO meeting', '0752148159');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `password`) VALUES
(1, 'tonystark@gmail.com', 'Tony Stark', '$2a$10$IbHf4r4R.RY.sBYchVNqa.XXqQbrymu8Ivj0pB9tNFYOrvqc7vvU6'),
(11, 'jack@gmail.com', 'Jack', '$2a$10$24C6mdMyYoNlijoyZ8NCdOyOU9I2lRFM4vhtqIXhrh0pYMW3W2VWe'),
(15, 'steve@gmail.com', 'Steve Roggers', '$2a$10$gpoUhUaBw4Pob/gUr/VliehOWpTJo/dvc3nKEN4qDEI.uRNf/biNi'),
(17, 'thor@gmail.com', 'Thor', '$2a$10$bKLU5lH/vuRr6VH7Y.XvOO5u816J0wkjMsEGO7/MfTi/eUKCFAPQK'),
(19, 'brucewayne@gmail.com', 'Bruce Wayne', '$2a$10$F.VbtQ2wo.5m3PDpwxPnueoQd8E93CUcKdpb7mLfF5IcTQPM6ULWe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
