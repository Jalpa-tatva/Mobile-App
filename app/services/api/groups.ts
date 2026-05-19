import { RequestBuilder } from "./api";

export const getMyGroupList = (page: number) => {
  return RequestBuilder(
    // `/api/profileList?view=mine&category=Careteams&subcategory=care&&items=10&page=${page}&format=json&fields=openTicketsCount`,
    `/api/profileList?format=json&view=mine&category=Careteams%2CSupport&subcategory=Care&page=${page}&items=14&sort=alpha&fields=uniqueId,privacyType,title,description,webPage,category,categoryLabel,subcategory,parentCategory,imageUrl,imageWidth,imageHeight,mapMarkerUrl,profileBannerImageUrl,lastCheckInDate,address,location,latitude,longitude,distance,distanceKm,memberCount,needsApprovalCount,readCount,ratingCount,ratingValue,ratingAverage,userRatingValue,teamMemberId,isActiveMember,isPendingMember,canJoin,canRequestToJoin,canLeave,canInvite,canEditTeam,canShare,canVote,canEditInfo,canCreateNotifications,canDeleteProfile,canPostActivity,canPostPhotos,canPostTopics,canAddIssues,canPostEvents,canPostProfileImages,canEditTaskFolders,canEditTasks,canAddProfiles,lastActivity,nextEvent,openTicketsCount,documentsCount,videosCount,sensorsCount`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getMyDocument = (uniqueId) => {
  return RequestBuilder(
    `/api/documentList?profile=${uniqueId}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};
export const postActivityEmoji = (
  messageId: string,
  emoji: string,
  isDelete: boolean,
  profile: string
) => {
  const formData = new FormData();
  formData.append("activityId", messageId);
  formData.append("emoji", emoji);
  formData.append("profile", profile);
  formData.append("delete", isDelete);
  console.log("form data of post ", formData);

  return RequestBuilder(
    `/api/messageReact`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};
export const addNewGroup = (formData: any) => {
  return RequestBuilder(
    `/api/profile?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getIndividualMessages = (page: number, search: string) => {
  return RequestBuilder(
    // https://valucompassexperts.com/
    `api/allConversations?conversationType=People&items=10&page=${page}&search=${search}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getProfile = (profile: string) => {
  return RequestBuilder(
    `api/profile?profile=${profile}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};
export const getgroupMessages = (page: number, search: string) => {
  return RequestBuilder(
    `/api/allConversations?items=10&page=${page}&conversationType=Careteams&search=${search}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};
export const getMessageDetail = (profile: string, page: number) => {
  return RequestBuilder(
    `/api/getConversationHistory?items=10&page=${page}&profile=${profile}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const postMessage = (
  profile: string,
  message: string,
  fcmtoken: string
) => {
  // console.log("CHECK123",profile, message)
  const formData = new FormData();
  formData.append("profile", profile);
  // formData.append('subject', subject);
  formData.append("message", message);
  formData.append("token", fcmtoken);
  // formData.append('conversationId', conversationId);
  console.log("form data of post ", formData);
  return RequestBuilder(
    `/api/sendMessage`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const postEmoji = (
  messageId: string,
  emoji: string,
  isDelete: boolean,
  profile: string
) => {
  const formData = new FormData();
  formData.append("messageId", messageId);
  formData.append("emoji", emoji);
  formData.append("profile", profile);
  isDelete && formData.append("delete", isDelete);
  console.log("form data of post ", formData);

  return RequestBuilder(
    `/api/messageReact`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getMyAlbumList = (uniqueId) => {
  return RequestBuilder(
    `/api/albumList?profile=${uniqueId}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getActivityList = (
  page: number,
  uniqueId: string,
  id?: string,
  loadReplies?: boolean
) => {
  let query = `/api/statusList?profile=${uniqueId}&items=10&page=${page}&format=json&events=broadcast-entry%2Cuser-entry%2Cblog%2Cclassified%2Ccheck-in%2Cfitbit-steps`;

  if (id) {
    query += `&parentId=${id}`;
  }
  if (typeof loadReplies !== "undefined") {
    query += `&loadReplies=${loadReplies}`;
  }
  console.log("query", query);

  return RequestBuilder(query, null, "GET", {}, null, null, null);
};

export const getUserFitnessHistoryDataPage = (
  uniqueId: string,
  deviceName: string,
  userId: string,
  // page_no: number,
  start_date: string,
  end_date: string,
  order: string
) => {
  if (start_date) {
    return RequestBuilder(
      `/api/userFitenessData?profile=${uniqueId}&type=filter&format=json&deviceName=${deviceName}&userId=${userId}&start_date=${start_date}&end_date=${end_date}&order=${order}`,
      null,
      "GET",
      {},
      null,
      null,
      null
    );
  } else {
    return RequestBuilder(
      `/api/userFitenessData?profile=${uniqueId}&type=filter&format=json&deviceName=${deviceName}&userId=${userId}&order=${order}`,
      null,
      "GET",
      {},
      null,
      null,
      null
    );
  }
};

export const postUpdateStatus = (
  uniqueId: string,
  body: string,
  token: string,
  id?: string
) => {
  const formData = new FormData();
  formData.append("profile", uniqueId);
  formData.append("body", body);
  formData.append("token", token);
  formData.append("notifyAll", "yes");
  id && formData.append("replyParentId", id);

  console.log("formdata is rendering", formData);

  return RequestBuilder(
    `/api/status?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const postProfileBackground = (formData: any) => {
  return RequestBuilder(
    `/api/profileBackground?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getProfileBackground = (uniqueId: string) => {
  return RequestBuilder(
    `/api/profileBackground?profile=${uniqueId}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getPersonalHealthDetails = (uniqueId: string) => {
  return RequestBuilder(
    `/api/personalHealthDetails?profile=${uniqueId}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getfamilyHealthHistory = (uniqueId: string) => {
  return RequestBuilder(
    `/api/familyHealthDetails?profile=${uniqueId}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const postFamilyHealthHistory = (
  values: string,
  otherIssue: string,
  profile: string
) => {
  const formData = new FormData();
  formData.append("values", values);
  formData.append("otherIssue", otherIssue);
  formData.append("profile", profile);

  return RequestBuilder(
    `/api/familyHealthDetails?`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const postPersonalHealthDetails = (formData: any) => {
  console.log("formData", JSON.stringify(formData));

  return RequestBuilder(
    `/api/personalHealthDetails?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getHealthOverview = (uniqueId: string) => {
  return RequestBuilder(
    `/api/healthOverview?profile=${uniqueId}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const postHealthOverview = (formData: any) => {
  console.log("formData", JSON.stringify(formData));

  return RequestBuilder(
    `/api/healthOverview?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};
export const deleteDPTask = (
  endPoint: string,
  dpIdSt: string,
  profile: string,
  taskId: string
) => {
  return RequestBuilder(
    `/api/${endPoint}?profile=${profile}&${dpIdSt}=${taskId}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};
export const postPreviewReport = (formData: any) => {
  console.log("formData", JSON.stringify(formData));

  return RequestBuilder(
    `/api/sendReport?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getSendMonitorReportHistory = (uniqueId: string, page: number) => {
  return RequestBuilder(
    `/api/sendMonitorReportHistory?profile=${uniqueId}&page=${page}&items=10&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getManualDataEntry = (uniqueId: string) => {
  return RequestBuilder(
    `/api/manualDataEntry?profile=${uniqueId}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const postManualData = (formData: any) => {
  return RequestBuilder(
    `/api/manualDataEntry?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getTaskFolderList = (uniqueId: string) => {
  return RequestBuilder(
    `/api/taskFolderList?profile=${uniqueId}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};
export const getTaskFolderDetails = (uniqueId: string, folderId: string) => {
  return RequestBuilder(
    `/api/taskList?profile=${uniqueId}&folderId=${folderId}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getTaskFolderDetailsData = (
  uniqueId: string,
  folderId: number,
  taskId: number
) => {
  return RequestBuilder(
    `/api/taskList?profile=${uniqueId}&folderId=${folderId}&taskId=${taskId}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const deleteTask = (profile: string, taskId: string) => {
  const formData = new FormData();
  formData.append("profile", profile);
  formData.append("taskId", taskId);

  return RequestBuilder(
    `/api/deleteTask?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const editTask = (
  profile: string,
  folderId: string,
  taskId: string,
  description: string,
  notes: string,
  assignedTo: string,
  priority: any,
  completed: string
) => {
  const formData = new FormData();
  formData.append("profile", profile);
  formData.append("folderId", folderId);
  formData.append("taskId", taskId);
  formData.append("description", description);
  formData.append("notes", notes);
  formData.append("assignedTo", assignedTo);
  formData.append("priority", priority);
  formData.append("completed", completed);

  return RequestBuilder(
    `/api/task?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const addTask = (
  profile: string,
  folderId: string,
  description: string,
  notes: string,
  assignedTo: string,
  priority: any,
  completed: string
) => {
  const formData = new FormData();
  formData.append("profile", profile);
  formData.append("folderId", folderId);
  formData.append("description", description);
  formData.append("notes", notes);
  formData.append("assignedTo", assignedTo);
  formData.append("priority", priority);
  formData.append("completed", completed);

  return RequestBuilder(
    `/api/task?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getMineMemberList = (uniqueId: string) => {
  return RequestBuilder(
    `/api/memberList?profile=${uniqueId}&view=mine&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getClosedIssueList = (page: number, uniqueId: string) => {
  return RequestBuilder(
    `/api/issueList?profile=${uniqueId}&view=closed&items=10&page=${page}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getOpenIssueList = (page: number, uniqueId: string) => {
  return RequestBuilder(
    `/api/issueList?profile=${uniqueId}&view=open&items=10&page=${page}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const closeIssue = (
  solution: string,
  issueId: string,
  close: boolean,
  token?: string
) => {
  const formData = new FormData();
  formData.append("close", close);
  formData.append("solution", solution);
  formData.append("issueId", issueId);
  formData.append("token", token);
  return RequestBuilder(
    `/api/issue?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const deleteIssue = (
  profile: string,
  issueId: string,
  token?: string
) => {
  const formData = new FormData();
  formData.append("profile", profile);
  formData.append("issueId", issueId);
  formData.append("token", token);

  return RequestBuilder(
    `/api/deleteIssue?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getRxDrugList = (page: number, uniqueId: string) => {
  return RequestBuilder(
    `/api/bookmarkList?profile=${uniqueId}&items=10&page=${page}&folder=Medications&folderId=2128&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const searchRxDrugList = (page: number, query: string) => {
  return RequestBuilder(
    `/api/profileList?category=Drugs&query=${query}&items=10&page=${page}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const addDrug = (
  profileUniqueId: string,
  uniqueId: string,
  customDataDosage: string,
  customDataFrequency: string,
  customDataMedicationForm: string,
  note: string
) => {
  let cdata = {
    customDataDosage: customDataDosage,
    customDataFrequency: customDataFrequency,
    customDataMedicationForm: customDataMedicationForm,
  };

  const formData = new FormData();
  formData.append("profileUniqueId", profileUniqueId);
  formData.append("list", "Medications");
  formData.append("uniqueId", uniqueId);
  formData.append("customData", JSON.stringify(cdata));
  formData.append("notes", note);

  return RequestBuilder(
    `/api/bookmark?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const deleteRxDrug = (bookmarkId: string, uniqueId: string) => {
  const formData = new FormData();
  formData.append("bookmarkId", bookmarkId);
  formData.append("id", "menny-grp");
  formData.append("list", "Medications");
  formData.append("profileUniqueId", "menny-grp");
  formData.append("format", "json");
  //  `/api/bookmark?bookmarkId=269&profile=menny-grp&list=Medications&profileUniqueId=menny-grp&format=json`,

  return RequestBuilder(
    `/api/deleteBookmark?bookmarkId=${bookmarkId}&profile=${uniqueId}&list=Medications&profileUniqueId=${uniqueId}&format=json`,
    null,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const editDrug = (
  bookmarkId: string,
  profileUniqueId: string,
  uniqueId: string,
  customDataDosage: string,
  customDataFrequency: string,
  customDataMedicationForm: string,
  note: string
) => {
  let cdata = {
    customDataDosage: customDataDosage,
    customDataFrequency: customDataFrequency,
    customDataMedicationForm: customDataMedicationForm,
  };

  const formData = new FormData();
  formData.append("bookmarkId", bookmarkId);
  formData.append("profileUniqueId", profileUniqueId);
  formData.append("list", "Medications");
  formData.append("uniqueId", uniqueId);
  formData.append("customData", JSON.stringify(cdata));
  formData.append("notes", note);

  return RequestBuilder(
    `/api/bookmark?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getEventList = (uniqueId: string) => {
  return RequestBuilder(
    `/api/eventList?profile=${uniqueId}&view=mine&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const addEventGroup = (formData: any) => {
  console.log("formData", JSON.stringify(formData));

  return RequestBuilder(
    `/api/event?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const addProgressNote = (formData: any) => {
  return RequestBuilder(
    `/api/progressNotes?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getMyGroupPhotoList = (page: number, uniqueId: string) => {
  return RequestBuilder(
    // `/api/photoList?profile=${uniqueId}&category=${fromss=='Organization'?'qqqd'?'qdqd'}&items=15&page=${page}&format=json`,
    `/api/photoList?profile=${uniqueId}&items=15&page=${page}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getMyMemberList = (uniqueId: string) => {
  return RequestBuilder(
    `/api/memberList?profile=${uniqueId}&view=all&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const groupProfileManagement = (uniqueId: string, action: string) => {
  const formData = new FormData();
  formData.append("id", uniqueId);
  formData.append("action", action);

  return RequestBuilder(
    `/api/profileManagement?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const groupProfileChangeRole = (
  uniqueId: string,
  action: string,
  role: string
) => {
  const formData = new FormData();
  formData.append("id", uniqueId);
  formData.append("action", action);
  formData.append("role", role);

  return RequestBuilder(
    `/api/profileManagement?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const sendGroupInvitation = (uniqueIds: string, invites: any) => {
  const formData = new FormData();
  formData.append("uniqueId", uniqueIds);
  formData.append("invites", JSON.stringify(invites));

  return RequestBuilder(
    `/api/profileInvitation?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const searchInUser = (query: string, page?: number, item?: number) => {
  const count = item ? item + 10 : 10;
  return RequestBuilder(
    `/api/profileList?category=People&query=${query}&page=${page}&items=${count}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const inviteUsers = (uniqueId: string, invites: any[]) => {
  console.log("invites1111", invites);

  const formData = new FormData();
  formData.append("uniqueId", uniqueId);
  formData.append("invites", JSON.stringify(invites));
  return RequestBuilder(
    `/api/profileInvitation?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getMyGroupDocument = (page: number, uniqueId: string) => {
  return RequestBuilder(
    `/api/documentList?profile=${uniqueId}&category=Careteams&items=10&page=${page}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};
export const getDocuments = (uniqueId: string) => {
  return RequestBuilder(
    `/api/documents?profile=${uniqueId}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};
export const getMyGroupVideoList = (page: number, uniqueId: string) => {
  return RequestBuilder(
    `/api/videoList?profile=${uniqueId}&category=Careteams&items=5&page=${page}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getUserFitnessData = (uniqueId: string) => {
  return RequestBuilder(
    `/api/userFitenessData?profile=${uniqueId}&type=recent&format=json&order=desc`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getUserFitnessHistoryData = (
  uniqueId: string,
  deviceName: string,
  userId: string,
  page_no: number,
  start_date: string,
  end_date: string,
  order: string
) => {
  if (start_date) {
    return RequestBuilder(
      `/api/userFitenessData?profile=${uniqueId}&type=filter&format=json&deviceName=${deviceName}&userId=${userId}&page_no=${page_no}&items=4&start_date=${start_date}&end_date=${end_date}&order=${order}`,
      null,
      "GET",
      {},
      null,
      null,
      null
    );
  } else {
    return RequestBuilder(
      `/api/userFitenessData?profile=${uniqueId}&type=filter&format=json&deviceName=${deviceName}&userId=${userId}&page_no=${page_no}&items=4&order=${order}`,
      null,
      "GET",
      {},
      null,
      null,
      null
    );
  }
};

export const addUserFitnessData = (
  profile: string,
  deviceName: string,
  data: any
) => {
  const formData = new FormData();
  formData.append("profile", profile);
  formData.append("deviceName", deviceName);
  formData.append("data", JSON.stringify(data));

  return RequestBuilder(
    `/api/userFitenessData?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const editGroup = (formData: any) => {
  return RequestBuilder(
    `/api/profile?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const getVaccineListInitial = (profile: string) => {
  return RequestBuilder(
    `/api/vaccine?profile=${profile}&items=3&page_no=1&sort=desc`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getProgressNotes = (profile: string) => {
  return RequestBuilder(
    `/api/progressNotes?profile=${profile}&page_no=1&items=3`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getProgressNotesAll = (profile: string, page) => {
  return RequestBuilder(
    `/api/progressNotes?profile=${profile}&page_no=${page}&items=5`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getVaccineList = (profile: string, page: any) => {
  return RequestBuilder(
    `/api/vaccine?profile=${profile}&page_no=${page}&items=10&sort=desc`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const deleteAccount = (uniqueId: string) => {
  return RequestBuilder(
    `/api/deleteUser?profile=${uniqueId}&format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};
