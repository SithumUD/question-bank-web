import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc, updateDoc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBRQPIfqdVTSiL5LexiKAMV55iqT0Y8Pdw",
  authDomain: "qa-bank-a9c4c.firebaseapp.com",
  projectId: "qa-bank-a9c4c",
  storageBucket: "qa-bank-a9c4c.firebasestorage.app",
  messagingSenderId: "80803258459",
  appId: "1:80803258459:web:110f048129c6a6fa6f5f7e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Collections
const QUESTIONS_COLLECTION = 'questions';
const CATEGORIES_COLLECTION = 'categories';
const SUBCATEGORIES_COLLECTION = 'subcategories';
const TAGS_COLLECTION = 'tags';
const JOBS_COLLECTION = 'jobs';

// Question operations
const addQuestion = async (question) => {
  const docRef = doc(collection(db, QUESTIONS_COLLECTION));
  const questionWithDefaults = {
    ...question,
    id: docRef.id,
    dateAdded: new Date().toISOString(),
    lastReviewed: new Date().toISOString(),
    mastered: false,
    editHistory: []
  };
  await setDoc(docRef, questionWithDefaults);
  return docRef.id;
};

const updateQuestion = async (id, question) => {
  await updateDoc(doc(db, QUESTIONS_COLLECTION, id), question);
};

const deleteQuestion = async (id) => {
  await deleteDoc(doc(db, QUESTIONS_COLLECTION, id));
};

const getQuestions = async () => {
  const snapshot = await getDocs(collection(db, QUESTIONS_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Categories operations
const addCategory = async (name) => {
  const docRef = doc(collection(db, CATEGORIES_COLLECTION));
  await setDoc(docRef, { 
    name, 
    count: 0,
    createdAt: new Date().toISOString()
  });
  return { id: docRef.id, name, count: 0 };
};

const updateCategory = async (id, name) => {
  await updateDoc(doc(db, CATEGORIES_COLLECTION, id), { name });
};

const deleteCategory = async (id) => {
  await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
};

const getCategories = async () => {
  const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Subcategories operations
const addSubCategory = async (categoryId, name) => {
  const docRef = doc(collection(db, SUBCATEGORIES_COLLECTION));
  await setDoc(docRef, { 
    name, 
    categoryId,
    count: 0,
    createdAt: new Date().toISOString()
  });
  return { id: docRef.id, name, categoryId, count: 0 };
};

const updateSubCategory = async (id, name) => {
  await updateDoc(doc(db, SUBCATEGORIES_COLLECTION, id), { name });
};

const deleteSubCategory = async (id) => {
  await deleteDoc(doc(db, SUBCATEGORIES_COLLECTION, id));
};

const getSubCategories = async () => {
  const snapshot = await getDocs(collection(db, SUBCATEGORIES_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getTags = async () => {
  const snapshot = await getDocs(collection(db, TAGS_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Job operations
const addJob = async (job) => {
  const docRef = doc(collection(db, JOBS_COLLECTION));
  const jobWithDefaults = {
    ...job,
    id: docRef.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  await setDoc(docRef, jobWithDefaults);
  return docRef.id;
};

const updateJob = async (id, job) => {
  await updateDoc(doc(db, JOBS_COLLECTION, id), {
    ...job,
    updatedAt: new Date().toISOString()
  });
};

const deleteJob = async (id) => {
  await deleteDoc(doc(db, JOBS_COLLECTION, id));
};

const getJobs = async () => {
  const snapshot = await getDocs(collection(db, JOBS_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add these to your existing firebase operations

const getQuestionCountByCategory = async (categoryId) => {
  const snapshot = await getDocs(
    query(
      collection(db, QUESTIONS_COLLECTION),
      where("category", "==", categoryId)
    )
  );
  return snapshot.size;
};

const getQuestionCountBySubCategory = async (subCategoryId) => {
  const snapshot = await getDocs(
    query(
      collection(db, QUESTIONS_COLLECTION),
      where("subCategory", "==", subCategoryId)
    )
  );
  return snapshot.size;
};

export {
  db,
  auth,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategories,
  getQuestionCountByCategory,
  getQuestionCountBySubCategory,
  getTags,
  addJob,
  updateJob,
  deleteJob,
  getJobs
};