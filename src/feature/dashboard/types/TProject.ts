export type TGetProjectRes = {
  _id: string;
  projectId: string;
  name: string;
  detail: string;
  limitDate: string;
};

export type TCreateProjectReq = {
  name: string;
  detail: string;
  limitDate: string;
  projectId: string;
};
