import { Client, Account, Databases } from 'appwrite';

const endpoint = process.env.APPWRITE_ENDPOINT || 'https://sfo.cloud.appwrite.io/v1';
const projectId = process.env.APPWRITE_PROJECT_ID || '6953629e0035b643ba39';

const client = new Client().setEndpoint(endpoint).setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };

// Helper to get database ID from env
export function getDatabaseId(): string {
  const dbId = process.env.APPWRITE_DATABASE_ID;
  if (!dbId) {
    throw new Error('APPWRITE_DATABASE_ID is not set in environment variables');
  }
  return dbId;
}

// Helper to get collection IDs from env
export function getCollectionId(collectionName: 'blog_posts' | 'projects' | 'blog_categories' | 'blog_images'): string {
  const envMap = {
    blog_posts: 'APPWRITE_BLOG_POSTS_COLLECTION_ID',
    projects: 'APPWRITE_PROJECTS_COLLECTION_ID',
    blog_categories: 'APPWRITE_BLOG_CATEGORIES_COLLECTION_ID',
    blog_images: 'APPWRITE_BLOG_IMAGES_COLLECTION_ID',
  };

  const envVar = envMap[collectionName];
  const collectionId = process.env[envVar];
  
  if (!collectionId) {
    throw new Error(`${envVar} is not set in environment variables`);
  }
  return collectionId;
}

