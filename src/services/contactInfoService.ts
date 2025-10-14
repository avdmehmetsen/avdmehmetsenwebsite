import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ContactInfo, ContactInfoFormData } from "@/types";

const COLLECTION_NAME = "contactInfo";
const SINGLE_DOC_ID = "main"; // Tek bir döküman kullanacağız

/**
 * İletişim bilgilerini getirir
 */
export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, SINGLE_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        phone: data.phone,
        email: data.email,
        address: data.address,
        addressShort: data.addressShort,
        googleMapsIframe: data.googleMapsIframe,
        latitude: data.latitude,
        longitude: data.longitude,
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting contact info:", error);
    throw error;
  }
}

/**
 * İletişim bilgilerini günceller (veya ilk defa oluşturur)
 */
export async function updateContactInfo(
  data: ContactInfoFormData
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
    console.error("Error updating contact info:", error);
    throw error;
  }
}

/**
 * Varsayılan iletişim bilgilerini oluşturur (eğer yoksa)
 */
export async function initializeContactInfo(): Promise<void> {
  try {
    const existing = await getContactInfo();
    if (existing) {
      console.log("Contact info already exists");
      return;
    }

    const defaultData: ContactInfoFormData = {
      phone: "+90 (507) 736 82 51",
      email: "dmehmetsen@gmail.com",
      address:
        "Manavkuyu, Yüzbaşı İbrahim Hakkı Cd. 4. Halil Atilla Sitesi No:233 C Blok K:5 D:9, 35000 Bayraklı/İzmir",
      addressShort: "Bayraklı / İzmir",
      googleMapsIframe:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3123.9689396410945!2d27.19060637655294!3d38.46527837181961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b97de32f1226ed%3A0x3487243a82ced214!2zQXZ1a2F0IER1cmR1IE1laG1ldCDFnmVuIC0gxZ5lbiBIdWt1ayBCw7xyb3N1IC0gxLB6bWlyIEF2dWthdCAtIMSwem1pciBLaXJhIEF2dWthdMSxIC0gxLB6bWlyIMSwxZ8gQXZ1a2F0xLEgLSDEsHptaXIgQm_Fn2FubWEgQXZ1a2F0xLE!5e0!3m2!1str!2str!4v1760042428526!5m2!1str!2str",
      latitude: "38.4652783",
      longitude: "27.1906063",
    };

    await updateContactInfo(defaultData);
    console.log("Contact info initialized successfully");
  } catch (error) {
    console.error("Error initializing contact info:", error);
    throw error;
  }
}
