interface Users {
  id: number;
  user_email?: string;
  user_password?: string;
  first_name: string;
  last_name?: string;
  user_uuid: string;
  registration_date?: Date;
  last_login_date?: Date;
  account_role?: AccountRoles;
}

interface AccountRoles {
  id: number;
  role_name: string;
  role_weight: number;
}

interface RequireAuth {
  allowedRoles?: any
}

interface Address {
  shop?: string;
  amenity?: string;
  building?: string;
  leisure?: string;
  tourism?: string;
  historic?: string;
  man_made?: string;
  aeroway?: string;
  military?: string;
  office?: string;
  highway?: string;
  house_number?: string;
  road?: string;
  quarter?: string;
  town?: string;
  city?: string;
  postcode?: string;
}

interface Categories {
  id: number;
  report_type_name: string;
  report_type_description: string;
}

interface Report {
  id: number;
  report_uuid: string;
  report_type: ReportType;
  report_description: string;
  report_date: Date;
  report_status: boolean;
  report_latitude: number;
  report_longitude: number;
  image_group: ImageGroup;
}

interface ReportType {
  id: number;
  report_type_name: string;
  report_type_description: string;
}

interface ImageGroup {
  id: number;
  user?: number;
}

interface Image {
  id: number;
  image_uuid: string;
  image_file_type: string;
  uploaded_date: Date;
  image_group: number;
}