import { deleteDataFromURL, fetchFromURL, postDataToURL, putDataToURL } from './FetchAPI';
import { SUBCRIPTIONS_TYPES } from '../consts';

export const login = async (email, password) => {
  return postDataToURL(`/auth/login`, {}, { email: email, password: password });
}

export const register = async (email, password, role, name, lastname) => {
  return postDataToURL(`/users/create`, {}, { 
    email: email, 
    password: password,
    name: name, 
    role: role,
    lastname: lastname,
  });
}

export const addCategory = async (uid, category) => {
  return putDataToURL(`users/${uid}/addCategory`, {}, 
  { 
    category: category
  });
}

export const modifyUser = async (uid, userInfo) => {
  return putDataToURL(`/users/edit/${uid}`, {}, userInfo);
}

export const deleteUser = async (email, password, name, lastname) => {
  return deleteDataFromURL(`/users/create`, {}, { 
    email: email, 
    password: password,
    name: name, 
    lastname: lastname,
  });
}

export const getUser = async (userId) => {
  return fetchFromURL(`/users/get/${userId}`);
}

export const getCourses = async () => {
  return fetchFromURL('/courses');
}

export const addUnit = async (cid, unit) => {
  return putDataToURL(`/courses/${cid}/addUnit`, {}, JSON.stringify(unit));
}

export const addExam = async (cid, body) => {
  return putDataToURL(`/courses/${cid}/addExam`, {}, JSON.stringify(body));
}

export const getTop5 = async () => {
  return fetchFromURL('/courses/getTop5Courses')
}

export const getCourse = async (id) => {
  return fetchFromURL('/courses/get', {id: id});
}

export const updateCourse = async (course) => {
  const today = new Date(Date.now());
  return putDataToURL(`/courses/${course.id}`, {}, 
  JSON.stringify({ 
    ...course,
    lastModificationDate: today.toISOString(),
  }));
}

export const searchCourses = async (search) => {
  return fetchFromURL('/courses/getTop5Courses', {
    randomText: search.text,
    suscription: search.subType,
    category: search.catTypes.toString(),
  });
}

export const createCourse = async (course) => {
  return postDataToURL('/courses', {}, JSON.stringify(course));
}

