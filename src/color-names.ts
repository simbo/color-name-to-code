import namedColors from 'color-name';

import { ColorName } from './color-name.enum.js';

export type ColorNames = { [name in ColorName]: [number, number, number] };

export const colorNames: ColorNames = namedColors;
