-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "subcategory" VARCHAR(100),
    "price" DECIMAL(65,30) NOT NULL,
    "venue" VARCHAR(255),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
