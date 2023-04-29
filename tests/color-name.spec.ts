import { describe, it } from '@jest/globals';
import colorName from 'color-name';

import { ColorName } from '../src/color-name.enum.js';

describe('ColorName enum', () => {
  it('should contain every color name from the color-name module', () => {
    const enumKeys = Object.values(ColorName);
    const moduleKeys = Object.keys(colorName);
    expect(enumKeys.length).toBe(moduleKeys.length);
    expect(enumKeys.every(key => moduleKeys.includes(key))).toBeTruthy();
  });
});
