import { AiOutlineHome } from 'solid-icons/ai';
import { CgMoreO, CgProfile } from 'solid-icons/cg';
import { IoNotificationsCircleOutline } from 'solid-icons/io';
import { RiMapCompassDiscoverLine } from 'solid-icons/ri';

const SIZE = 24;

export const links = [
    {
        name: 'Home',
        href: '/',
        icon: () => <AiOutlineHome size={SIZE} />
    },
    {
        name: 'Profile',
        href: '/profile',
        icon: () => <CgProfile size={24} />
    },
    {
        name: 'More',
        href: '/more',
        icon: () => <CgMoreO size={24} />
    },
    {
        name: 'Notification',
        href: '/notification',
        icon: () => <IoNotificationsCircleOutline size={24} />
    },
    {
        name: 'Discover',
        href: '/discover',
        icon: () => <RiMapCompassDiscoverLine size={24} />
    },
    {
        name: 'Login',
        href: '/auth/login',
        icon: () => <IoNotificationsCircleOutline size={24} />
    },
    {
        name: 'Register',
        href: '/auth/register',
        icon: () => <RiMapCompassDiscoverLine size={24} />
    }
];
