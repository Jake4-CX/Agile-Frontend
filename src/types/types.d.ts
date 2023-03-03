interface Users {
  id: number;
  user_email: string;
  user_password: string;
  first_name: string;
  last_name: string;
  user_uuid: string;
  registration_date: Date;
  last_login_date: Date;
  account_role: AccountRoles;
}

interface AccountRoles {
  id: number;
  role_name: string;
  role_weight: number;
}

interface RequireAuth {
  allowedRoles?: any
}