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

export const modifyUser = async (uid, email, password, role, name, lastname) => {
  return putDataToURL(`/edit/:${uid}`, 
  {
    uid: uid,
  }, 
  { 
    email: email, 
    password: password,
    name: name, 
    role: role,
    lastname: lastname,
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

export const getUserTrajectory = async (userId) => {
  return fetchFromURL(`/users/trajectory/${userId}`);
}

export const getCourses = async () => {
  return fetchFromURL('/courses');
}

