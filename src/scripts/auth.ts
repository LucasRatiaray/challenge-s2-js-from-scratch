import { addUser, getUser } from "./db";

export async function signup(email: string, password: string): Promise<string> {
  const existingUser = await getUser(email);
  if (existingUser) {
    return "User already exists";
  } else {
    await addUser(email, password);
    return "Signup successful";
  }
}

export async function login(email: string, password: string): Promise<string> {
  const user = await getUser(email);
  if (user && user.password === password) {
    return "Login successful";
  } else {
    return "Invalid email or password";
  }
}