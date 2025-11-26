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
import { ensureUniqueSlug } from "@/lib/slugify";

const COLLECTION_NAME = "articles";

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

async function slugExists(slug: string, excludeArticleId?: string): Promise<boolean> {
  const articlesRef = collection(db, COLLECTION_NAME);
  const q = query(articlesRef, where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return false;
  }

  const doc = snapshot.docs[0];
  if (excludeArticleId && doc.id === excludeArticleId) {
    return false;
  }

  return true;
}

async function resolveUniqueSlug(title: string, excludeArticleId?: string): Promise<string> {
  return ensureUniqueSlug(title, (candidate) => slugExists(candidate, excludeArticleId));
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
      legacySlugs: data.legacySlugs ?? [],
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: convertTimestamp(data.updatedAt),
    } as Article;
  } catch (error) {
    console.error("Error getting article by slug:", error);
    throw error;
  }
}

export async function getArticleByLegacySlug(
  legacySlug: string
): Promise<Article | null> {
  try {
    const articlesRef = collection(db, COLLECTION_NAME);
    const q = query(
      articlesRef,
      where("legacySlugs", "array-contains", legacySlug),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();

    return {
      id: docSnap.id,
      ...data,
      legacySlugs: data.legacySlugs ?? [],
      createdAt: convertTimestamp(data.createdAt),
      updatedAt: convertTimestamp(data.updatedAt),
    } as Article;
  } catch (error) {
    console.error("Error getting article by legacy slug:", error);
    throw error;
  }
}

export async function getArticleMetaBySlug(
  slug: string
): Promise<{
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string | null;
  author?: string;
  publishedAt?: string;
  modifiedAt?: string;
} | null> {
  const article = await getArticleBySlug(slug);
  if (!article) return null;

  const publishedAt =
    article.createdAt instanceof Date
      ? article.createdAt.toISOString()
      : undefined;
  const modifiedAt =
    article.updatedAt instanceof Date
      ? article.updatedAt.toISOString()
      : publishedAt;

  return {
    slug: article.slug,
    title: article.title,
    description: article.excerpt,
    imageUrl: article.imageUrl,
    author: article.author,
    publishedAt,
    modifiedAt,
  };
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        legacySlugs: data.legacySlugs ?? [],
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
        editorStateJSON: data.editorStateJSON ?? null,
      } as Article;
    }
    return null;
  } catch (error) {
    console.error("Error getting article by ID:", error);
    throw error;
  }
}

{
  /*
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
*/
}
// Create new article
{
  /*
export async function createArticle(
  formData: ArticleFormData
): Promise<string> {
  try {
    const slug = await resolveUniqueSlug(formData.title);
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
*/
}

export async function createArticle(
  formData: ArticleFormData
): Promise<string> {
  try {
    const slug = await resolveUniqueSlug(formData.title);
    const now = new Date();

    const dateStr = now.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const articleData = {
      ...formData,
      editorStateJSON: formData.editorStateJSON ?? null, // ✅ güvence
      slug,
      legacySlugs: [],
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

export async function updateArticle(
  id: string,
  formData: Partial<ArticleFormData>
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Article not found");
    }

    const currentData = docSnap.data();
    const currentSlug = currentData.slug as string;
    const currentLegacy = Array.isArray(currentData.legacySlugs)
      ? currentData.legacySlugs
      : [];

    const updateData: Partial<ArticleFormData> & {
      updatedAt: Timestamp;
      slug?: string;
      legacySlugs?: string[];
    } = {
      ...formData,
      editorStateJSON: formData.editorStateJSON ?? null,
      updatedAt: Timestamp.fromDate(new Date()),
    };

    if (formData.title) {
      const nextSlug = await resolveUniqueSlug(formData.title, id);

      if (nextSlug !== currentSlug) {
        updateData.slug = nextSlug;
        updateData.legacySlugs = Array.from(
          new Set([...currentLegacy, currentSlug].filter(Boolean))
        );
      }
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

// Get related articles by category (excluding current article)
export async function getRelatedArticles(
  category: string,
  currentArticleId: string,
  count = 3
): Promise<Article[]> {
  try {
    const articlesRef = collection(db, COLLECTION_NAME);
    const q = query(
      articlesRef,
      where("published", "==", true),
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      limit(count + 1) // Get one extra in case current article is included
    );

    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];

    querySnapshot.forEach((doc) => {
      // Exclude current article
      if (doc.id !== currentArticleId) {
        const data = doc.data();
        articles.push({
          id: doc.id,
          ...data,
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
        } as Article);
      }
    });

    return articles.slice(0, count); // Return only the requested count
  } catch (error) {
    console.error("Error getting related articles:", error);
    throw error;
  }
}
