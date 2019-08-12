export interface SubUser {
  id: number;
  kid: boolean;
  name: string;
  is_initialized: boolean;
  parent_user: number;
  profile_info: object;
}
