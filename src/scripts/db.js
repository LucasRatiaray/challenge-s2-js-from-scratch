var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dbName = "UserDatabase";
const storeName = "users";
export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: "email" });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
export function addUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDB();
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        yield store.add({ email, password });
        tx.commit();
    });
}
export function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDB();
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        return store.get(email);
    });
}
