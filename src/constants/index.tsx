import { Eye, Heart, Star, Download, Users, TrendingUp, CheckCircle, Package, DollarSign, Clock, Zap, Activity, UserCheck, Target, Award, CreditCard, ShoppingBag, Trophy, LineChart, Calendar, Video, XCircle, FolderOpen, List, AlertCircle, FileText, TrendingDown, RefreshCw } from "lucide-react";
import { FaEye, FaUser } from "react-icons/fa";
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
        icon: MdOutlineWorkOutline,
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

export const marketplaceStats = [
    {
        title: 'TOTAL GIGS',
        value: '1,284',
        icon: List
    },
    {
        title: 'OPEN GIGS',
        value: '342',
        icon: FolderOpen
    },
    {
        title: 'HIRED GIGS',
        value: '156',
        icon: Users
    },
    {
        title: 'COMPLETED GIGS',
        value: '756',
        icon: CheckCircle
    },
    {
        title: 'EXPIRED GIGS',
        value: '23',
        icon: Calendar
    },
    {
        title: 'CANCELLED GIGS',
        value: '7',
        icon: XCircle
    },
];

export const timeRangeOptions = [
    { value: "all-time", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "this-week", label: "This Week" },
    { value: "this-month", label: "This Month" },
    { value: "this-year", label: "This Year" }
];

export const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "open", label: "Open" },
    { value: "hired", label: "Hired" },
    { value: "completed", label: "Completed" },
    { value: "expired", label: "Expired" },
    { value: "cancelled", label: "Cancelled" }
];

export const locationOptions = [
    { value: "all-locations", label: "All Locations" },
    { value: "new-york", label: "New York" },
    { value: "los-angeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    { value: "miami", label: "Miami" },
    { value: "atlanta", label: "Atlanta" }
];

export const genderOptions = [
    { value: "all-genders", label: "All Genders" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
];

export const castingCalls = [
    {
        id: 'CC-892',
        title: 'Lead Stunt Performer - Action Thriller',
        creator: 'Disney Studios @disney',
        location: 'Orlando, FL',
        gender: 'Any',
        applicants: 124,
        status: 'Open' as const,
        postedDate: '2024-01-15',
        type: 'Casting Call'
    },
    {
        id: 'CC-891',
        title: 'Stunt Coordinator - Superhero Film',
        creator: 'DC Films @dafims',
        location: 'Burbank, CA',
        gender: 'Male',
        applicants: 87,
        status: 'Hired' as const,
        postedDate: '2024-01-14',
        type: 'Casting Call'
    },
    {
        id: 'CC-890',
        title: 'Martial Arts Specialist',
        creator: 'Lionsgate @lionsgate',
        location: 'Vancouver, BC',
        gender: 'Female',
        applicants: 156,
        status: 'Completed' as const,
        postedDate: '2024-01-13',
        type: 'Casting Call'
    },
    {
        id: 'CC-889',
        title: 'Water Stunt Performer',
        creator: 'Amazon Studios @amazon',
        location: 'Hawaii',
        gender: 'Any',
        applicants: 43,
        status: 'Open' as const,
        postedDate: '2024-01-12',
        type: 'Casting Call'
    },
    {
        id: 'CC-888',
        title: 'Fire Stunt Specialist',
        creator: 'MGM Studios @mgm',
        location: 'Las Vegas, NV',
        gender: 'Male',
        applicants: 29,
        status: 'Expired' as const,
        postedDate: '2024-01-11',
        type: 'Casting Call'
    },
    {
        id: 'CC-887',
        title: 'Precision Driver',
        creator: 'Fox Studios @fox',
        location: 'Detroit, MI',
        gender: 'Any',
        applicants: 61,
        status: 'Cancelled' as const,
        postedDate: '2024-01-10',
        type: 'Casting Call'
    },
    {
        id: 'CC-886',
        title: 'Stunt Rigger',
        creator: 'A24 Films @a24',
        location: 'Austin, TX',
        gender: 'Any',
        applicants: 38,
        status: 'Open' as const,
        postedDate: '2024-01-09',
        type: 'Casting Call'
    },
    {
        id: 'CC-885',
        title: 'Gymnastics Stunt Double',
        creator: 'DreamWorks @dreamworks',
        location: 'Seattle, WA',
        gender: 'Female',
        applicants: 94,
        status: 'Hired' as const,
        postedDate: '2024-01-08',
        type: 'Casting Call'
    }
];

export const gigs = [
    {
        id: 'GIG-1284',
        title: 'Stunt Driver for Action Film',
        creator: 'Michael Bay Productions @michaelbay',
        location: 'Los Angeles, CA',
        gender: 'Any',
        rate: '$850/day',
        applicants: 47,
        status: 'Open' as const,
        postedDate: '2024-01-07',
        type: 'Gig'
    },
    {
        id: 'GIG-1283',
        title: 'Parkour Expert for Chase Scene',
        creator: 'Warner Bros Studios @warnerbros',
        location: 'New York, NY',
        gender: 'Male',
        rate: '$720/day',
        applicants: 32,
        status: 'Hired' as const,
        postedDate: '2024-01-06',
        type: 'Gig'
    },
    {
        id: 'GIG-1282',
        title: 'Fight Choreographer',
        creator: 'Netflix Originals @netflix',
        location: 'Atlanta, GA',
        gender: 'Any',
        rate: '$950/day',
        applicants: 68,
        status: 'Completed' as const,
        postedDate: '2024-01-05',
        type: 'Gig'
    },
    {
        id: 'GIG-1281',
        title: 'Aerial Stunt Performer',
        creator: 'Universal Pictures @universal',
        location: 'Chicago, IL',
        gender: 'Female',
        rate: '$890/day',
        applicants: 23,
        status: 'Open' as const,
        postedDate: '2024-01-04',
        type: 'Gig'
    },
    {
        id: 'GIG-1280',
        title: 'Wire Work Specialist',
        creator: 'Marvel Studios @mavel',
        location: 'Vancouver, BC',
        gender: 'Any',
        rate: '$1100/day',
        applicants: 91,
        status: 'Expired' as const,
        postedDate: '2024-01-03',
        type: 'Gig'
    },
    {
        id: 'GIG-1279',
        title: 'Motorcycle Stunt Double',
        creator: 'Paramount Pictures @paramount',
        location: 'Miami, FL',
        gender: 'Male',
        rate: '$780/day',
        applicants: 15,
        status: 'Cancelled' as const,
        postedDate: '2024-01-02',
        type: 'Gig'
    },
    {
        id: 'GIG-1278',
        title: 'High Fall Specialist',
        creator: 'Sony Pictures @sony',
        location: 'Toronto, ON',
        gender: 'Any',
        rate: '$1050/day',
        applicants: 54,
        status: 'Open' as const,
        postedDate: '2024-01-01',
        type: 'Gig'
    },
    {
        id: 'GIG-1277',
        title: 'Sword Fighting Expert',
        creator: 'HBO Max @hbornax',
        location: 'London, UK',
        gender: 'Male',
        rate: '$820/day',
        applicants: 39,
        status: 'Hired' as const,
        postedDate: '2023-12-31',
        type: 'Gig'
    }
];


// Orders stats for metrics slider
export const ordersStats = [
    {
        title: 'TOTAL ORDERS',
        value: '24',
        change: '+12%',
        icon: FileText
    },
    {
        title: 'IN PROGRESS',
        value: '8',
        change: '+3',
        icon: Clock
    },
    {
        title: 'UNDER REVIEW',
        value: '5',
        change: '-2',
        icon: AlertCircle
    },
    {
        title: 'COMPLETED',
        value: '18',
        change: '+8%',
        icon: CheckCircle
    },
    {
        title: 'TOTAL REVENUE',
        value: '$42,580',
        change: '+15%',
        icon: DollarSign
    },
];

// Orders data
export const orders = [
    {
        id: 'ORD-2024-001',
        jobTitle: 'Arabic Fighters for Bangkok Film',
        buyer: 'Studio XYZ',
        performer: 'Alex Chen',
        orderDate: '2024-03-10',
        deliveryDate: '2024-03-20',
        amount: '$5,400',
        commission: '$540',
        netEarnings: '$4,860',
        status: 'In Progress'
    },
    {
        id: 'ORD-2024-002',
        jobTitle: 'Parkour Sequence - Tokyo',
        buyer: 'Action Films Co.',
        performer: 'Marcus Johnson',
        orderDate: '2024-03-08',
        deliveryDate: '2024-03-18',
        amount: '$3,800',
        commission: '$380',
        netEarnings: '$3,420',
        status: 'Under Review'
    },
    {
        id: 'ORD-2024-003',
        jobTitle: 'Stunt Double - Dubai',
        buyer: 'Desert Productions',
        performer: 'Sarah Lee',
        orderDate: '2024-03-05',
        deliveryDate: '2024-03-15',
        amount: '$4,200',
        commission: '$420',
        netEarnings: '$3,780',
        status: 'Completed'
    },
    // Add more orders as needed...
];

// Status options for orders
export const orderStatusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
];

// Amount range options
export const amountRangeOptions = [
    { value: 'all-amounts', label: 'All Amounts' },
    { value: 'under-1000', label: 'Under $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: 'over-10000', label: 'Over $10,000' },
];

export const earningsMetricCards = [
    {
        title: "TOTAL EARNINGS",
        value: "$47,392",
        change: "+8%",
        icon: DollarSign,
        forecast: "Forecast next week: +6%"
    },
    {
        title: "JOB COMMISSIONS",
        value: "$28,450",
        change: "+12%",
        icon: MdOutlineWorkOutline,
        forecast: "Forecast next week: +8%"
    },
    {
        title: "SUBSCRIPTION REVENUE",
        value: "$12,890",
        change: "+5%",
        icon: CreditCard,
        forecast: "Forecast next week: +3%"
    },
    {
        title: "PROFILE BOOST REVENUE",
        value: "$4,680",
        change: "+15%",
        icon: Zap,
        forecast: "Forecast next week: +12%"
    },
    {
        title: "THIS MONTH'S EARNINGS",
        value: "$142,750",
        change: "+10%",
        icon: TrendingUp,
        forecast: "Forecast next month: +7%"
    },
    {
        title: "PENDING/FAILED PAYMENTS",
        value: "$1,372",
        change: "-3%",
        icon: AlertCircle,
        forecast: "Forecast next week: -5%"
    }
];

export const subscriptionMetricCards = [
    {
        title: "ACTIVE SUBSCRIBERS",
        value: "24,853",
        change: "+8%",
        icon: Users,
        forecast: "vs last 30 days"
    },
    {
        title: "MONTHLY RECURRING REVENUE",
        value: "$142,750",
        change: "+10%",
        icon: DollarSign,
        forecast: "Current month"
    },
    {
        title: "NEW SUBSCRIPTIONS",
        value: "1,847",
        change: "+12%",
        icon: TrendingUp,
        forecast: "Last 30 days"
    },
    {
        title: "CHURN RATE",
        value: "2.4%",
        change: "-0.8%",
        icon: TrendingDown,
        forecast: "vs last month"
    },
    {
        title: "ACTIVE TRIALS",
        value: "1,234",
        change: "+15%",
        icon: Clock,
        forecast: "Current active"
    },
    {
        title: "TRIAL CONVERSION RATE",
        value: "32%",
        change: "+5%",
        icon: RefreshCw,
        forecast: "Last 30 days"
    },
    {
        title: "AVERAGE REVENUE PER USER",
        value: "$9.85",
        change: "+3%",
        icon: UserCheck,
        forecast: "Monthly ARPU"
    },
    {
        title: "LIFETIME VALUE",
        value: "$247.50",
        change: "+7%",
        icon: Award,
        forecast: "Avg customer LTV"
    }
];

interface Product {
    id: string;
    image: string;
    name: string;
    sku: string;
    category: string;
    price: string;
    stock: number;
    status: 'Active' | 'Inactive' | 'Out of Stock' | 'Low Stock' | 'Draft';
    addedOn: string;
    description?: string;
}

export const sampleProducts: Product[] = [
    {
        id: "PROD-1001",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        name: "Premium Wireless Headphones",
        sku: "SKU-ELEC-001",
        category: "Electronics",
        price: "$299.00",
        stock: 45,
        status: "Active",
        addedOn: "Nov 28, 2025",
        description: "Noise cancelling wireless headphones with premium sound quality"
    },
    {
        id: "PROD-1002",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        name: "Classic Running Shoes",
        sku: "SKU-FOOT-001",
        category: "Footwear",
        price: "$129.00",
        stock: 12,
        status: "Active",
        addedOn: "Nov 25, 2025",
        description: "Comfortable running shoes for daily use"
    },
    {
        id: "PROD-1003",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w-400&h=400&fit=crop",
        name: "Smart Watch Pro",
        sku: "SKU-ELEC-002",
        category: "Electronics",
        price: "$399.00",
        stock: 28,
        status: "Active",
        addedOn: "Nov 20, 2025",
        description: "Advanced smartwatch with health monitoring"
    },
    {
        id: "PROD-1004",
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop",
        name: "Sports Water Bottle",
        sku: "SKU-FIT-001",
        category: "Fitness",
        price: "$24.99",
        stock: 156,
        status: "Active",
        addedOn: "Nov 18, 2025",
        description: "Insulated water bottle for sports activities"
    },
    {
        id: "PROD-1005",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        name: "Designer Sunglasses",
        sku: "SKU-ACC-001",
        category: "Accessories",
        price: "$89.99",
        stock: 0,
        status: "Out of Stock",
        addedOn: "Nov 15, 2025",
        description: "UV protected designer sunglasses"
    },
    {
        id: "PROD-1006",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
        name: "Professional Camera",
        sku: "SKU-ELEC-003",
        category: "Electronics",
        price: "$1,299.00",
        stock: 8,
        status: "Active",
        addedOn: "Nov 12, 2025",
        description: "Professional DSLR camera with lens kit"
    },
    {
        id: "PROD-1007",
        image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=400&fit=crop",
        name: "Gaming Keyboard",
        sku: "SKU-ELEC-004",
        category: "Electronics",
        price: "$79.99",
        stock: 3,
        status: "Low Stock",
        addedOn: "Nov 10, 2025",
        description: "Mechanical gaming keyboard with RGB lighting"
    },
    {
        id: "PROD-1008",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
        name: "Leather Backpack",
        sku: "SKU-ACC-002",
        category: "Accessories",
        price: "$149.99",
        stock: 24,
        status: "Active",
        addedOn: "Nov 8, 2025",
        description: "Premium leather backpack for daily use"
    },
    {
        id: "PROD-1009",
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop",
        name: "Cotton T-Shirt",
        sku: "SKU-CLOTH-001",
        category: "Clothing",
        price: "$29.99",
        stock: 87,
        status: "Active",
        addedOn: "Nov 5, 2025",
        description: "100% cotton premium t-shirt"
    },
    {
        id: "PROD-1010",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
        name: "Smartphone Case",
        sku: "SKU-ACC-003",
        category: "Accessories",
        price: "$19.99",
        stock: 0,
        status: "Out of Stock",
        addedOn: "Nov 3, 2025",
        description: "Protective case for smartphones"
    },
    {
        id: "PROD-1011",
        image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=400&h=400&fit=crop",
        name: "Yoga Mat",
        sku: "SKU-FIT-002",
        category: "Fitness",
        price: "$34.99",
        stock: 42,
        status: "Active",
        addedOn: "Nov 1, 2025",
        description: "Non-slip yoga mat for exercise"
    },
    {
        id: "PROD-1012",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
        name: "Denim Jacket",
        sku: "SKU-CLOTH-002",
        category: "Clothing",
        price: "$89.99",
        stock: 15,
        status: "Active",
        addedOn: "Oct 28, 2025",
        description: "Classic denim jacket"
    },
    {
        id: "PROD-1013",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
        name: "Wireless Earbuds",
        sku: "SKU-ELEC-005",
        category: "Electronics",
        price: "$149.99",
        stock: 2,
        status: "Low Stock",
        addedOn: "Oct 25, 2025",
        description: "True wireless earbuds with charging case"
    },
    {
        id: "PROD-1014",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
        name: "Digital Notebook",
        sku: "SKU-OFF-001",
        category: "Office",
        price: "$59.99",
        stock: 31,
        status: "Inactive",
        addedOn: "Oct 20, 2025",
        description: "Reusable digital notebook"
    },
    {
        id: "PROD-1015",
        image: "https://images.unsplash.com/photo-1525904097878-94fb15835963?w=400&h=400&fit=crop",
        name: "Laptop Stand",
        sku: "SKU-OFF-002",
        category: "Office",
        price: "$39.99",
        stock: 56,
        status: "Active",
        addedOn: "Oct 15, 2025",
        description: "Adjustable laptop stand for ergonomics"
    }
];

export const categoryOptions = [
    { value: 'all-categories', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'footwear', label: 'Footwear' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'office', label: 'Office' }
];

export const productStatusOptions = [
    { value: 'all-status', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'draft', label: 'Draft' }
];

export const stockOptions = [
    { value: 'all-stock', label: 'All Stock' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'low-stock', label: 'Low Stock (< 10)' }
];

export const priceRangeOptions = [
    { value: 'all-prices', label: 'All Prices' },
    { value: '0-50', label: '$0 - $50' },
    { value: '50-200', label: '$50 - $200' },
    { value: '200-500', label: '$200 - $500' },
    { value: '500+', label: '$500+' }
];

export const dateRangeOptions = [
    { value: 'all-time', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' }
];