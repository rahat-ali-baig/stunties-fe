import { Eye, Heart, Star, Download, Users, TrendingUp, CheckCircle, Briefcase, Package, DollarSign, Clock, Zap, Activity, UserCheck, Target, Award, CreditCard, ShoppingBag, Trophy, LineChart } from "lucide-react"; import AlertBanner from "@/components/addons/AlertBanner";
import { FaEye } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";

interface UserGrowthData {
    month: string;
    newUsers: number;
    verified: number;
}

interface UserDistributionData {
    country: string;
    users: number;
    code: string;
}

interface UserGrowthChartProps {
    growthData?: UserGrowthData[];
    distributionData?: UserDistributionData[];
}

export const dashboardMetricCards = [
    {
        title: "TOTAL USERS",
        value: "24,853",
        change: "+8%",
        icon: Users,
        forecast: "Forecast next week: +3%"
    },
    {
        title: "ACTIVE (7 DAYS)",
        value: "8,492",
        change: "+12%",
        icon: Activity,
        forecast: "Forecast next week: +5%"
    },
    {
        title: "VERIFIED USERS",
        value: "18,234",
        change: "+5%",
        icon: UserCheck,
        forecast: "Forecast next week: +2%"
    },
    {
        title: "TOTAL JOBS",
        value: "5,847",
        change: "+15%",
        icon: MdOutlineWorkOutline,
        forecast: "Forecast next week: +8%"
    },
    {
        title: "OPEN JOBS",
        value: "1,293",
        change: "-2%",
        icon: Target,
        forecast: "Forecast next week: +1%"
    },
    {
        title: "COMPLETED JOBS",
        value: "4,554",
        change: "+18%",
        icon: Award,
        forecast: "Forecast next week: +10%"
    },
    {
        title: "TOTAL PLATFORM EARNINGS",
        value: "$842,947",
        change: "+24%",
        icon: DollarSign,
        forecast: "Forecast next week: +6%"
    },
    {
        title: "THIS MONTH'S EARNINGS",
        value: "$127,483",
        change: "+18%",
        icon: CreditCard,
        forecast: "Forecast next week: +4%"
    },
    {
        title: "TOTAL ORDERS",
        value: "3,847",
        change: "+11%",
        icon: ShoppingBag,
        forecast: "Forecast next week: +5%"
    },
    {
        title: "IN-PROGRESS ORDERS",
        value: "234",
        change: "+5%",
        icon: Zap,
        forecast: "Likely 250 units next week: +7%"
    },
    {
        title: "COMPLETED ORDERS",
        value: "3,613",
        change: "+12%",
        icon: Trophy,
        forecast: "Forecast next week: +8%"
    },
    {
        title: "SHOP REVENUE",
        value: "$284,930",
        change: "+9%",
        icon: LineChart,
        forecast: "Forecast next week: +4%"
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

export const defaultGrowthData: UserGrowthData[] = [
    { month: 'Jan', newUsers: 1240, verified: 980 },
    { month: 'Feb', newUsers: 1580, verified: 1320 },
    { month: 'Mar', newUsers: 1800, verified: 1500 },
    { month: 'Apr', newUsers: 1400, verified: 1200 },
    { month: 'May', newUsers: 1600, verified: 1300 },
    { month: 'Jun', newUsers: 1900, verified: 1600 },
];

export const defaultDistributionData: UserDistributionData[] = [
    { country: 'United States', users: 8234, code: 'US' },
    { country: 'United Kingdom', users: 4521, code: 'GB' },
    { country: 'Canada', users: 3147, code: 'CA' },
    { country: 'Australia', users: 2893, code: 'AU' },
    { country: 'Germany', users: 2156, code: 'DE' },
    { country: 'France', users: 1647, code: 'FR' },
    { country: 'Spain', users: 1124, code: 'ES' },
    { country: 'Others', users: 1131, code: 'Others' },
];