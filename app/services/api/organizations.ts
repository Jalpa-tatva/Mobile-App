import {RequestBuilder} from './api';

export const getOrganizationsEventList = (
  longitude: number,
  latitude: number,
) => {
  return RequestBuilder(
    // `/api/profileList?format=json&radius=1&fixed=true&longitude=${longitude}&latitude=${latitude}&sort=nearby&includeProfile=true&items=40`,
    `/api/profileList?format=json&radius=30&fixed=true&longitude=${longitude}&latitude=${latitude}&category=organizations%2CSupport&sort=nearby&includeProfile=true&items=100`,
    //condi`/api/profileList?format=json&radius=30&fixed=true&longitude=${Platform.OS==='android'?latitude:longitude}&latitude=${Platform.OS==='android'?longitude:latitude}&category=Places&sort=nearby&includeProfile=true&items=40`,
    // `/api/eventList?format=json&category=Groups&view=connected&sort=upcoming&startDateOffset=-21600000&page=${page}&items=10`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const getMarkerEventList = () => {
  return RequestBuilder(
    // `/api/profileList?format=json&radius=1000&fixed=true&category=organizations%2CSupport&subcategory=Care&sort=nearby&includeProfile=true&items=40`,
    // `api/advisorList?specifiedBadge=Expert&latitude=${latitude}&longitude=${longitude}0&radius=1`,
    `/api/profileList?format=json&radius=300&fixed=true&category=organizations%2CSupport&subcategory=Care&includeProfile=true&items=40`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const RequestTojoinOrg = (uniqueId: string, request: string) => {
  const formData = new FormData();
  formData.append('profile', uniqueId);
  formData.append('action', 'join');
  formData.append('reason', request);
  return RequestBuilder(
    `/api/profileMembership?format=json`,
    formData,
    'POST',
    {},
    null,
    null,
    null,
  );
};

export const getWikiDetails = (id: string) => {
  return RequestBuilder(
    // `/api/profileList?view=mine&category=Groups&subcategory=care&&items=10&page=${page}&format=json&fields=openTicketsCount`,
    `/api/wiki?format=json&profile=${id}`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const getMyOrgVideoList = (page: number, uniqueId: string) => {
  return RequestBuilder(
    // `/api/videoList?profile=${uniqueId}&category=organizations&items=5&page=${page}&format=json`,
    // `/api/videoList?profile=${uniqueId}&format=json`,
    `/api/videoList?profile=${uniqueId}&category=groups&items=5&page=${page}&format=json`,

    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const getMyOrgDocument = (page: number, uniqueId: string) => {
  return RequestBuilder(
    `/api/documentList?profile=${uniqueId}&category=Organizations&items=5&page=${page}&format=json`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const addNewOrg = (formData: any) => {
  return RequestBuilder(
    `/api/profile?format=json`,
    formData,
    'POST',
    {},
    null,
    null,
    null,
  );
};
