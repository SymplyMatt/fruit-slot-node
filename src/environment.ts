declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URI: string;
      ACCESS_TOKEN_SECRET: string;
      CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      EMAIL_USER: string;
      EMAIL_PASS: string;
    }
  }

  namespace App {
    interface Trier {
      success: boolean;
      message: string;
      data: object;
    }
  }
}

export default {};
