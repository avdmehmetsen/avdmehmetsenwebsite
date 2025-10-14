import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AboutPage, AboutPageFormData } from "@/types";

const ABOUT_COLLECTION = "aboutPage";
const ABOUT_DOC_ID = "main"; // Single document for about page

/**
 * Get about page data
 */
export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const docRef = doc(db, ABOUT_COLLECTION, ABOUT_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        officeDescription: data.officeDescription || "",
        officeImageUrl: data.officeImageUrl || "",
        lawyerName: data.lawyerName || "",
        lawyerBio: data.lawyerBio || "",
        lawyerImageUrl: data.lawyerImageUrl || "",
        officeEditorStateJSON: data.officeEditorStateJSON ?? null,
        lawyerEditorStateJSON: data.lawyerEditorStateJSON ?? null,
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching about page:", error);
    throw error;
  }
}

/**
 * Create or update about page data
 */
export async function updateAboutPage(data: AboutPageFormData): Promise<void> {
  try {
    const docRef = doc(db, ABOUT_COLLECTION, ABOUT_DOC_ID);

    await setDoc(
      docRef,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating about page:", error);
    throw error;
  }
}

/**
 * Initialize about page with default data (for first-time setup)
 */
export async function initializeAboutPage(): Promise<void> {
  try {
    // Check if already exists
    const existing = await getAboutPage();
    if (existing) {
      console.log("About page already initialized");
      return;
    }

    // Create default data
    const defaultData: AboutPageFormData = {
      officeDescription:
        "<p>Şen Hukuk Bürosu olarak, müvekkillerimize en kaliteli hukuki hizmeti sunmak ve haklarını en iyi şekilde korumak için çalışıyoruz. Yılların verdiği tecrübe ve deneyimle, her davaya özel strateji geliştirerek, en iyi sonuçları elde etmeyi hedefliyoruz.</p><p>Hukuk büromuz, müvekkil memnuniyetini ön planda tutarak, profesyonel ve güvenilir hukuki danışmanlık hizmeti vermektedir. Etik değerlere bağlı kalarak, adaletin tecelli etmesi için çalışıyoruz.</p><p>Sürekli gelişen hukuk dünyasını yakından takip ederek, müvekkillerimize en güncel ve etkili çözümleri sunuyoruz. Uzman kadromuzla birlikte, her türlü hukuki sorunda yanınızdayız.</p>",
      officeImageUrl: "", // No default image, admin will upload via Vercel Blob
      lawyerName: "Av. Mehmet Durdu Şen",
      lawyerBio:
        "<p>Avukat Mehmet Durdu Şen, hukuk eğitimini tamamladıktan sonra mesleki tecrübesini bireysel ve kurumsal müvekkillere sunduğu hukuki danışmanlık hizmetleriyle pekiştirmiştir. Başta aile hukuku, iş hukuku, ceza hukuku ve ticaret hukuku olmak üzere birçok alanda faaliyet göstermektedir.</p><p>Av. Mehmet Durdu Şen, her dosyaya özenle yaklaşarak müvekkillerinin haklarını en etkin biçimde korumayı ve adaletin sağlanmasına katkıda bulunmayı temel ilke edinmiştir.</p>",
      lawyerImageUrl: "", // No default image, admin will upload via Vercel Blob
    };

    await updateAboutPage(defaultData);
    console.log("About page initialized with default data");
  } catch (error) {
    console.error("Error initializing about page:", error);
    throw error;
  }
}
