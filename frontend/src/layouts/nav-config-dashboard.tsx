import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
	dashboard: icon('ic-analytics'),
	chat: icon('ic-chat'),
  };

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'AI Assistant',
	path: '/chat',
    icon: ICONS.chat,
  },
  {
    title: 'Farm Team',
    path: '/farm-team',
    icon: icon('ic-user'),
  },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
];
