import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

export async function comparePassword(userPassword:string, httpPassword:string)  {

    const isPasswordMatch = await bcrypt.compare(userPassword,httpPassword)
    return isPasswordMatch;

}