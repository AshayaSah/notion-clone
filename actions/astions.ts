"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
    try {
        // Protect the route and get session claims
        const { sessionClaims } = await auth();

        // Create a new document in the "documents" collection
        const docCollectionRef = adminDb.collection("documents");
        const docRef = await docCollectionRef.add({
            title: "New Doc"
        });

        // Set the user data in the "rooms" subcollection
        await adminDb.collection('users').doc(sessionClaims?.email!).collection("rooms").doc(docRef.id).set({
            userId: sessionClaims?.email!,
            role: "owner",
            createdAt: new Date(),
            roomId: docRef.id,
        });

        return {docId: docRef.id};
    } catch (error) {
        console.error("Error creating new document:", error);
        throw new Error("Failed to create new document");
    }
}