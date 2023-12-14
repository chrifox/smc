export function randomColour(min: number, max?: number) {
  const hexCount = 16777216; // total available colours using hexadecimal system

  if (!max) {
    max = hexCount;
  }

  if (min < 1) {
    throw new Error("min must be greater than 0");
  }

  if (max > hexCount) {
    throw new Error(`max exceeds ${hexCount}`);
  }

  const random = Math.floor(Math.random() * (max - min) + min);

  const hex = random.toString(16);

  return `#${hex}`;
}
