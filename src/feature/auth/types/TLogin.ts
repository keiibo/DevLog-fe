export type TPostLoginReq = {
  identifier: string;
  password: string;
};

export type TPostLoginRes = {
  userId: string;
  userName: string;
  email: string;
  projectIds: string[];
};
