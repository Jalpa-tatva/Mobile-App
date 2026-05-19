import { endPoint } from "@app/constants";
import { RequestBuilder } from "./api";

export const getMySettings = () => {
  return RequestBuilder(
    `/api/settings?format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getMyPicture = (uniqueId: string) => {
  return RequestBuilder(
    `/api/profile?profile=${uniqueId}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getSupportSite = () => {
  return RequestBuilder(
    endPoint.supportSite,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getHelp = () => {
  return RequestBuilder(endPoint.Help, null, "GET", {}, null, null, null);
};

export const getTerms = () => {
  return RequestBuilder(endPoint.terms, null, "GET", {}, null, null, null);
};

export const getFollowingList = (page: number) => {
  return RequestBuilder(
    `/api/profileList?category=Careteams&view=mine&sort=alpha&items=10&page=${page}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getConnectionList = (
  page: number,
  listType: string,
  query: string
) => {
  return RequestBuilder(
    `/api/profileList?category=people&view=${listType}&items=10&page=${page}&query=${query}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const addFriends = (uniqueId: string) => {
  const formData = new FormData();
  formData.append("profile", uniqueId);
  formData.append("action", "join");
  console.log("formdata : ", formData);

  return RequestBuilder(
    `/api/profileMembership?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const removeFriends = (uniqueId: string) => {
  const formData = new FormData();
  formData.append("profile", uniqueId);
  formData.append("action", "leave");
  console.log("formdata : ", formData);

  return RequestBuilder(
    `/api/profileMembership?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getInvitationList = (page: number) => {
  return RequestBuilder(
    `/api/profileRequestList?format=json&view=all&page=${page}&items=10`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const friendsRequestManagement = (action: string, uniqueId: string) => {
  const formData = new FormData();
  formData.append("id", uniqueId);
  formData.append("approve", action);

  return RequestBuilder(
    `/api/profileRequest?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const postMySettings = (userData: object) => {
  const formData = new FormData();
  for (var key in userData) {
    formData.append(key, userData[key]);
  }

  console.log("formData", formData);

  return RequestBuilder(
    `/api/settings?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const changePassword = (
  oldPassword: string,
  newPassword1: string,
  newPassword2: string
) => {
  const formData = new FormData();
  formData.append("oldPassword", oldPassword);
  formData.append("newPassword1", newPassword1);
  formData.append("newPassword2", newPassword2);
  console.log("formdata : ", formData);

  return RequestBuilder(
    `/api/changePassword?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};
