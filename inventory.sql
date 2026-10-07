-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 19, 2022 at 08:57 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `street_address` varchar(45) DEFAULT NULL,
  `postal_code` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `street_address`, `postal_code`, `city`, `status`) VALUES
(5, 'Maija', 'Opistotie 2', '70100', 'Kuopio', 0),
(6, 'Liisa', 'Kauppakatu 1 a 3', '71800', 'Siilinjärvi', 0),
(7, 'Matti', 'Mikrokatu 9', '45100', 'Jyväskylä', 0),
(8, 'Heikki', 'Koppelokuja 7 e 45', '00100', 'Helsinki', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(45) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `delivery_date` datetime DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_customers_idx` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `order_date`, `delivery_date`, `customer_id`) VALUES
(1, '2034', '2021-04-07 00:00:00', '2021-05-19 00:00:00', 6),
(2, '22900', '2021-04-01 00:00:00', '2021-06-24 00:00:00', 7),
(3, '113', '2021-04-09 00:00:00', '2021-05-01 00:00:00', 7),
(4, '114', '2021-04-02 00:00:00', '2021-04-16 00:00:00', 8),
(5, '11879', '2021-04-11 00:00:00', '2021-05-16 00:00:00', 5),
(10, '9866A', '2021-03-04 00:00:00', '2021-04-12 00:00:00', 6);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE IF NOT EXISTS `suppliers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `company_name` VARCHAR(100) DEFAULT NULL,
    `contact_name` VARCHAR(50) DEFAULT NULL,
    `contact_title` VARCHAR(50) DEFAULT NULL,
    `street_address` VARCHAR(50) DEFAULT NULL,
    `postal_code` VARCHAR(50) DEFAULT NULL,
    `city` VARCHAR(50) DEFAULT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `email` VARCHAR(100) DEFAULT NULL
)ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `suppliers`
--
INSERT INTO `suppliers`
(`id`,`company_name`, `contact_name`, `contact_title`, `street_address`,
 `postal_code`, `city`, `phone`, `email`)
VALUES
(1,"Car Parts Company", "Mikko Vanhala", "Sales Manager",
 "Teollisuuskatu 12", "00510", "Helsinki", "0401234567",
 "mikko.vanhala@carparts.com"),
(2,"Baltic Car Components", "Anna Turunen", "Purchasing Manager",
 "Satamatie 8", "20100", "Turku", "0509876543",
 "anna.turunen@balticcarcomponents.com"),
 (3, "Cozy Craft", "Laura Nieminen", "Sales Manager",
 "Hämeentie 135", "00560", "Helsinki", "0407654321",
 "laura.nieminen@cozy_craft.com"),
(4, "Velora Home", "Jari Korhonen", "Purchasing Manager",
 "Lautatarhankatu 8", "00580", "Helsinki", "0503456789",
 "jari.korhonen@velora.com");

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category_name` VARCHAR(50) NOT NULL UNIQUE
)ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`)
VALUES
(1, "Household Items"),
(2, "Automotive Parts"),
(3, "Hardware"),
(4, "Sports"),
(5, "Automotive Accessories"),
(6, "Safety Equipment"),
(7, "Electrical Supplies");
-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `unit_price` double DEFAULT NULL,
  `units_in_stock` int(11) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_categories_idx` (`category_id`),
  KEY `fk_products_suppliers_idx` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`,`category_id`,`supplier_id`,`unit_price`,`units_in_stock`,`description`)
VALUES
(1, "Tabletop", 1, 4, 125, 10, "good product"),
(2, "Chair", 1, 4, 125, 10, "good product"),
(3, "Exhaust Pipe", 2, 4, 125, 10, "good product"),
(4, "Tires", 2, 4, 125, 10, "good product"),
(5, "Rims", 2, 4, 125, 10, "good product"),
(6, "Nut", 3, 4, 125, 10, "good product"),
(7, "Bicycle", 4, 4, 125, 10, "good product"),
(8, "Auxiliary Lights", 5, 4, 125, 10, "good product"),
(9, "Helmet", 6, 4, 125, 10, "good product"),
(10, "Cable", 7, 4, 125, 10, "good product");
-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
CREATE TABLE IF NOT EXISTS `order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `unit_price` double DEFAULT NULL,
  `tax_percentage` double DEFAULT NULL,
  `delivered` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_order_details_idx` (`order_id`),
  KEY `fk_products_order_details_idx` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details`
(`id`, `order_id`, `product_id`, `quantity`, `unit`,
 `note`, `unit_price`, `tax_percentage`, `delivered`) VALUES
(1, 1, 1, 3, 'kpl', 'Mallikappale', 100, 24, 1),
(2, 1, 2, 4, 'kpl', NULL, 10, 24, 1),
(3, 3, 3, 1, 'kpl', NULL, 200, 24, 1),
(4, 2, 4, 4, 'kpl', NULL, 50, 24, 0),
(5, 2, 5, 4, 'kpl', NULL, 125, 24, 0),
(7, 5, 6, 1000, 'kpl', NULL, 0.05, 24, 0),
(10, 10, 7, 2, 'kpl', 'Käytetty', 200, 24, 0),
(11, 10, 8, 3, 'kpl', NULL, 100, 24, 1),
(12, 4, 9, 4, 'kpl', 'Kuin uusi', 35, 0, 0),
(13, 4, 10, 100, 'm', NULL, 0.5, 24, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--

ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_customers`
  FOREIGN KEY (`customer_id`)
  REFERENCES `customers` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

--
-- Constraints for table `products`
--

ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_categories`
  FOREIGN KEY (`category_id`)
  REFERENCES `categories` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

--
-- Constraints for table `order_details`
--

ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_order_details_orders`
  FOREIGN KEY (`order_id`)
  REFERENCES `orders` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_order_details_products`
  FOREIGN KEY (`product_id`)
  REFERENCES `products` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@@OLD_COLLATION_CONNECTION */;
