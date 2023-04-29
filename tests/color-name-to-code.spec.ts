import { describe, it } from '@jest/globals';

import { ColorCodeFormat, colorNameToCode } from '../src/index.js';

describe('colorNameToCode', () => {
  describe('known color value', () => {
    describe('hex output', () => {
      it('should return the hex color value', () => {
        expect(colorNameToCode('white')).toBe('#FFFFFF');
        expect(colorNameToCode('Black')).toBe('#000000');
        expect(colorNameToCode('RED')).toBe('#FF0000');
        expect(colorNameToCode('Dodger Blue')).toBe('#1E90FF');
        expect(colorNameToCode('dark-slate-gray')).toBe('#2F4F4F');
        expect(colorNameToCode('DARK_SLATE_GREY')).toBe('#2F4F4F');
        expect(colorNameToCode('LeMoN cHiFfOn')).toBe('#FFFACD');
      });

      it('should return the hex color value without leading #', () => {
        expect(colorNameToCode('red', { hash: false })).toBe('FF0000');
      });

      it('should return the hex color value in lowercase', () => {
        expect(colorNameToCode('red', { lowercase: true })).toBe('#ff0000');
      });

      it('should return the hex color value in short version', () => {
        expect(colorNameToCode('red', { short: true })).toBe('#F00');
      });

      it('should return the hex color value not in short version if not possible', () => {
        expect(colorNameToCode('dodgerblue', { short: true })).toBe('#1E90FF');
      });
    });

    describe('rgb output', () => {
      it('should return the rgb color value', () => {
        expect(colorNameToCode('black', { format: ColorCodeFormat.RGB })).toBe('rgb(0, 0, 0)');
        expect(colorNameToCode('green', { format: ColorCodeFormat.RGB })).toBe('rgb(0, 128, 0)');
        expect(colorNameToCode('blue', { format: ColorCodeFormat.RGB })).toBe('rgb(0, 0, 255)');
        expect(colorNameToCode('white', { format: ColorCodeFormat.RGB })).toBe('rgb(255, 255, 255)');
      });

      it('should return the rgb value with alpha value', () => {
        expect(colorNameToCode('red', { format: ColorCodeFormat.RGB, alpha: 0.5 })).toBe('rgba(255, 0, 0, 0.5)');
        expect(colorNameToCode('red', { format: ColorCodeFormat.RGB, alpha: 1 })).toBe('rgb(255, 0, 0)');
        expect(colorNameToCode('red', { format: ColorCodeFormat.RGB, alpha: 0 })).toBe('rgba(255, 0, 0, 0)');
        expect(colorNameToCode('red', { format: ColorCodeFormat.RGB, alpha: -1 })).toBe('rgba(255, 0, 0, 0)');
        expect(colorNameToCode('red', { format: ColorCodeFormat.RGB, alpha: 2 })).toBe('rgb(255, 0, 0)');
      });
    });

    describe('array output', () => {
      it('should return the array color value', () => {
        expect(colorNameToCode('black', { format: ColorCodeFormat.Array })).toStrictEqual([0, 0, 0]);
        expect(colorNameToCode('red', { format: ColorCodeFormat.Array })).toStrictEqual([255, 0, 0]);
        expect(colorNameToCode('green', { format: ColorCodeFormat.Array })).toStrictEqual([0, 128, 0]);
        expect(colorNameToCode('blue', { format: ColorCodeFormat.Array })).toStrictEqual([0, 0, 255]);
        expect(colorNameToCode('white', { format: ColorCodeFormat.Array })).toStrictEqual([255, 255, 255]);
      });
    });
  });

  describe('unknown color value', () => {
    it('should return the input value as color value', () => {
      expect(colorNameToCode('ff0000')).toBe('#FF0000');
    });

    it('should convert the input value into a color code', () => {
      expect(colorNameToCode('zfgd5x')).toBe('#FFDD55');
      expect(colorNameToCode('f')).toBe('#FF0000');
      expect(colorNameToCode('ffff')).toBe('#FFFF00');
      expect(colorNameToCode('Foo Bar')).toBe('#FFBBAA');
      expect(colorNameToCode(undefined as any)).toBe('#DEFE0D');
      expect(colorNameToCode('UNKNOWN')).toBe('#000000');
    });

    it('should throw if no fallback is allowed', () => {
      expect(() => colorNameToCode('unknown', { fallback: false })).toThrow("no matching color found for 'unknown'");
    });
  });
});
