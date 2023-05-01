export function colorArrayToRGB(arr: [number, number, number], alpha = 1): string {
  alpha = Math.min(1, Math.max(0, alpha));
  if (alpha < 1) {
    return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${alpha})`;
  }
  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
}
