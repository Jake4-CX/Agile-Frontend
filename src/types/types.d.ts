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
  address?: ReportAddress;
  reports?: Report[];
  report_info?: { total_reports: number; total_reports_open: number; total_reports_closed: number; }
  assigned_reports?: AssignedReport[];
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
  report_severity: number;
  report_description: string;
  report_date: Date;
  report_status: boolean;
  report_latitude: number;
  report_longitude: number;
  image_group: ImageGroup;
  user: Users;
  report_images?: Image[];
  report_votes?: { upvotes: number; downvotes: number; }
  address?: ReportAddress;
}

interface ReportAddress {
  id: number;
  address_street: string;
  address_city: string;
  address_county: string;
  address_postal_code: string;
  address_latitude: number;
  address_longitude: number;
}

interface ReportVote {
  id: number;
  report?: Report;
  user?: Users;
  vote_type: string;
  vote_date: Date;
}

interface ReportType {
  id: number;
  report_type_name: string;
  report_type_description: string;
  report_type_icon: string;
}

interface ReportUpdate {
  id: number;
  report_date: string;
  report_update_text: string;
  report: Report;
  user: Users;
  image_group: ImageGroup;
  report_images: Image[];
}

interface AssignedReport {
  id: number;
  assigned_date: Date;
  report: Report;
  user: Users;
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