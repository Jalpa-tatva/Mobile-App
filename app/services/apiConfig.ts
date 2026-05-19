// import external libraries
// import {load} from '@app/utils/keychain';

import axios from "axios";
import { Config } from "react-native-config";

const getApiInstance = async () => {
  const apisInstance = axios.create({
    baseURL: Config.BASE_URL,
    timeout: 30000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Concursive-Key": Config.AUTH_KEY,
      "X-Concursive-Platform": "ios",
    },
  });
  return { apisInstance };
};

export default getApiInstance;
