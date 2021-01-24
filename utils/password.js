import bcrypt from "bcrypt";

export const checkPassword = async (hash, password) => {
  const result = await bcrypt.compare(password, hash);

  return result;
};

export const hashPassword = async (password) => {
  const hash = bcrypt.hash(password, 10);

  return hash;
};
