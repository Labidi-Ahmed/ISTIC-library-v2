interface ImportMetaEnv {
  VITE_BETA_TESTER_LINK: string;
  VITE_100_TOKEN_PACK_LINK: string;
  VITE_250_TOKEN_PACK_LINK: string;
  VITE_500_TOKEN_PACK_LINK: string;
  VITE_API_URL: string;
  VITE_SOCKET_API_URL: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const API_URL = import.meta.env.VITE_API_URL;
export default API_URL;

export const SOCKET_API_URL = import.meta.env.VITE_SOCKET_API_URL;
