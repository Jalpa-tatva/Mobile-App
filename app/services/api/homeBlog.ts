import {RequestBuilder} from './api';

export const getHomeBlogList = (page: number) => {
  return RequestBuilder(
    // `/api/profileList?view=mine&category=Groups&subcategory=care&&items=10&page=${page}&format=json&fields=openTicketsCount`,
    `/api/blogList?format=json&profile=main-profile&page=${page}&items=10&sort=alpha`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};


export const getBlogDetails = (id: number) => {
  return RequestBuilder(
    // `/api/profileList?view=mine&category=Groups&subcategory=care&&items=10&page=${page}&format=json&fields=openTicketsCount`,
    `/api/blog/${id}`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const getBlogCommentList = (newsId: number, page: number) => {
  return RequestBuilder(
    // `/api/profileList?view=mine&category=Groups&subcategory=care&&items=10&page=${page}&format=json&fields=openTicketsCount`,
    `/api/commentBlogList?format=json&newsId=${newsId}&page=${page}&items=10`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const addComment = (formData: any) => {
  return RequestBuilder(
    `/api/commentBlog?format=json`,
    formData,
    'POST',
    {},
    null,
    null,
    null,
  );
};

export const addNewBlog = (formData: any) => {
  return RequestBuilder(
    `/api/blog?format=json`,
    formData,
    'POST',
    {},
    null,
    null,
    null,
  );
};