-- ELEVĀRA LUXURY PORTAL DATABASE MIGRATION SCHEMA

CREATE DATABASE IF NOT EXISTS elevara_db;
USE elevara_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2) NULL,
  category VARCHAR(100) NOT NULL,
  stock INT DEFAULT 0,
  sku VARCHAR(100) UNIQUE NULL,
  featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'Active',
  image_url VARCHAR(500) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shipping_addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address_line_1 VARCHAR(500) NOT NULL,
  address_line_2 VARCHAR(500) NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL DEFAULT 'India',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  shipping_address_id INT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'Pending',
  order_status VARCHAR(50) DEFAULT 'Pending',
  payment_method VARCHAR(50) DEFAULT 'COD',
  payment_id VARCHAR(255) NULL,
  idempotency_key VARCHAR(100) NULL,
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  image_url VARCHAR(500) NULL,
  sku VARCHAR(100) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media_assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_key VARCHAR(120) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  media_type ENUM('image', 'video') NULL,
  media_url VARCHAR(500) NULL,
  quote_text TEXT NULL,
  quote_author VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_media_section_key (section_key),
  INDEX idx_media_type (media_type)
);

INSERT INTO media_assets (section_key, title, media_type, media_url, quote_text, quote_author) VALUES
  ('website_favicon', 'Website Favicon', NULL, NULL, NULL, NULL),
  ('hero_background', 'Hero Background', 'image', '/assets/hero-brand.png', NULL, NULL),
  ('story_media_1', 'Story Media 1', 'image', '/assets/product.jpeg', NULL, NULL),
  ('story_media_2', 'Story Media 2', 'image', '/assets/hero-brand.png', 'We measure our craft not by the ingredients we include, but by the memories they are capable of holding.', 'The Master Perfumer'),
  ('shop_hero_background', 'Shop Page Hero Background', 'image', '/assets/Shop_Hero.png', NULL, NULL),
  ('blog_hero', 'Blog Hero', 'image', '/assets/hero-brand.png', NULL, NULL),
  ('loading_screen_logo', 'Loading Screen Logo', NULL, NULL, NULL, NULL),
  ('website_logo', 'Website Logo', NULL, NULL, NULL, NULL)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  media_type = COALESCE(media_type, VALUES(media_type)),
  media_url = COALESCE(media_url, VALUES(media_url)),
  quote_text = COALESCE(quote_text, VALUES(quote_text)),
  quote_author = COALESCE(quote_author, VALUES(quote_author));
