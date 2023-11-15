/**
 * @description Sets the first letter of a string to uppercase
 * @param str The string to set the first letter to uppercase
 * @returns The string with the first letter set to uppercase
 */
export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

/**
 * @description Converts an object to a string
 * @param obj The object to convert to a string
 * @param newLinesAmount The amount of new lines to add between each key-value pair. Default is 2
 * @returns The string representation of the object
 */
export const getStringFromObject = (
  obj: Record<string, string | number | string[]>,
  newLinesAmount = 2,
) =>
  Object.entries(obj)
    .map(
      ([key, value]) =>
        `${capitalize(key.replace('_', ' '))}: ${
          Array.isArray(value) ? value.join(', ') : value
        }`,
    )
    .join('\n'.repeat(newLinesAmount));
