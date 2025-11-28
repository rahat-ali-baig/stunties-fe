import { Eye, Heart, Star, Download, Users, TrendingUp, CheckCircle, Briefcase, Package, DollarSign } from "lucide-react"; import AlertBanner from "@/components/addons/AlertBanner";
import { FaEye } from "react-icons/fa";

export const metricCards = [
    {
        title: "PROFILE VIEWS",
        value: "268",
        change: "+24.5%",
        icon: FaEye,
        background: "bg-primary",
        color: "text-background",
        invBg: "bg-background",
        invClr: "text-primary"
    },
    {
        title: "TOTAL LIKES",
        value: "34",
        change: "+15.5%",
        icon: Heart,
        background: "bg-primary-foreground",
        color: "text-background",
        invBg: "bg-background",
        invClr: "text-primary-foreground"
    },
    {
        title: "FAVORITES",
        value: "18",
        change: "+15.5%",
        icon: Star,
        background: "bg-secondary",
        color: "text-primary-foreground",
        invBg: "bg-primary-foreground",
        invClr: "text-secondary"
    },
    {
        title: "DOWNLOADS",
        value: "7",
        change: "+15.5%",
        icon: Download,
        background: "bg-border",
        color: "text-secondary",
        invBg: "bg-secondary",
        invClr: "text-border"
    },
    {
        title: "TOTAL USERS",
        value: "24,853",
        change: "+8%",
        icon: Users,
        background: "bg-primary",
        color: "text-background",
        invBg: "bg-background",
        invClr: "text-primary"
    },
    {
        title: "ACTIVE USERS",
        value: "8,492",
        change: "+12%",
        icon: TrendingUp,
        background: "bg-primary-foreground",
        color: "text-background",
        invBg: "bg-background",
        invClr: "text-primary-foreground"
    },
    {
        title: "VERIFIED USERS",
        value: "18,234",
        change: "+5%",
        icon: CheckCircle,
        background: "bg-secondary",
        color: "text-primary-foreground",
        invBg: "bg-primary-foreground",
        invClr: "text-secondary"
    },
    {
        title: "TOTAL JOBS",
        value: "5,847",
        change: "+15%",
        icon: Briefcase,
        background: "bg-border",
        color: "text-secondary",
        invBg: "bg-secondary",
        invClr: "text-border"
    },
    {
        title: "OPEN JOBS",
        value: "1,293",
        change: "-2%",
        icon: Package,
        background: "bg-primary",
        color: "text-background",
        invBg: "bg-background",
        invClr: "text-primary"
    },
    {
        title: "COMPLETED JOBS",
        value: "4,554",
        change: "+18%",
        icon: CheckCircle,
        background: "bg-primary-foreground",
        color: "text-background",
        invBg: "bg-background",
        invClr: "text-primary-foreground"
    },
    {
        title: "TOTAL EARNINGS",
        value: "$842,947",
        change: "+24%",
        icon: DollarSign,
        background: "bg-secondary",
        color: "text-primary-foreground",
        invBg: "bg-primary-foreground",
        invClr: "text-secondary"
    },
    {
        title: "MONTHLY EARNINGS",
        value: "$127,483",
        change: "+18%",
        icon: DollarSign,
        background: "bg-border",
        color: "text-secondary",
        invBg: "bg-secondary",
        invClr: "text-border"
    }
];