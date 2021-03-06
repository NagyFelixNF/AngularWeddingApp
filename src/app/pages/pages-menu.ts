import { NbMenuItem } from '@nebular/theme';


export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Preparations',
    icon: { icon: 'list-check',pack:'fa-solid'},
    link: '/pages/todo',
  },
  {
    title: 'Budget',
    icon: { icon: 'money-check-dollar',pack:'fa-solid'},
    link: '/pages/budget',
  },
  {
    title: 'Guests',
    icon: { icon: 'users',pack:'fa-solid'},
    link: '/pages/guest',
  },
  {
    title: 'Invitations',
    icon: { icon: 'envelope-open-text',pack:'fa-solid'},
    link: '/pages/invitation',
  },
  {
    title: 'Seatings',
    icon: { icon: 'chair',pack:'fa-solid'},
    link: '/pages/seating',
  },
  {
    title: 'Events',
    icon: { icon: 'clock',pack:'fa-solid'},
    link: '/pages/time',
  },
  {
    title: 'Vendor',
    icon: { icon: 'store',pack:'fa-solid'},
    link: '/pages/vendor',
  },
];
