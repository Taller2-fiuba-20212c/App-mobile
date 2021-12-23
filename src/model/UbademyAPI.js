import { deleteDataFromURL, fetchFromURL, postDataToURL, putDataToURL } from './FetchAPI';

export const login = async (email, password, expo_token) => {
  return postDataToURL(`/auth/login`, {}, { email: email, password: password, expo_token });
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
  return postDataToURL(`users/${uid}/addCategory`, {}, 
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

export const searchUsers = async (params) => {
  return fetchFromURL(`/users`, params);
}

export const getCourses = async () => {
  return fetchFromURL('/courses');
}

export const searchUsersLike = async (name) => {
  return fetchFromURL(`/users`, { name });
}

export const sendMessage = async (sender, receiver, msg) => {
  return postDataToURL('/messages', {}, { sender, receiver, msg });
}

export const getChats = async (uid) => {
  return fetchFromURL(`/chats/${uid}`);
}

export const getConversation = async (user1, user2) => {
  return fetchFromURL('/messages', { user1, user2 });
}

export const addUnit = async (cid, unit) => {
  return putDataToURL(`/courses/${cid}/addUnit`, {}, JSON.stringify(unit));
}

export const addExam = async (cid, unitName, body) => {
  return putDataToURL(`/courses/${cid}/addExam`, {unitName}, body);
}

export const addExamResolution = async (cid, unitName, body) => {
  return putDataToURL(`/courses/${cid}/addExamResolution`, {unitName}, body);
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
  console.log({
    randomText: search.text,
    suscription: search.subType,
    category: search.catTypes.toString(),
  })
  return fetchFromURL('/courses/searchByText', {
    randomText: search.text,
    suscription: search.subType,
    category: search.catTypes.toString(),
  });
}

export const createCourse = async (course) => {
  return postDataToURL('/courses', {}, JSON.stringify(course));
}
