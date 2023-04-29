export interface ColorArrayToHexOptions {
  hash: boolean;
  lowercase: boolean;
  short: boolean;
}

const colorArrayToHexDefaultOptions: ColorArrayToHexOptions = {
  hash: true,
  lowercase: false,
  short: false
};

export function colorArrayToHex(
  colorArray: [number, number, number],
  partialOptions: Partial<ColorArrayToHexOptions>
): string {
  const options: ColorArrayToHexOptions = {
    ...colorArrayToHexDefaultOptions,
    ...partialOptions
  };
  const { hash, lowercase, short } = options;

  let hex = colorArray
    .map(num => {
      let str = num.toString(16);
      str = str.length === 1 ? `0${str}` : str;
      return str;
    })
    .join('');

  if (short) {
    const chars = hex.split('');
    if (chars[0] === chars[1] && chars[2] === chars[3] && chars[4] === chars[5]) {
      hex = `${chars[0]}${chars[2]}${chars[4]}`;
    }
  }

  if (!!lowercase) {
    hex = hex.toLowerCase();
  } else {
    hex = hex.toUpperCase();
  }

  if (hash) {
    hex = `#${hex}`;
  }

  return hex;
}
