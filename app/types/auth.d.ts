declare module "#auth-utils" {
  interface User {
    // Site password auth (simple)
    authenticated?: boolean;

    // Admin OAuth auth (GitHub)
    id?: number;
    email?: string;
    name?: string | null;
    avatarUrl?: string | null;
    githubUsername?: string;
    isAdmin?: boolean;
  }

  interface UserSession {
    loggedInAt?: Date;
  }
}

export {};
