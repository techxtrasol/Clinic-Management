import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Users,
    Calendar,
    User,
    FileText,
    Pill,
    CreditCard,
    Settings,
    Stethoscope,
    Activity
} from 'lucide-react';
import AppLogo from './app-logo';
import { type SharedData } from '@/types';

const getMainNavItems = (userRole: string): NavItem[] => {
    const baseItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    switch (userRole) {
        case 'admin':
            return [
                ...baseItems,
                {
                    title: 'Users Management',
                    href: '/admin/users',
                    icon: Users,
                },
                {
                    title: 'Appointments',
                    href: '/appointments',
                    icon: Calendar,
                },
                {
                    title: 'Patients',
                    href: '/patients',
                    icon: User,
                },
                {
                    title: 'Doctors',
                    href: '/doctors',
                    icon: Stethoscope,
                },
                {
                    title: 'Medical Records',
                    href: '/medical-records',
                    icon: FileText,
                },
                {
                    title: 'Prescriptions',
                    href: '/prescriptions',
                    icon: Pill,
                },
                {
                    title: 'Billing',
                    href: '/billing',
                    icon: CreditCard,
                },
                {
                    title: 'Inventory',
                    href: '/inventory',
                    icon: Activity,
                },
            ];
        case 'doctor':
            return [
                ...baseItems,
                {
                    title: 'My Appointments',
                    href: '/appointments',
                    icon: Calendar,
                },
                {
                    title: 'Patients',
                    href: '/patients',
                    icon: User,
                },
                {
                    title: 'Medical Records',
                    href: '/medical-records',
                    icon: FileText,
                },
                {
                    title: 'Prescriptions',
                    href: '/prescriptions',
                    icon: Pill,
                },
            ];
        case 'nurse':
            return [
                ...baseItems,
                {
                    title: 'Patient Care',
                    href: '/patients',
                    icon: User,
                },
                {
                    title: 'Medical Records',
                    href: '/medical-records',
                    icon: FileText,
                },
                {
                    title: 'Appointments',
                    href: '/appointments',
                    icon: Calendar,
                },
            ];
        case 'patient':
            return [
                ...baseItems,
                {
                    title: 'My Appointments',
                    href: '/appointments',
                    icon: Calendar,
                },
                {
                    title: 'My Records',
                    href: '/medical-records',
                    icon: FileText,
                },
                {
                    title: 'My Prescriptions',
                    href: '/prescriptions',
                    icon: Pill,
                },
                {
                    title: 'My Bills',
                    href: '/billing',
                    icon: CreditCard,
                },
            ];
        case 'staff':
            return [
                ...baseItems,
                {
                    title: 'Appointments',
                    href: '/appointments',
                    icon: Calendar,
                },
                {
                    title: 'Patients',
                    href: '/patients',
                    icon: User,
                },
                {
                    title: 'Billing',
                    href: '/billing',
                    icon: CreditCard,
                },
                {
                    title: 'Inventory',
                    href: '/inventory',
                    icon: Activity,
                },
            ];
        default:
            return baseItems;
    }
};

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const mainNavItems = getMainNavItems(auth.user.role);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
