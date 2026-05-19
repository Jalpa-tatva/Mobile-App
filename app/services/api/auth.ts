import {endPoint} from '@app/constants';
import {RequestBuilder} from './api';

export const checkAuthorization = (email: string, password: string) => {
  return RequestBuilder(
    endPoint.site,
    null,
    'GET',
    {},
    'AuthCheck',
    email,
    password,
  );
};

interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  organization: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  mobileno: string;
}
export const registerUser = (userData: RegisterUserData) => {
  const formData = new FormData();
  formData.append('firstName', userData.firstName);
  formData.append('lastName', userData.lastName);
  formData.append('email', userData.email);
  // formData.append('confirmEmail', userData.confirmEmail);
  formData.append('password', userData.password);
  formData.append('confirmPassword', userData.confirmPassword);
  formData.append('organization', userData.organization);
  formData.append('country', userData.country);
  formData.append('city', userData.city);
  formData.append('state', userData.state);
  formData.append('postalCode', userData.postalCode);
  formData.append('mobileno', userData.mobileno);

  console.log('registerUseruserData', userData);

  // for (var key in userData) {
  //   formData.append(key, userData[key]);
  // }

  return RequestBuilder(
    endPoint.registerUser,
    formData,
    'POST',
    {},
    null,
    null,
    null,
  );
};
interface DeviceTokenPayload {
  uniqueId: string;
  token: string;
  type: string;
}
export const saveDeviceToken = (userTokenData: DeviceTokenPayload) => {
  const formData = new FormData();
  formData.append('uniqueId', userTokenData.uniqueId);
  formData.append('token', userTokenData.token);
  formData.append('type', userTokenData.type);

  console.log('registerUserTokenData', userTokenData);

  return RequestBuilder(
    endPoint.deviceToken,
    formData,
    'POST',
    {},
    null,
    null,
    null,
  );
};
