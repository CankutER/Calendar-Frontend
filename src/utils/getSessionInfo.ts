import { Auth } from "aws-amplify";
export const getUserName = async (): Promise<string> => {
  const sessionInfo = await Auth.currentSession();
  const username = sessionInfo.getIdToken().payload["cognito:username"];
  return username;
};

export const getToken = async (): Promise<string> => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  return token;
};
