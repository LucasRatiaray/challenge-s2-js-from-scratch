// src/ts/auth/IndexedDBAuth.ts

import bcrypt from "bcryptjs";

// Initialise la base de données
export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AuthDB", 1);

    request.onupgradeneeded = (event): void => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "email" });
      }
    };

    request.onsuccess = (): void => resolve(request.result);
    request.onerror = (): void => reject("Failed to initialize database");
  });
}

// Enregistre un utilisateur
export async function registerUser(
  email: string,
  password: string
): Promise<void> {
  const db = await initDB();
  const transaction = db.transaction("users", "readwrite");
  const store = transaction.objectStore("users");

  // Hash password using bcryptjs
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const request = store.add({ email, password: hashedPassword });

  return new Promise((resolve, reject) => {
    request.onsuccess = (): void => resolve();
    request.onerror = (): void =>
      reject("Email already exists or error adding user");
  });
}

// Connecte un utilisateur
export async function loginUser(
  email: string,
  password: string
): Promise<boolean> {
  const db = await initDB();
  const transaction = db.transaction("users", "readonly");
  const store = transaction.objectStore("users");

  const request = store.get(email);

  return new Promise((resolve, reject) => {
    request.onsuccess = async (): Promise<void> => {
      const user = request.result;
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          resolve(true);
        } else {
          reject("Invalid password");
        }
      } else {
        reject("User not found");
      }
    };
    request.onerror = (): void => reject("Error fetching user");
  });
}
