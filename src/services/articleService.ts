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

// Get articles by tag slug
export async function getArticlesByTag(tagSlug: string): Promise<Article[]> {
  try {
    const articlesRef = collection(db, COLLECTION_NAME);
    const q = query(
      articlesRef,
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];
    const { slugifyTR } = await import("@/lib/slugify");

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const tags = (data.tags as string[]) || [];
      // Check if any tag matches the slug (case-insensitive slug comparison)
      const hasMatchingTag = tags.some(
        (tag) => slugifyTR(tag) === tagSlug
      );

      if (hasMatchingTag) {
        articles.push({
          id: doc.id,
          ...data,
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
        } as Article);
      }
    });

    return articles;
  } catch (error) {
    console.error("Error getting articles by tag:", error);
    throw error;
  }
}

// Get all tag slugs with article count (for sitemap)
export async function getAllTagSlugsWithCount(): Promise<
  Array<{ slug: string; count: number }>
> {
  try {
    const articles = await getArticles(true); // Only published
    const { slugifyTR } = await import("@/lib/slugify");
    const tagCountMap = new Map<string, number>();

    articles.forEach((article) => {
      const tags = article.tags || [];
      tags.forEach((tag) => {
        const slug = slugifyTR(tag);
        tagCountMap.set(slug, (tagCountMap.get(slug) || 0) + 1);
      });
    });

    return Array.from(tagCountMap.entries()).map(([slug, count]) => ({
      slug,
      count,
    }));
  } catch (error) {
    console.error("Error getting tag slugs with count:", error);
    return [];
  }
}

// Get related articles by category and tags (excluding current article)
export async function getRelatedArticles(
  category: string,
  currentArticleId: string,
  currentArticleTags: string[] = [],
  count = 3
): Promise<Article[]> {
  try {
    const articlesRef = collection(db, COLLECTION_NAME);
    const q = query(
      articlesRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(50) // Get more to score and filter
    );

    const querySnapshot = await getDocs(q);
    const { slugifyTR } = await import("@/lib/slugify");
    const currentTagSlugs = new Set(
      currentArticleTags.map((tag) => slugifyTR(tag))
    );

    const scoredArticles: Array<{ article: Article; score: number }> = [];

    querySnapshot.forEach((doc) => {
      // Exclude current article
      if (doc.id === currentArticleId) return;

      const data = doc.data();
      const article = {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Article;

      // Calculate score: (common tags × 2) + (same category × 1)
      const articleTags = (article.tags as string[]) || [];
      const articleTagSlugs = new Set(
        articleTags.map((tag) => slugifyTR(tag))
      );

      let score = 0;
      // Count common tags
      currentTagSlugs.forEach((tagSlug) => {
        if (articleTagSlugs.has(tagSlug)) {
          score += 2;
        }
      });
      // Same category bonus
      if (article.category === category) {
        score += 1;
      }

      if (score > 0) {
        scoredArticles.push({ article, score });
      }
    });

    // Sort by score (descending), then by date (descending)
    scoredArticles.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return (
        b.article.createdAt.getTime() - a.article.createdAt.getTime()
      );
    });

    // If we don't have enough scored articles, fill with same category
    if (scoredArticles.length < count) {
      const categoryQ = query(
        articlesRef,
        where("published", "==", true),
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        limit(count + 1)
      );
      const categorySnapshot = await getDocs(categoryQ);
      const existingIds = new Set(
        scoredArticles.map((s) => s.article.id)
      );
      existingIds.add(currentArticleId);

      categorySnapshot.forEach((doc) => {
        if (!existingIds.has(doc.id)) {
          const data = doc.data();
          scoredArticles.push({
            article: {
              id: doc.id,
              ...data,
              createdAt: convertTimestamp(data.createdAt),
              updatedAt: convertTimestamp(data.updatedAt),
            } as Article,
            score: 0, // Lower priority
          });
        }
      });
    }

    return scoredArticles.slice(0, count).map((s) => s.article);
  } catch (error) {
    console.error("Error getting related articles:", error);
    throw error;
  }
}
