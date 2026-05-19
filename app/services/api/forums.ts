
import {RequestBuilder} from './api';

export const getMyMemberList = (uniqueId: string) => {
  return RequestBuilder(
    `/api/memberList?profile=${uniqueId}&view=all&format=json`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const getMyForumList = (page: number) => {
  return RequestBuilder(
    `/api/profileList?format=json&view=All&category=Forum&page=${page}&items=14&sort=alpha`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};


export const getForumList = (uniqueIds, page) => {
  console.log('uniqueIds', uniqueIds);
  console.log('page', page);
  return RequestBuilder(
    `/api/forumServices?profile=${uniqueIds}&action=getForumList&items=10&page=${page}`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const deleteForumList = (uniqueIds, forumId) => {
  console.log('uniqueIds', uniqueIds);
  return RequestBuilder(
    `/api/forumServices?profile=${uniqueIds}&forumId=${forumId}&action=deleteForum`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const addForum = (uniqueIds, subject, attachment) => {
  console.log('uniqueIds', uniqueIds);

  const formData = new FormData();

  formData.append('profile', uniqueIds);
  formData.append('subject', subject);
  formData.append('allowFileAttachments', attachment);
  formData.append('action', 'createForum');
  console.log('formData : ', formData);
  return RequestBuilder(
    `api/forumServices`,
    formData,
    'POST',
    {},
    null,
    null,
    null,
  );
};

export const editForum = (uniqueIds, subject, attachment, forumId) => {
  console.log('uniqueIds', uniqueIds);

  const formData = new FormData();

  formData.append('profile', uniqueIds);
  formData.append('subject', subject);
  formData.append('allowFileAttachments', attachment);
  formData.append('forumId', forumId);
  formData.append('action', 'createForum');

  return RequestBuilder(
    `api/forumServices`,
    formData,
    'POST',
    {},
    null,
    null,
    null,
  );
};

export const getTopicList = (uniqueIds, forumId, page) => {
  console.log('uniqueIds', uniqueIds);
  console.log('page', page);
  return RequestBuilder(
    `/api/forumTopicServices?profile=${uniqueIds}&forumId=${forumId}&items=10&page=${page}&action=topicListing`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const lockUnlock = (forumId, topicId, uniqueIds, locked) => {
  console.log('uniqueIds', uniqueIds);

  return RequestBuilder(
    `/api/forumServices?profile=${uniqueIds}&action=lockUnlockTopic&topicid=${topicId}&forumId=${forumId}&locked=${locked}`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};
export const stickyUnsticky = (forumId, topicId, uniqueIds, priority) => {
  console.log('uniqueIds', uniqueIds);

  return RequestBuilder(
    `/api/forumServices?profile=${uniqueIds}&action=stickyOrUnstick&topicid=${topicId}&forumId=${forumId}&priorityId=${priority}`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const getModeratorList = (uniqueIds, forumId) => {
  console.log('uniqueIds', uniqueIds);

  return RequestBuilder(
    `/api/forumServices?profile=${uniqueIds}&forumId=${forumId}&action=getForumModerater`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const saveModerator = (uniqueIds, forumId, moderatorId) => {
  const formData = new FormData();

  if (moderatorId !== '') {
    formData.append('moderatorsId', moderatorId);
  }
  formData.append('profile', uniqueIds);
  formData.append('forumId', forumId);
  formData.append('action', 'saveForumModerater');

  console.log('formData', formData);

  return RequestBuilder(
    `api/forumServices`,
    formData,
    'POST',
    {},
    null,
    null,
    null,
  );
};

export const deleteTopicList = (uniqueIds, forumId, topicId) => {
  console.log('uniqueIds', uniqueIds);
  return RequestBuilder(
    `/api/forumServices?profile=${uniqueIds}&forumId=${forumId}&topicid=${topicId}&action=deleteTopic`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const deleteReplyList = (uniqueIds,replyId) => {
  console.log('uniqueIds', uniqueIds);
  return RequestBuilder(
    `/api/forumTopicServices?profile=${uniqueIds}&replyId=${replyId}&action=deleteReplay`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const getReplyList = (uniqueIds,topicId ,page) => {
  console.log('uniqueIds', uniqueIds);
  console.log('page', page);
  return RequestBuilder(
    `/api/forumTopicServices?profile=${uniqueIds}&topicId=${topicId}&items=10&page=${page}&action=replyListing`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const inappropriateReply = (uniqueIds,replyId) => {
  console.log('uniqueIds', uniqueIds);
  return RequestBuilder(
    `/api/forumTopicServices?profile=${uniqueIds}&replyId=${replyId}&action=setTopicInAppropiate`,
    null,
    'GET',
    {},
    null,
    null,
    null,
  );
};

export const topicManagement = (uniqueIds,subject,forumId,issuedId,replyToId,answer) => {
  console.log("replyToId",replyToId);
  const formData = new FormData();
  formData.append('action', 'addReply');
  formData.append('profile', uniqueIds);
  formData.append('subject', subject);
  formData.append('forumId', forumId);
  formData.append('issuedId', issuedId);
  formData.append('replyToId', replyToId);
  formData.append('message', "yes");
  console.log("append",formData);
  formData.append('answer', answer);
  //return RequestBuilder(`api/forumTopicServices`, formData, "POST");  
  return RequestBuilder(
    `api/forumTopicServices`,
    formData,
    'POST',
    {},
    null,
    null,
    null,
  );
};

