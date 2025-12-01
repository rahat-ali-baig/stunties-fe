import { VerificationUser } from "@/types/verification";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Info,
  Users,
  TrendingUp,
  Star,
  Zap,
} from "lucide-react";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "Approved":
      return {
        icon: CheckCircle,
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-700",
        borderColor: "border-emerald-100",
        iconColor: "text-emerald-500",
        label: "Verified"
      };
    case "Rejected":
      return {
        icon: XCircle,
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        borderColor: "border-rose-100",
        iconColor: "text-rose-500",
        label: "Rejected"
      };
    case "Pending":
      return {
        icon: Clock,
        bgColor: "bg-amber-50",
        textColor: "text-amber-700",
        borderColor: "border-amber-100",
        iconColor: "text-amber-500",
        label: "Pending"
      };
    case "Under Review":
      return {
        icon: AlertCircle,
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-100",
        iconColor: "text-blue-500",
        label: "Under Review"
      };
    case "More Info Requested":
      return {
        icon: Info,
        bgColor: "bg-purple-50",
        textColor: "text-purple-700",
        borderColor: "border-purple-100",
        iconColor: "text-purple-500",
        label: "More Info Requested"
      };
    default:
      return {
        icon: Clock,
        bgColor: "bg-gray-50",
        textColor: "text-gray-700",
        borderColor: "border-gray-100",
        iconColor: "text-gray-500",
        label: "Unknown"
      };
  }
};

export const defaultVerificationUsers: VerificationUser[] = [
  {
    id: "VER-001",
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    submittedDate: "2025-11-26",
    verificationStatus: "Under Review",
    userType: "Stunt Performer",
    dob: "1990-05-15",
    gender: "Male",
    address: "123 Hollywood Blvd, Los Angeles, CA",
    languages: ["English", "Spanish"],
    bio: "Professional stunt performer with 8 years of experience in film and television. Specialized in fight choreography and high falls.",
    skills: [
      { name: "Fight Choreography", rating: 9 },
      { name: "High Falls", rating: 8 },
      { name: "Driving Stunts", rating: 7 },
      { name: "Fire Stunts", rating: 6 }
    ],
    bodyMeasurements: {
      height: "6'1\"",
      weight: "185 lbs",
      build: "Athletic"
    },
    photos: [
      { type: "portrait", url: "https://i.pravatar.cc/300?img=33" },
      { type: "stunt", url: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400" },
      { type: "stunt", url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w-400" }
    ],
    videos: [
      { type: "showreel", url: "https://example.com/video1", title: "2024 Showreel" },
      { type: "training", url: "https://example.com/video2", title: "Parkour Training" }
    ],
    portfolioMedia: [
      { type: "image", url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400", title: "Movie Set 2023" },
      { type: "video", url: "https://example.com/video3", title: "Behind the Scenes" }
    ],
    experience: [
      { role: "Stunt Double", project: "Action Movie 2023", year: "2023" },
      { role: "Stunt Performer", project: "TV Series Season 5", year: "2022" }
    ],
    governmentId: { type: "Driver's License", url: "https://example.com/id1", verified: true },
    certificates: [
      { name: "Stunt Safety Certification", url: "https://example.com/cert1", issuer: "Stunt Association" },
      { name: "First Aid & CPR", url: "https://example.com/cert2", issuer: "Red Cross" }
    ],
    trainingDetails: [
      { course: "Advanced Stunt Training", institution: "Stunt Academy LA", year: "2020" },
      { course: "Martial Arts Masterclass", institution: "Fight Choreography School", year: "2019" }
    ],
    country: "US",
    city: "Los Angeles",
    avatar: "https://i.pravatar.cc/150?img=33",
    lastActivity: "2 hours ago"
  },
  {
    id: "VER-002",
    name: "Jessica Brown",
    email: "jessica.b@example.com",
    submittedDate: "2025-11-26",
    verificationStatus: "Pending",
    userType: "Talent Seeker",
    dob: "1985-08-22",
    gender: "Female",
    address: "45 Park Lane, London, UK",
    languages: ["English", "French"],
    bio: "Casting director specializing in action films. Looking for talented stunt performers for upcoming projects.",
    country: "UK",
    city: "London",
    avatar: "https://i.pravatar.cc/150?img=45",
    lastActivity: "1 day ago"
  },
  {
    id: "VER-003",
    name: "Michael Chen",
    email: "m.chen@example.com",
    submittedDate: "2025-11-25",
    verificationStatus: "Approved",
    userType: "Stunt Performer",
    dob: "1992-03-10",
    gender: "Male",
    address: "789 Mountain View, Vancouver, BC",
    languages: ["English", "Mandarin"],
    bio: "Parkour specialist and free runner with 6 years of experience. Featured in multiple commercials and live shows.",
    skills: [
      { name: "Parkour", rating: 10 },
      { name: "Free Running", rating: 9 },
      { name: "Gymnastics", rating: 8 }
    ],
    photos: [
      { type: "portrait", url: "https://i.pravatar.cc/300?img=12" },
      { type: "stunt", url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400" }
    ],
    governmentId: { type: "Passport", url: "https://example.com/id3", verified: true },
    certificates: [
      { name: "Parkour Instructor Certification", url: "https://example.com/cert3", issuer: "World Freerunning Association" }
    ],
    country: "CA",
    city: "Vancouver",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastActivity: "Active now"
  },
  {
    id: "VER-004",
    name: "Ryan Miller",
    email: "ryan.m@example.com",
    submittedDate: "2025-11-24",
    verificationStatus: "More Info Requested",
    userType: "Stunt Performer",
    dob: "1991-11-30",
    gender: "Male",
    address: "321 Broadway, New York, NY",
    languages: ["English"],
    bio: "Motorcycle stunt rider and precision driver. Looking to expand into film industry.",
    skills: [
      { name: "Motorcycle Stunts", rating: 9 },
      { name: "Precision Driving", rating: 8 },
      { name: "Car Stunts", rating: 7 }
    ],
    photos: [
      { type: "portrait", url: "https://i.pravatar.cc/300?img=17" }
    ],
    country: "US",
    city: "New York",
    avatar: "https://i.pravatar.cc/150?img=17",
    lastActivity: "1 hour ago"
  },
  {
    id: "VER-005",
    name: "Sophia Garcia",
    email: "sophia.g@example.com",
    submittedDate: "2025-11-22",
    verificationStatus: "Rejected",
    userType: "Talent Seeker",
    dob: "1988-07-14",
    gender: "Female",
    address: "78 Rue de Rivoli, Paris, France",
    languages: ["French", "English", "Spanish"],
    bio: "Independent film producer focusing on action sequences.",
    country: "FR",
    city: "Paris",
    avatar: "https://i.pravatar.cc/150?img=20",
    lastActivity: "1 week ago"
  }
];

export const userCards = [
  {
    title: "TOTAL USERS",
    value: "50",
    change: "+12%",
    icon: Users,
  },
  {
    title: "VERIFIED USERS",
    value: "26",
    change: "+8%",
    icon: CheckCircle,
  },
  {
    title: "PENDING VERIFICATION",
    value: "10",
    change: "-3%",
    icon: Clock,
  },
  {
    title: "ACTIVE USERS (7D)",
    value: "34",
    change: "+18%",
    icon: TrendingUp,
  },
  {
    title: "PRO SUBSCRIBERS",
    value: "19",
    change: "+24%",
    icon: Star,
  },
  {
    title: "ACTIVE BOOSTS",
    value: "22",
    change: "+5%",
    icon: Zap,
  }
];