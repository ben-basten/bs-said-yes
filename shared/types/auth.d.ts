declare module "#auth-utils" {
  interface User {
    permission: "admin" | "guest" | false;
    name?: string;
  }

  interface UserSession {
    loggedInAt?: Date;
  }
}

export {};
