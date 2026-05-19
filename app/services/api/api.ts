import { Config } from "react-native-config";
import md5 from "md5";
import NetInfo from "@react-native-community/netinfo";
import Snackbar from "react-native-snackbar";
import { color } from "@app/theme";
import getApiInstance from "../apiConfig";
import { loadString } from "@app/utils/storage";
export async function RequestBuilder(
  endpoint: string,
  params: any,
  method: string,
  headers = {},
  authCheck: string,
  email: string,
  password: string
) {
  try {
    let user_detail = JSON.parse(await loadString("@LoginUser"));
    console.log("user_details ====>", Config);

    let parameters = params;
    const { apisInstance } = await getApiInstance();

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    const currentDate = date + "/" + month + "/" + year;

    if (authCheck === "AuthCheck") {
      const ha1 = md5(`${email}:${Config.REALM}:${password}`);
      const ha2 = md5(`${method}:` + endpoint);
      const responseHead = md5(ha1 + ":" + currentDate + ":" + ha2);
      const authHeaders = `Digest username="${email}" REALM="${Config.REALM}" nonce="${currentDate}" uri="${endpoint}" algorithm="MD5" response="${responseHead}"`;
      headers = { ...headers, Authorization: authHeaders };
    } else {
      console.log(user_detail, "Auth email & password");
      const email = user_detail?.email ? user_detail.email : Config.EMAIL;
      const password = user_detail?.password
        ? user_detail.password
        : Config.PASSWORD;
      const ha1 = md5(`${email}:${Config.REALM}:${password}`);
      const ha2 = md5(`${method}:` + endpoint);
      const responseHead = md5(ha1 + ":" + currentDate + ":" + ha2);
      const authHeaders = `Digest username="${email}" REALM="${Config.REALM}" nonce="${currentDate}" uri="${endpoint}" algorithm="MD5" response="${responseHead}"`;
      headers = { ...headers, Authorization: authHeaders };
    }

    NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
      } else {
        Snackbar.show({
          text: "No Internet Connection: Please use your cellular data or wifi network connection...",
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.red,
          textColor: color.white,
          numberOfLines: 5,
        });
      }
    });

    let response: any;
    console.log("Request URL endpoint::", endpoint);
    console.log("params===>>>", parameters);

    if (method.toLowerCase() === "get" || method.toLowerCase() === "delete") {
      response = await apisInstance[method.toLowerCase()](
        endpoint,
        { headers },
        parameters
      );
      console.log("===== response =====", response);
    } else {
      response = await apisInstance[method.toLowerCase()](
        endpoint,
        parameters,
        { headers }
      );
    }
    return await Promise.resolve(response);
  } catch (error) {
    return await Promise.resolve(error);
  }
}
