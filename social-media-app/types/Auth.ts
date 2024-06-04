export enum Roles {
    ADMIN = "Admin",
    USER = "User"
  }

export interface LoginResponse {
    emailAddress : string,
    roles : string[],
    accessToken : string,
    refreshToken : string
}

declare module "next-auth" {
  interface Session {
      user : {
          emailAddress : string,
          username : string,
          id : string,
          refreshToken: string,
          accessToken: string,
          firstName: string,
          lastName: string,
          role: string[],
          iat: number,
          exp: number,
          jti: string
      }
  }
}