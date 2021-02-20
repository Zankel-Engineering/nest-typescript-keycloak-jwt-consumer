import * as keycloakBackend from 'keycloak-backend';

export const keycloak = keycloakBackend({
  'realm': process.env.KEYCLOAK_REALM_NAME,
  'auth-server-url': process.env.KEYCLOAK_AUTH_SERVER_URL,
  'client_id': process.env.KEYCLOAK_CLIENT_ID,
  'client_secret': process.env.KEYCLOAK_CLIENT_SECRET,
  'username': process.env.KEYCLOAK_ADMIN_USERNAME,
  'password': process.env.KEYCLOAK_ADMIN_PASSWORD,
})
