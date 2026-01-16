import { _id, _company, _boolean, _fullName } from './_mock';

// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: 'John Richard',
  email: 'demo@example.com',
  photoURL: '/assets/images/avatar/avatar-25.webp',
};

// ----------------------------------------------------------------------

export const _users = [...Array(24)].map((_, index) => ({
  id: _id(index),
  name: _fullName(index),
  company: _company(index),
  isVerified: _boolean(index),
  avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  status: index % 4 ? 'active' : 'inactive',
  role:
    [
      'Owner',
      'Farm Manager',
      'Field Worker',
      'Agronomist',
      'Accountant',
      'Operations Manager',
      'Harvest Coordinator',
      'Equipment Operator',
      'Crop Specialist',
      'Quality Inspector',
    ][index % 10] || 'Field Worker',
}));

// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

export const _langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flags/ic-flag-de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic-flag-fr.svg',
  },
];
