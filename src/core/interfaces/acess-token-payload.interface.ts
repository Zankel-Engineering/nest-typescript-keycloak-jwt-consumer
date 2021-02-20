interface Roles {
  roles: string[];
}

interface RessourceAcess {
  account: Roles;
}

export interface AccessTokenPayload {
  jti: string;
  exp: number;
  nbf: number;
  iat: number;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  auth_time: number;
  session_state: string;
  acr: string,
  'allowed-origins': string[];
  realm_access: Roles;
  resource_access: RessourceAcess;
  scope: string;
  email_verified: boolean;
  preferred_username: string;
  email: string;
}
