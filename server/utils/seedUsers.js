import bcrypt from "bcryptjs";

const SEED_USERS = [
  {
    name: "Elevara Admin",
    email: "admin@elevara.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Maison Guest",
    email: "user@elevara.com",
    password: "elevara123",
    role: "user",
  },
];

export const seedUsersIfEmpty = async (connection) => {
  try {
    const [rows] = await connection.query("SELECT COUNT(*) AS count FROM users");
    const count = rows[0]?.count ?? 0;
    if (count > 0) return;

    const salt = await bcrypt.genSalt(10);
    for (const user of SEED_USERS) {
      const hashedPassword = await bcrypt.hash(user.password, salt);
      await connection.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [user.name, user.email, hashedPassword, user.role]
      );
    }
    console.log(`Elevāra: Seeded ${SEED_USERS.length} users (admin + customer)`);
  } catch (error) {
    console.warn("Elevāra user seed skipped:", error.message);
  }
};
