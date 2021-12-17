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

export const modifyUser = async (uid, email, role, name, lastname, active) => {
  return putDataToURL(`/edit/${uid}`, {}, 
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
  return fetchFromURL('/courses/getTop5Courses', {
    randomText: search.text,
    suscription: search.subType,
    category: search.catTypes.toString(),
  });
}

export const createCourse = async (course) => {
  const today = new Date(Date.now());
  const body = JSON.stringify({ 
    name: course.name,
    description: course.description,
    country: course.country,
    category: course.category,
    tags: course.tags,
    suscriptionIncluded: SUBCRIPTIONS_TYPES.filter((u, i) => 
      i <= SUBCRIPTIONS_TYPES.indexOf(course.suscriptionIncluded)
    ),
    published: 'false',
    creatorId: course.creatorId,
    creationDate: today.toISOString(),
    lastModificationDate: today.toISOString(),
  })

  return postDataToURL('/courses', {}, body);
}

