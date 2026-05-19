import {RequestBuilder} from './api';

export const getPlaceEventList = (
  longitude: number,
  latitude: number,
  category: string,
  subCategory: string,
) => {
  return RequestBuilder(
    `/api/profileList?format=json&radius=30&fixed=true&longitude=${longitude}&latitude=${latitude}&${category}%2CSupport&subcategory=${subCategory}&sort=nearby&includeProfile=true&items=100`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};
export const getOrganizationsList = (longitude: number, latitude: number) => {
  return RequestBuilder(
    `/api/profileList?format=json&radius=30&fixed=true&longitude=${longitude}&latitude=${latitude}&category=organizations%2CSupport&subcategory=Care&sort=nearby&includeProfile=true&items=100`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const getMarkerEventList = (subCategory: string) => {
  return RequestBuilder(
    `/api/profileList?format=json&radius=300&fixed=true&&category=organizations%2CSupport&subcategory=${subCategory}&sort=nearby&includeProfile=true&items=40`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const getResourceList = (category: string, subCategrory: string) => {
  return RequestBuilder(
    `api/profileList?format=json&radius=300&fixed=true&category=${category}&subcategory=${subCategrory}&sort=nearby&includeProfile=true&items=40`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const getCategoryList = (category: string) => {
  return RequestBuilder(
    `/api/categoryList?parentCategory=${category}&items=100`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};
