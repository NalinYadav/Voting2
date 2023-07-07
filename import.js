// importPasswords.js
const fs = require("fs");
const { connectDB, Password } = require("./config/db");

connectDB(); // Connect to MongoDB

fs.readFile("passwords.csv", "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    process.exit(1);
  }

  const passwords = data.trim().split("\n");

  for (const password of passwords) {
    try {
      await Password.create({ password });
      console.log(`Password "${password}" imported successfully`);
    } catch (err) {
      console.error(`Error importing password "${password}":`, err);
    }
  }

  console.log("CSV file processed");
  process.exit();
});
