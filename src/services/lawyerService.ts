import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { LawyerInfo } from "@/types";

const COLLECTION_NAME = "lawyer-info";
const DOC_ID = "main"; // Single document for lawyer info

// Get lawyer info
export async function getLawyerInfo(): Promise<LawyerInfo | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        updatedAt: data.updatedAt?.toDate() || new Date(),
        editorStateJSON: data.editorStateJSON ?? null,
      } as LawyerInfo;
    }
    return null;
  } catch (error) {
    console.error("Error getting lawyer info:", error);
    throw error;
  }
}

// Update lawyer info
export async function updateLawyerInfo(
  data: Partial<Omit<LawyerInfo, "id" | "updatedAt">>
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const docSnap = await getDoc(docRef);

    const updateData = {
      ...data,
      editorStateJSON: data.editorStateJSON ?? null,
      updatedAt: new Date(),
    };

    if (docSnap.exists()) {
      // Update existing document
      await updateDoc(docRef, updateData);
    } else {
      // Create new document
      await setDoc(docRef, updateData);
    }
  } catch (error) {
    console.error("Error updating lawyer info:", error);
    throw error;
  }
}
