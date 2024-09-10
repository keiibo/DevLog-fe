/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BE_LOCAL_BASE_URL: string;
  readonly VITE_BE_DEV_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
