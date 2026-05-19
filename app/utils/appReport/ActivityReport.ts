// utils/trackApiEvent.ts

interface TrackApiEventParams {
  screen: string;
  endpoint: string;
  method?: string;
  status: number;
  response?: any;
  email?: string;
  messageKey?: string; // for i18n error translation
}

export const trackApiEvent = async ({
  screen,
  endpoint,
  method = 'GET',
  status,
  response,
  email,
  messageKey,
}: TrackApiEventParams) => {
  // const checkError = response?.data[0]?.status?.code;

  console.log('======Analytics Section======');
  // const isError = checkError === 1 ? 'Error' : 'No Error';
  // const errorMessage = messageKey ? messageKey : 'API Error';
  // const resultStatus = checkError === 1 ? 'Failure' : 'Success';
  // const cleanScreen = screen.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  //  2. If error, log it in Crashlytics too
  // if (
  //   (typeof response.data !== 'string' &&
  //     response?.data?.[0]?.status?.errorText === undefined) ||
  //   (Array.isArray(response?.data) &&
  //     response.data.length > 0 &&
  //     response.data[0]?.objectList?.length > 0)
  // ) {
  //   await analytics().setAnalyticsCollectionEnabled(true);
  //   await analytics().logEvent(`apicall_${cleanScreen}`, {
  //     screen,
  //     endpoint,
  //     method,
  //     resultStatus: `${status} - ${resultStatus}`,
  //     is_error: isError,
  //   });
  // } else {
  //   console.log('======Crarsh Section======');

  //   crashlytics().log(`${endpoint} failed on ${screen} with status ${status}`);
  //   crashlytics().setAttributes({
  //     screen,
  //     endpoint,
  //     method,
  //     status: `${String(status)} - ${resultStatus}`,
  //   });

  //   crashlytics().recordError(
  //     new Error(`${errorMessage}, ${JSON.stringify(response)}`),
  //   );
  // }

  // crashlytics().log(`${endpoint} failed on ${screen} with status ${status}`);
  // crashlytics().setAttributes({
  //   screen,
  //   endpoint,
  //   method,
  //   status: `${String(status)} - ${resultStatus}`,
  // });

  // crashlytics().recordError(
  //   new Error(`${errorMessage}, ${JSON.stringify(response)}`),
  // );
};
