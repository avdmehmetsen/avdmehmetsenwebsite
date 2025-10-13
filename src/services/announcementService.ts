import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { Announcement, AnnouncementFormData } from "@/types";

const COLLECTION_NAME = "announcements";

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

// Get all announcements (with optional filter for published only)
export async function getAnnouncements(
  publishedOnly = false
): Promise<Announcement[]> {
  try {
    const announcementsRef = collection(db, COLLECTION_NAME);
    let q = query(announcementsRef, orderBy("createdAt", "desc"));

    if (publishedOnly) {
      q = query(
        announcementsRef,
        where("published", "==", true),
        orderBy("createdAt", "desc")
      );
    }

    const querySnapshot = await getDocs(q);
    const announcements: Announcement[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      announcements.push({
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Announcement);
    });

    return announcements;
  } catch (error) {
    console.error("Error getting announcements:", error);
    throw error;
  }
}

// Get announcement by ID
export async function getAnnouncementById(
  id: string
): Promise<Announcement | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Announcement;
    }
    return null;
  } catch (error) {
    console.error("Error getting announcement by ID:", error);
    throw error;
  }
}

// Create new announcement
export async function createAnnouncement(
  formData: AnnouncementFormData
): Promise<string> {
  try {
    const now = new Date();

    // Format date as "DD Month YYYY" in Turkish
    const dateStr = now.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const announcementData = {
      ...formData,
      date: dateStr,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    };

    const docRef = await addDoc(
      collection(db, COLLECTION_NAME),
      announcementData
    );
    return docRef.id;
  } catch (error) {
    console.error("Error creating announcement:", error);
    throw error;
  }
}

// Update announcement
export async function updateAnnouncement(
  id: string,
  formData: Partial<AnnouncementFormData>
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData: Partial<AnnouncementFormData> & { updatedAt: Timestamp } =
      {
        ...formData,
        updatedAt: Timestamp.fromDate(new Date()),
      };

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating announcement:", error);
    throw error;
  }
}

// Delete announcement
export async function deleteAnnouncement(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting announcement:", error);
    throw error;
  }
}
