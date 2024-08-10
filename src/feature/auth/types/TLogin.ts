export type TPostLoginReq = {
  identifier: string;
  password: string;
};

export type TPostLoginRes = {
  token: string;
  userId: string;
  userName: string;
  email: string;
  projectIds: string[];
};
