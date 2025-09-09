import { camelcaseHumps } from "../../utils/camelcaseHumps";
import { camelcaseKeys } from "../../utils/camelcaseKeys";
import { denullifyValues } from "../../utils/denullifyValues";

/**
 * Apply following transformations to the response:
 * - convert `null` and `undefined` falsy fields to `undefined` for consistency.
 * - deep transform all snake_case keys to camelCase.
 */
export function normalizeResponse<T extends Record<string, unknown>>(
  response: T,
) {
  // @ts-ignore
  if (typeof globalThis.Bare !== "undefined") {
    console.log("in bare");
    return denullifyValues(camelcaseHumps(response));
  }

  return denullifyValues(camelcaseKeys(response));
}
