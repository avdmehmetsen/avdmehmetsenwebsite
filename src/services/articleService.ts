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
  limit,
  Timestamp,
} from "firebase/firestore";
import { Article, ArticleFormData } from "@/types";

const COLLECTION_NAME = "articles";

// Helper function to convert Firestore timestamp to Date
function convertTimestamp(timestamp: any): Date {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  return new Date(timestamp);
}

// Helper function to create slug from title
export function createSlug(title: string): string {
  const turkishMap: { [key: string]: string } = {
    ç: "c",
    ğ: "g",
    ı: "i",
    İ: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    Ç: "c",
    Ğ: "g",
    Ö: "o",
    Ş: "s",
    Ü: "u",
  };

  return title
    .toLowerCase()
    .split("")
    .map((char) => turkishMap[char] || char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Get all articles (with optional filter for published only)
export async function getArticles(publishedOnly = false): Promise<Article[]> {
  try {
    const articlesRef = collection(db, COLLECTION_NAME);
    let q = query(articlesRef, orderBy("createdAt", "desc"));

    if (publishedOnly) {
      q = query(
        articlesRef,
        where("published", "==", true),
        orderBy("createdAt", "desc")
      );
    }

    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Article);
    });

    return articles;
  } catch (error) {
    console.error("Error getting articles:", error);
    throw error;
  }
}

// Get article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articlesRef = collection(db, COLLECTION_NAME);
    const q = query(articlesRef, where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: convertTimestamp(data.updatedAt),
    } as Article;
  } catch (error) {
    console.error("Error getting article by slug:", error);
    throw error;
  }
}

// Get article by ID
export async function getArticleById(id: string): Promise<Article | null> {
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
      } as Article;
    }
    return null;
  } catch (error) {
    console.error("Error getting article by ID:", error);
    throw error;
  }
}

// Create new article
export async function createArticle(
  formData: ArticleFormData
): Promise<string> {
  try {
    const slug = createSlug(formData.title);
    const now = new Date();

    // Format date as "DD Month YYYY" in Turkish
    const dateStr = now.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const articleData = {
      ...formData,
      slug,
      date: dateStr,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), articleData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
}

// Update article
export async function updateArticle(
  id: string,
  formData: Partial<ArticleFormData>
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData: any = {
      ...formData,
      updatedAt: Timestamp.fromDate(new Date()),
    };

    // If title is updated, update slug as well
    if (formData.title) {
      updateData.slug = createSlug(formData.title);
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
}

// Delete article
export async function deleteArticle(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
}

// Get latest articles (for homepage)
export async function getLatestArticles(count = 3): Promise<Article[]> {
  try {
    const articlesRef = collection(db, COLLECTION_NAME);
    const q = query(
      articlesRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(count)
    );

    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Article);
    });

    return articles;
  } catch (error) {
    console.error("Error getting latest articles:", error);
    throw error;
  }
}
