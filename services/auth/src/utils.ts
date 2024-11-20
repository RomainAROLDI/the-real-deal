export const hashPassword = async (password: string): Promise<string> =>
  await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 10
  });

export const verifyPassword = async (password: string, hash: string): Promise<boolean> =>
  await Bun.password.verify(password, hash, "bcrypt");
