declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      PORT: number;
      INDEX: number;
    }
  }
}

export {}