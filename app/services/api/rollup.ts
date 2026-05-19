import { RequestBuilder } from "./api";

export const getUpcomingEventList = (page: number) => {
  return RequestBuilder(
    // `/api/eventList?category=Groups&eventType=view&view=connected&startDateOffset=21600000&format=json&page=${page}&items=10`,
    `/api/eventList?format=json&category=Careteams&view=connected&sort=upcoming&startDateOffset=-21600000&page=${page}&items=10`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getPreviousEventList = (page: number) => {
  return RequestBuilder(
    //`/api/eventList?category=Groups&eventType=view&view=connected&endDateOffset=21600000&format=json&page=${page}&items=10`,
    `/api/eventList?format=json&category=Careteams&view=connected&sort=new&endDateOffset=21600000&page=${page}&items=10`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const getEventDetails = (eventId: any) => {
  return RequestBuilder(
    `/api/event/${eventId}?format=json`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const evetAttachments = (eventId: string) => {
  return RequestBuilder(
    `api/eventImage?eventId=${eventId}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};

export const deleteEventAttachment = (imageId: string, eventId: string) => {
  const formData = new FormData();
  formData.append("fid", imageId);
  formData.append("eventId", eventId);
  return RequestBuilder(
    `api/deleteEventImage?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};
export const eventAttachments = (eventId: string) => {
  return RequestBuilder(
    `api/eventImage?eventId=${eventId}`,
    null,
    "GET",
    {},
    null,
    null,
    null
  );
};
export const addEventAttachment = (
  deleteFile: boolean,
  imageId: string,
  eventId: string
) => {
  const formData = new FormData();
  formData.append("deleteFiles", false);
  formData.append("eventId", eventId);
  return RequestBuilder(
    `api/deleteEventImage?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const deleteEvent = (profile: string, eventId: string) => {
  const formData = new FormData();
  formData.append("profile", profile);
  formData.append("eventId", eventId);

  return RequestBuilder(
    `/api/deleteEvent?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};

export const deleteEventImage = (eventId: string) => {
  const formData = new FormData();
  formData.append("eventId", eventId);

  return RequestBuilder(
    `/api/deleteEventImage?format=json`,
    formData,
    "POST",
    {},
    null,
    null,
    null
  );
};
