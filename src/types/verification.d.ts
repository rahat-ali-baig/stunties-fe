export interface VerificationUser {
  id: string;
  name: string;
  email: string;
  submittedDate: string;
  verificationStatus: "Pending" | "Under Review" | "More Info Requested" | "Approved" | "Rejected";
  userType: "Talent Seeker" | "Stunt Performer";
  dob?: string;
  gender?: string;
  address?: string;
  languages?: string[];
  bio?: string;
  skills?: { name: string; rating: number }[];
  bodyMeasurements?: {
    height?: string;
    weight?: string;
    build?: string;
  };
  photos?: { type: "portrait" | "stunt"; url: string }[];
  videos?: { type: "showreel" | "training"; url: string; title: string }[];
  portfolioMedia?: { type: string; url: string; title: string }[];
  experience?: { role: string; project: string; year: string }[];
  governmentId?: { type: string; url: string; verified: boolean };
  certificates?: { name: string; url: string; issuer: string }[];
  trainingDetails?: { course: string; institution: string; year: string }[];
  country?: string;
  city?: string;
  avatar?: string;
  lastActivity?: string;
}

export interface VerificationFilters {
  verificationStatus: string[];
  userType: string[];
  country: string;
  city: string;
  hasPortfolio: boolean | null;
  hasDocuments: boolean | null;
  submittedDate: string;
}

export type VerificationTab = "all" | "pending" | "under-review" | "more-info" | "approved" | "rejected";