# NextInvent 📦📊

A modern, full-stack Inventory and Sales Management System built with Next.js, Prisma, and Tailwind CSS. 

NextInvent provides businesses with a clean, intuitive interface to track products, manage sales, and analyze business performance in real-time. It features robust user authentication, image handling, and dynamic data visualization.

## ✨ Features

* **Interactive Dashboard:** Real-time statistics, sales trends, and combined data charts.
* **Product Management:** Add, edit, and track inventory items with Cloudinary-backed image uploads.
* **Sales Tracking:** Record new sales, manage transactions, and view sales history.
* **User & Role Management:** Secure user administration and group assignment.
* **Authentication:** Secure login and session management powered by NextAuth.js.
* **Modern UI:** Fully responsive and accessible interface built with Tailwind CSS and shadcn/ui.
* **Data Tables:** Advanced data tables with search, pagination, and filtering.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Database ORM:** [Prisma](https://www.prisma.io/)
* **Authentication:** [NextAuth.js](https://next-auth.js.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
* **Image Hosting:** [Cloudinary](https://cloudinary.com/)
* **State Management:** Zustand (Stores)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v18 or higher)
* [pnpm](https://pnpm.io/) (Recommended) or npm/yarn
* A relational database (PostgreSQL/MySQL)
* A [Cloudinary](https://cloudinary.com/) account for image uploads

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Kolzsticks/kolz-next-invent.git](https://github.com/Kolzsticks/kolz-next-invent.git)
   cd kolz-next-invent

```

2. **Install dependencies:**
```bash
pnpm install

```


3. **Set up Environment Variables:**
Create a `.env` file in the root directory and add the following keys:
```env
# Database Configuration
DATABASE_URL="your_database_connection_string"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate_a_random_secret_string"

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

```


4. **Initialize the Database:**
Run the Prisma migrations to generate the schema in your database.
```bash
npx prisma migrate dev
npx prisma generate

```


5. **Run the Development Server:**
```bash
pnpm dev

```


Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://www.google.com/search?q=https://github.com/Kolzsticks/kolz-next-invent/issues) if you want to contribute.

## 📝 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```

```
