import { createUser } from "./actions";

async function createAdminUser() {
  try {
    const adminUser = {
      name: "Admin User",       // Name of the admin
      username: "admin",        // Desired username
      password: "123456",       // Desired password (will be hashed)
      role: "admin",            // Role of the user
    };

    // Call the createUser function
    const createdUser = await createUser(adminUser);

    console.log("Admin user created successfully:", createdUser);
  } catch (error) {
    console.error("Failed to create admin user:", error);
  }
}

// Execute the function
createAdminUser();