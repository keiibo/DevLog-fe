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

export type TPostCreateAccountReq = {
  userId: string;
  userName: string;
  password: string;
  email: string;
};
export type TPostCreateAccountRes = {
  userId: string;
  userName: string;
  email: string;
};
