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