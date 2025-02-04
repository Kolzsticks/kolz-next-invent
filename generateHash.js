import bcrypt from "bcryptjs";

async function generateHash() {
  try {
    const plainPassword = "123456"; // The password to hash
    const saltRounds = 10; // Number of salt rounds (recommended: 10)

    // Generate the hash
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    console.log("Hashed Password:", hashedPassword);
  } catch (error) {
    console.error("Error generating hash:", error);
  }
}

// Call the function
generateHash();