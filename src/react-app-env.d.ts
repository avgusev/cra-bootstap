/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_TRF_URL: string;
  readonly VITE_TRF_APIKEY: string;
  readonly VITE_SKDF_URL: string;
  readonly VITE_PRIVATE_SKDF_URL: string;
  readonly VITE_AUTHORITY_URL: string;
  readonly VITE_PUBLIC_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
