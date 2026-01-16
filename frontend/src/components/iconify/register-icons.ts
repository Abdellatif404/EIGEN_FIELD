import type { IconifyJSON } from '@iconify/react';

import { addCollection } from '@iconify/react';
import mdiIcons from '@iconify-json/mdi/icons.json';
import solarIcons from '@iconify-json/solar/icons.json';
import vscodeIcons from '@iconify-json/vscode-icons/icons.json';

import allIcons from './icon-sets';

// ----------------------------------------------------------------------

export const iconSets = Object.entries(allIcons).reduce((acc, [key, value]) => {
  const [prefix, iconName] = key.split(':');
  const existingPrefix = acc.find((item) => item.prefix === prefix);

  if (existingPrefix) {
    existingPrefix.icons[iconName] = value;
  } else {
    acc.push({
      prefix,
      icons: { [iconName]: value },
    });
  }

  return acc;
}, [] as IconifyJSON[]);

export const allIconNames = [
  ...Object.keys(allIcons),
  ...Object.keys(solarIcons.icons).map((name) => `solar:${name}`),
  ...Object.keys(vscodeIcons.icons).map((name) => `vscode-icons:${name}`),
  ...Object.keys(mdiIcons.icons).map((name) => `mdi:${name}`),
];

export type IconifyName = keyof typeof allIcons | string;

// ----------------------------------------------------------------------

let areIconsRegistered = false;

export function registerIcons() {
  if (areIconsRegistered) {
    return;
  }

  iconSets.forEach((iconSet) => {
    const iconSetConfig = {
      ...iconSet,
      width: (iconSet.prefix === 'carbon' && 32) || 24,
      height: (iconSet.prefix === 'carbon' && 32) || 24,
    };
    addCollection(iconSetConfig);
  });

  addCollection(solarIcons as IconifyJSON);
  addCollection(vscodeIcons as IconifyJSON);
  addCollection(mdiIcons as IconifyJSON);

  areIconsRegistered = true;
}
