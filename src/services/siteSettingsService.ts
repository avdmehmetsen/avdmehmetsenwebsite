import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SiteSettings, SiteSettingsFormData } from "@/types";

const COLLECTION_NAME = "siteSettings";
const SINGLE_DOC_ID = "main";

/**
 * Site ayarlarını getirir
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, SINGLE_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        isMaintenanceMode: data.isMaintenanceMode || false,
        maintenanceMessage: data.maintenanceMessage || "",
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting site settings:", error);
    throw error;
  }
}

/**
 * Site ayarlarını günceller
 */
export async function updateSiteSettings(
  data: SiteSettingsFormData
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, SINGLE_DOC_ID);

    await setDoc(
      docRef,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating site settings:", error);
    throw error;
  }
}

/**
 * Bakım modunu aç/kapat (hızlı toggle için)
 */
export async function toggleMaintenanceMode(enabled: boolean): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, SINGLE_DOC_ID);

    await setDoc(
      docRef,
      {
        isMaintenanceMode: enabled,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error toggling maintenance mode:", error);
    throw error;
  }
}

/**
 * Varsayılan ayarları oluşturur
 */
export async function initializeSiteSettings(): Promise<void> {
  try {
    const existing = await getSiteSettings();
    if (existing) {
      console.log("Site settings already exist");
      return;
    }

    const defaultData: SiteSettingsFormData = {
      isMaintenanceMode: false,
      maintenanceMessage:
        "Sitemiz şu anda bakımdadır. En kısa sürede sizlerle olacağız.",
    };

    await updateSiteSettings(defaultData);
    console.log("Site settings initialized successfully");
  } catch (error) {
    console.error("Error initializing site settings:", error);
    throw error;
  }
}
