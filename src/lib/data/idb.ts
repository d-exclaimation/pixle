const DB_NAME = "pixle";
const DB_VERSION = 1;

const TABLES = [["daily", { keyPath: "day" }]] as const;

export async function idb() {
  if (!("indexedDB" in window)) {
    throw new Error("Your browser does not support IndexedDB");
  }
  const res = window.indexedDB.open(DB_NAME, DB_VERSION);
  res.onupgradeneeded = (_) => {
    const db = res.result;
    for (const [name, options] of TABLES) {
      db.createObjectStore(name, options);
    }
  };
  return new Promise<IDBDatabase>((resolve, reject) => {
    res.onsuccess = () => {
      resolve(res.result);
    };
    res.onerror = () => {
      reject(res.error);
    };
  });
}

export async function store(name: (typeof TABLES)[number][0]) {
  const db = await idb();
  const tx = db.transaction(name, "readwrite");
  const store = tx.objectStore(name);
  return {
    store,
    get(...args: Parameters<typeof store.get>) {
      return promise(store.get(...args));
    },
    add(...args: Parameters<typeof store.add>) {
      return promise(store.add(...args));
    },
    getAll(...args: Parameters<typeof store.getAll>) {
      return promise(store.getAll(...args));
    },
    put(...args: Parameters<typeof store.put>) {
      return promise(store.put(...args));
    },
    delete(...args: Parameters<typeof store.delete>) {
      return promise(store.delete(...args));
    },
  };
}

export async function promise<T>(req: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    req.onsuccess = () => {
      resolve(req.result);
    };
    req.onerror = () => {
      reject(req.error);
    };
  });
}
