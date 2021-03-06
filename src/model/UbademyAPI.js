import { deleteDataFromURL, fetchFromURL, postDataToURL, putDataToURL } from './FetchAPI';

export const login = async (email, password, expo_token) => {
  return postDataToURL(`/auth/login`, {}, { email: email, password: password, expo_token });
}

export const socialLogin = async (token, method) => {
  return postDataToURL(`/auth/social`, {}, { token, method });
}

export const register = async (email, password, role, name, lastname, uid = undefined) => {
  return postDataToURL(`/users/create`, {}, { 
    email: email, 
    password: password,
    name: name, 
    role: role,
    lastname: lastname,
    uid: uid
  });
}

export const addCategory = async (uid, category) => {
  return postDataToURL(`users/${uid}/addCategory`, {}, 
  { 
    category: category
  });
}

export const deleteCategory = async (uid, category) => {
  return deleteDataFromURL(`users/${uid}/deleteCategory`, {}, 
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

export const getUserCourses = async (uid) => {
  return fetchFromURL('/courses/getUserCourses', {userId: uid});
}

export const getStudents = async (cid) => {
  return fetchFromURL('/courses/getStudents', {id: cid});
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

export const addCollaborators = async (cid, collabs) => {
  return putDataToURL(`/courses/${cid}/addCollaborators`, {}, collabs);
}

export const addExamResolution = async (cid, unitName, body) => {
  return putDataToURL(`/courses/${cid}/addExamResolution`, {unitName}, body);
}

export const getTop5 = async () => {
  return fetchFromURL('/courses/getTop5Courses')
}

export const getRecommendations = async (uid, country, categories) => {
  return fetchFromURL('/courses/searchCoursesByCountryAndCategory', {
    userId: uid,
    country: country,
    category: categories.toString(),
  })
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
  return fetchFromURL('/courses/searchByText', {
    randomText: search.text,
    suscription: search.subType,
    category: search.catTypes.toString(),
  });
}

export const createCourse = async (course) => {
  return postDataToURL('/courses', {}, JSON.stringify(course));
}

export const subscribe = async (uid, subscription) => {
  return postDataToURL(`/users/${uid}/subscribe`, {}, {
    subscription: subscription.toUpperCase()
  });
}

export const unsubscribe = async (uid) => {
  return postDataToURL(`/users/${uid}/cancelSubscription`, {}, {});
}

export const subscribeCourse = async (cid, uid) => {
  return putDataToURL(`/courses/${cid}/addStudents`, {}, [uid]);
}

export const unsubscribeCourse = async (cid, uid) => {
  return putDataToURL(`/courses/${cid}/removeStudent`, {}, {studentId: uid});
}
