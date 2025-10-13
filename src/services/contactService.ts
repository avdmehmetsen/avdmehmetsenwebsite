import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { ContactMessage, ContactFormData } from "@/types";

const COLLECTION_NAME = "contacts";

// Helper function to convert Firestore timestamp to Date
function convertTimestamp(
  timestamp: { toDate?: () => Date } | Date | string | number
): Date {
  if (
    timestamp &&
    typeof timestamp === "object" &&
    "toDate" in timestamp &&
    timestamp.toDate
  ) {
    return timestamp.toDate();
  }
  return new Date(timestamp as string | number | Date);
}

// Get all contact messages (with optional filter for unread only)
export async function getContactMessages(
  unreadOnly = false
): Promise<ContactMessage[]> {
  try {
    const contactsRef = collection(db, COLLECTION_NAME);
    let q = query(contactsRef, orderBy("createdAt", "desc"));

    if (unreadOnly) {
      q = query(
        contactsRef,
        where("isRead", "==", false),
        orderBy("createdAt", "desc")
      );
    }

    const querySnapshot = await getDocs(q);
    const messages: ContactMessage[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
      } as ContactMessage);
    });

    return messages;
  } catch (error) {
    console.error("Error getting contact messages:", error);
    throw error;
  }
}

// Create new contact message
export async function createContactMessage(
  formData: ContactFormData
): Promise<string> {
  try {
    const now = new Date();

    const messageData = {
      ...formData,
      isRead: false,
      createdAt: Timestamp.fromDate(now),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), messageData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating contact message:", error);
    throw error;
  }
}

// Mark message as read
export async function markMessageAsRead(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { isRead: true });
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
}

// Delete contact message
export async function deleteContactMessage(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting contact message:", error);
    throw error;
  }
}

// Get unread message count
export async function getUnreadMessageCount(): Promise<number> {
  try {
    const contactsRef = collection(db, COLLECTION_NAME);
    const q = query(contactsRef, where("isRead", "==", false));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting unread message count:", error);
    return 0;
  }
}
