import { deleteDataFromURL, fetchFromURL, postDataToURL, putDataToURL } from './FetchAPI';

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

export const modifyUser = async (uid, email, role, name, lastname, active) => {
  return putDataToURL(`/edit/:${uid}`, {}, 
  { 
    email: email, 
    name: name, 
    role: role,
    lastname: lastname,
    active: active
  });
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

export const createCourse = async (course) => {
  return postDataToURL('/courses', {}, { 
    name: course.name, 
    description: course.description,
    country: course.country,
    category: course.category,
    suscriptionIncluded: course.subscriptionIncluded,
    creatorId: course.creatorId,
    tags: course.tags
  });
}

