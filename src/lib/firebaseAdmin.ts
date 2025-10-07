import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Only a projectId is needed for the emulator
if (!getApps().length) {
  initializeApp({ projectId: "unityed-local" });
}

export const db = getFirestore();
