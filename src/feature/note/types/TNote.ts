export type TNote = {
  uuid: string;
  projectId: string;
  icon: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type TGetNoteRes = TNote;
export type TPostNoteReq = {
  projectId: string;
  req: {
    uuid: string;
    icon: string;
    title: string;
    body: string;
  };
};

export type TGetNoteDetailReq = {
  projectId: string;
  uuid: string;
};

export type TUpdateNoteReq = {
  projectId: string;
  req: {
    uuid: string;
    icon: string;
    title: string;
    body: string;
  };
};
