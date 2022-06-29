interface TokenRequest {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
}
interface TokenResponse {
  token_type: string;
  access_token: string;
  id_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
}

export default TokenRequest;
