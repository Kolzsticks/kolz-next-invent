-- Insert Products
INSERT INTO "Product" (name, category, subcategory, price, venue, quantity, image_url, date) VALUES
-- Beverages - Beer
('HEINEKEN', 'Beverages', 'Beer', 2000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('BIG WILLIAMS', 'Beverages', 'Beer', 2000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('DESPERADO', 'Beverages', 'Beer', 1700, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('GOLDBERG', 'Beverages', 'Beer', 1700, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('STOUT', 'Beverages', 'Beer', 1700, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('GULDER', 'Beverages', 'Beer', 1700, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('HERO', 'Beverages', 'Beer', 1700, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('ICE', 'Beverages', 'Beer', 1200, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('STAR RADLER', 'Beverages', 'Beer', 1000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('SMALL WILLIAM', 'Beverages', 'Beer', 1000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('33 BEER', 'Beverages', 'Beer', 1700, 'lounge', 0, '' '', CURRENT_TIMESTAMP),

-- Beverages - Soft Drinks
('WATER 50cl', 'Beverages', 'Soft Drinks', 300, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('WATER 75cl', 'Beverages', 'Soft Drinks', 500, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('WATER regular', 'Beverages', 'Soft Drinks', 500, 'club', 0, '' '', CURRENT_TIMESTAMP),
('BOTTLE MALT', 'Beverages', 'Soft Drinks', 1000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('CAN MALT', 'Beverages', 'Soft Drinks', 1000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('COKE', 'Beverages', 'Soft Drinks', 1000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('COKE (Club)', 'Beverages', 'Soft Drinks', 1500, 'club', 0, '' '', CURRENT_TIMESTAMP),
('FEARLESS', 'Beverages', 'Soft Drinks', 1000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('PREDATOR', 'Beverages', 'Soft Drinks', 1000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('EXOTIC', 'Beverages', 'Soft Drinks', 3000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('EXOTIC (Club)', 'Beverages', 'Soft Drinks', 4000, 'club', 0, '' '', CURRENT_TIMESTAMP),
('BLUE BULLET', 'Beverages', 'Soft Drinks', 2000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('BLUE BULLET (Club)', 'Beverages', 'Soft Drinks', 3000, 'club', 0, '' '', CURRENT_TIMESTAMP),
('MONSTER', 'Beverages', 'Soft Drinks', 1500, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('MONSTER (Club)', 'Beverages', 'Soft Drinks', 3500, 'club', 0, '' '', CURRENT_TIMESTAMP),
('VITAMILK', 'Beverages', 'Soft Drinks', 2500, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('HOLLANDIA', 'Beverages', 'Soft Drinks', 3000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('CLIMAX', 'Beverages', 'Soft Drinks', 2000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('BLACK BULLET', 'Beverages', 'Soft Drinks', 2500, 'lounge', 0, '' '', CURRENT_TIMESTAMP),

-- Beverages - Juice Drinks
('PINEAPPLE', 'Beverages', 'Juice Drinks', 2000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('WATERMELON', 'Beverages', 'Juice Drinks', 2000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('PAWPAW', 'Beverages', 'Juice Drinks', 2000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('COCONUT DATE/TIGER FRUIT', 'Beverages', 'Juice Drinks', 2000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('FRIUTE SALAD & SAUCE', 'Beverages', 'Juice Drinks', 2000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('COCONUT MILK DRINK', 'Beverages', 'Juice Drinks', 2000, 'lounge', 0, '' '', CURRENT_TIMESTAMP),
('PALM WINE', 'Beverages', 'Juice Drinks', 3500, 'lounge', 0, '' '', CURRENT_TIMESTAMP),

-- Insert Products for Cognac
INSERT INTO Product (name, category, subcategory, price, venue, quantity, image_url, date)
VALUES
('REMY MARTIN XO', 'Spirits', 'Cognac', 250000, 'club', 0, '', NOW()),
('REMY MARTIN VSOP', 'Spirits', 'Cognac', 100000, 'club', 0, '', NOW()),
('REMY MARTIN', 'Spirits', 'Cognac', 65000, 'lounge', 0, '', NOW()),
('HENNESSY VS', 'Spirits', 'Cognac', 50000, 'lounge', 0, '', NOW()),
('HENNESSY VS', 'Spirits', 'Cognac', 90000, 'club', 0, '', NOW()),
('HENNESSY VSOP', 'Spirits', 'Cognac', 65000, 'lounge', 0, '', NOW()),
('HENNESSY VSOP', 'Spirits', 'Cognac', 125000, 'club', 0, '', NOW()),
('MARTEL VS', 'Spirits', 'Cognac', 65000, 'lounge', 0, '', NOW()),
('MARTEL VS', 'Spirits', 'Cognac', 65000, 'club', 0, '', NOW()),
('MARTEL BLUE SWIFT', 'Spirits', 'Cognac', 100000, 'club', 0, '', NOW());

-- Insert Products for Whiskey
INSERT INTO Product (name, category, subcategory, price, venue, quantity, image_url, date)
VALUES
('GOLD LABEL', 'Spirits', 'Whiskey', 75000, 'club', 0, '', NOW()),
('BLACK LABEL', 'Spirits', 'Whiskey', 35000, 'lounge', 0, '', NOW()),
('GREEN LABEL', 'Spirits', 'Whiskey', 50000, 'club', 0, '', NOW()),
('JAMESON', 'Spirits', 'Whiskey', 35000, 'lounge', 0, '', NOW()),
('JAMESON', 'Spirits', 'Whiskey', 50000, 'club', 0, '', NOW()),
('JACK DANIELS', 'Spirits', 'Whiskey', 30000, 'lounge', 0, '', NOW()),
('JACK DANIELS', 'Spirits', 'Whiskey', 50000, 'club', 0, '', NOW()),
('AMERICAN HONEY', 'Spirits', 'Whiskey', 35000, 'lounge', 0, '', NOW()),
('AMERICAN HONEY', 'Spirits', 'Whiskey', 45000, 'club', 0, '', NOW()),
('RED LABEL', 'Spirits', 'Whiskey', 25000, 'lounge', 0, '', NOW()),
('BLACK TRAIN', 'Spirits', 'Whiskey', 15000, 'lounge', 0, '', NOW()),
('ST. REMY VSOP', 'Spirits', 'Whiskey', 20000, 'lounge', 0, '', NOW());

-- Insert Products for Vodka & Gin
INSERT INTO Product (name, category, subcategory, price, venue, quantity, image_url, date)
VALUES
('CIROC', 'Spirits', 'Vodka & Gin', 60000, 'lounge', 0, '', NOW()),
('CIROC', 'Spirits', 'Vodka & Gin', 80000, 'club', 0, '', NOW()),
('BIG VODKA', 'Spirits', 'Vodka & Gin', 15000, 'lounge', 0, '', NOW()),
('SMALL VODKA', 'Spirits', 'Vodka & Gin', 2500, 'lounge', 0, '', NOW()),
('BIG GORDONS', 'Spirits', 'Vodka & Gin', 15000, 'lounge', 0, '', NOW()),
('SMALL GORDONS', 'Spirits', 'Vodka & Gin', 2500, 'lounge', 0, '', NOW());

-- Insert Products for Tequila
INSERT INTO Product (name, category, subcategory, price, venue, quantity, image_url, date)
VALUES
('AZUL', 'Spirits', 'Tequila', 550000, 'club', 0, '', NOW()),
('OLMECA TEQUILA', 'Spirits', 'Tequila', 25000, 'lounge', 0, '', NOW()),
('OLMECA TEQUILA', 'Spirits', 'Tequila', 50000, 'club', 0, '', NOW()),
('OLMECA TEQUILA', 'Spirits', 'Tequila', 4000, 'both', 0, '', NOW()),
('DON JULIO', 'Spirits', 'Tequila', 60000, 'club', 0, '', NOW());


-- Insert Products for Premium Champagne
INSERT INTO "Product" (name, category, subcategory, price, venue, quantity, image_url, date)
VALUES
('GOLD BOTTLE', 'Champagne & Wine', 'Premium Champagne', 360000, 'club', 0, '', NOW()),
('ACE OF SPADES', 'Champagne & Wine', 'Premium Champagne', 380000, 'club', 0, '', NOW()),
('DON PERIGNON', 'Champagne & Wine', 'Premium Champagne', 380000, 'club', 0, '', NOW()),
('MOET BRUT', 'Champagne & Wine', 'Premium Champagne', 80000, 'club', 0, '', NOW()),
('MOET ROSE', 'Champagne & Wine', 'Premium Champagne', 80000, 'club', 0, '', NOW());

-- Insert Products for Regular Champagne & Wine
INSERT INTO "Product" (name, category, subcategory, price, venue, quantity, image_url, date)
VALUES
('BEL-AIRE', 'Champagne & Wine', 'Regular Champagne & Wine', 70000, 'lounge', 0, '', NOW()),
('BEL-AIRE', 'Champagne & Wine', 'Regular Champagne & Wine', 85000, 'club', 0, '', NOW()),
('MARTINI ROSE', 'Champagne & Wine', 'Regular Champagne & Wine', 25000, 'lounge', 0, '', NOW()),
('MARTINI ROSE', 'Champagne & Wine', 'Regular Champagne & Wine', 35000, 'club', 0, '', NOW()),
('ANDRE', 'Champagne & Wine', 'Regular Champagne & Wine', 22000, 'lounge', 0, '', NOW()),
('ANDRE', 'Champagne & Wine', 'Regular Champagne & Wine', 30000, 'club', 0, '', NOW()),
('SUPEMATE', 'Champagne & Wine', 'Regular Champagne & Wine', 8000, 'lounge', 0, '', NOW()),
('FOUR COUSIN', 'Champagne & Wine', 'Regular Champagne & Wine', 15000, 'lounge', 0, '', NOW()),
('CARLO ROSSI', 'Champagne & Wine', 'Regular Champagne & Wine', 12000, 'lounge', 0, '', NOW());



-- Insert Rice Dishes Products
-- FRIED RICE
INSERT INTO "Product" (name, category, subcategory, price, venue, quantity, image_url, date)
VALUES
('FRIED RICE with CHICKEN', 'Food', 'Rice Dishes', 8000, '', 0, '', NOW()),
('FRIED RICE with TURKEY', 'Food', 'Rice Dishes', 9000, '', 0, '', NOW()),
('FRIED RICE with BEEF', 'Food', 'Rice Dishes', 6000, '', 0, '', NOW()),
('FRIED RICE with FISH', 'Food', 'Rice Dishes', 5000, '', 0, '', NOW()),
('FRIED RICE with BOILED EGGS', 'Food', 'Rice Dishes', 4500, '', 0, '', NOW()),
-- JOLLOF RICE
('JOLLOF RICE with CHICKEN', 'Food', 'Rice Dishes', 8000, '', 0, '', NOW()),
('JOLLOF RICE with TURKEY', 'Food', 'Rice Dishes', 9000, '', 0, '', NOW()),
('JOLLOF RICE with BEEF', 'Food', 'Rice Dishes', 6000, '', 0, '', NOW()),
('JOLLOF RICE with FISH', 'Food', 'Rice Dishes', 5000, '', 0, '', NOW()),
-- WHITE RICE
('WHITE RICE with TURKEY', 'Food', 'Rice Dishes', 4500, '', 0, '', NOW()),
('WHITE RICE with CHICKEN', 'Food', 'Rice Dishes', 6000, '', 0, '', NOW()),
('WHITE RICE with BEEF', 'Food', 'Rice Dishes', 6000, '', 0, '', NOW()),
('WHITE RICE with FISH', 'Food', 'Rice Dishes', 5000, '', 0, '', NOW()),
-- Other Rice Dishes
('VEGETABLE RICE', 'Food', 'Rice Dishes', 3500, '', 0, '', NOW()),
('OIL RICE', 'Food', 'Rice Dishes', 3500, '', 0, '', NOW()),
('CINNAMON RICE', 'Food', 'Rice Dishes', 4000, '', 0, '', NOW());

-- Insert Swallow Dishes Products
-- POUNDO
INSERT INTO "Product" (name, category, subcategory, price, venue, quantity, image_url, date)
VALUES
('POUNDO with TURKEY', 'Food', 'Swallow Dishes', 8000, '', 0, '', NOW()),
('POUNDO with CHICKEN', 'Food', 'Swallow Dishes', 7000, '', 0, '', NOW()),
('POUNDO with BEEF', 'Food', 'Swallow Dishes', 6000, '', 0, '', NOW()),
('POUNDO with FISH', 'Food', 'Swallow Dishes', 4000, '', 0, '', NOW()),
-- SEMO
('SEMO with TURKEY', 'Food', 'Swallow Dishes', 8000, '', 0, '', NOW()),
('SEMO with CHICKEN', 'Food', 'Swallow Dishes', 7000, '', 0, '', NOW()),
('SEMO with FISH', 'Food', 'Swallow Dishes', 4000, '', 0, '', NOW()),
('SEMO with BEEF', 'Food', 'Swallow Dishes', 5000, '', 0, '', NOW()),
-- EBA
('EBA with TURKEY', 'Food', 'Swallow Dishes', 8000, '', 0, '', NOW()),
('EBA with CHICKEN', 'Food', 'Swallow Dishes', 7000, '', 0, '', NOW()),
('EBA with BEEF', 'Food', 'Swallow Dishes', 5500, '', 0, '', NOW()),
('EBA with FISH', 'Food', 'Swallow Dishes', 4000, '', 0, '', NOW()),
-- AMALA
('AMALA with TURKEY', 'Food', 'Swallow Dishes', 8500, '', 0, '', NOW()),
('AMALA with CHICKEN', 'Food', 'Swallow Dishes', 7500, '', 0, '', NOW()),
('AMALA with BEEF', 'Food', 'Swallow Dishes', 5500, '', 0, '', NOW()),
-- STARCH
('STARCH with TURKEY', 'Food', 'Swallow Dishes', 8500, '', 0, '', NOW()),
('STARCH with CHICKEN', 'Food', 'Swallow Dishes', 7000, '', 0, '', NOW()),
('STARCH with BEEF', 'Food', 'Swallow Dishes', 5500, '', 0, '', NOW()),
('STARCH with FISH', 'Food', 'Swallow Dishes', 4500, '', 0, '', NOW()),
('STARCH with CATFISH', 'Food', 'Swallow Dishes', 7500, '', 0, '', NOW());

-- Insert Pepper Soup Products
-- CHICKEN PEPPER SOUP
INSERT INTO "Product" (name, category, subcategory, price, venue, quantity, image_url, date)
VALUES
('CHICKEN PEPPER SOUP', 'Food', 'Pepper Soup', 6000, '', 0, '', NOW()),
('TURKEY PEPPER SOUP', 'Food', 'Pepper Soup', 7000, '', 0, '', NOW()),
('ASSORTED PEPPER SOUP', 'Food', 'Pepper Soup', 3000, '', 0, '', NOW()),
('GOAT MEAT PEPPER SOUP', 'Food', 'Pepper Soup', 3000, '', 0, '', NOW()),
('CATFISH PEPPER SOUP', 'Food', 'Pepper Soup', 5000, '', 0, '', NOW());

-- Insert Quick Meals Products
-- SPAGHETTI BOLOGNESE
INSERT INTO "Product" (name, category, subcategory, price, venue, quantity, image_url, date)
VALUES
('SPAGHETTI BOLOGNESE', 'Food', 'Quick Meals', 6000, '', 0, '', NOW()),
('SPAGHETTI PLAIN', 'Food', 'Quick Meals', 3000, '', 0, '', NOW()),
('YAM & OWO', 'Food', 'Quick Meals', 5000, '', 0, '', NOW()),
('COOL SLAW', 'Food', 'Quick Meals', 1000, '', 0, '', NOW()),
('SHAWAMA', 'Food', 'Quick Meals', 5000, '', 0, '', NOW()),
('OMELETTE', 'Food', 'Quick Meals', 3000, '', 0, '', NOW()),
('YAM & EGG', 'Food', 'Quick Meals', 3000, '', 0, '', NOW()),
('INDOMIE & EGG', 'Food', 'Quick Meals', 3500, '', 0, '', NOW()),
('FRIED PLANTAIN & EGG', 'Food', 'Quick Meals', 4000, '', 0, '', NOW());


-- Insert Birthday Cakes Products
-- 8 INCHES
INSERT INTO "Product" (name, category, subcategory, price, venue, quantity, image_url, date)
VALUES
('Birthday Cake 8 INCHES', 'Cakes', 'Birthday Cakes', 18000, '', 0, '', NOW()),
-- 9 INCHES
('Birthday Cake 9 INCHES', 'Cakes', 'Birthday Cakes', 19000, '', 0, '', NOW()),
-- 10 INCHES
('Birthday Cake 10 INCHES', 'Cakes', 'Birthday Cakes', 20000, '', 0, '', NOW()),
-- 12 INCHES
('Birthday Cake 12 INCHES', 'Cakes', 'Birthday Cakes', 21000, '', 0, '', NOW()),
-- 14 INCHES
('Birthday Cake 14 INCHES', 'Cakes', 'Birthday Cakes', 22000, '', 0, '', NOW());
