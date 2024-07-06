export type TGetProjectRes = {
  _id: string;
  name: string;
  detail: string;
  limitDate: string;
};

export type TCreateProjectReq = {
  name: string;
  detail: string;
  limitDate: string;
};
