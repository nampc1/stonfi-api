import camelcaseKeys from "camelcase-keys";
import decamelizeKeys from "decamelize-keys";
import humps from "humps";
import type {
  CamelCasedPropertiesDeep,
  SnakeCasedPropertiesDeep,
} from "type-fest";

let toCamelCaseImpl: <T extends Record<string, unknown>>(
  val: T,
) => CamelCasedPropertiesDeep<T>;
let toSnakeCaseImpl: <T extends Record<string, unknown>>(
  val: T,
) => SnakeCasedPropertiesDeep<T>;

// This is a build-time check. `tsup` will replace `process.env.TSUP_BUILD_ENV`
// with a string literal. The `if` block that is not taken will be removed
// by the bundler (tree-shaking), including its unused imports.

// @ts-ignore
if (process.env.TSUP_BUILD_ENV === "bare") {
  // biome-ignore lint/suspicious/noExplicitAny: Bridging library types
  toCamelCaseImpl = humps.camelizeKeys as any;
  // biome-ignore lint/suspicious/noExplicitAny: Bridging library types
  toSnakeCaseImpl = humps.decamelizeKeys as any;
} else {
  const camelFn = (val: Record<string, unknown>) =>
    camelcaseKeys(val, { deep: true });
  const snakeFn = (val: Record<string, unknown>) =>
    decamelizeKeys(val, { deep: true });

  // biome-ignore lint/suspicious/noExplicitAny: Bridging library types.
  toCamelCaseImpl = camelFn as any;
  // biome-ignore lint/suspicious/noExplicitAny: Bridging library types.
  toSnakeCaseImpl = snakeFn as any;
}

export const toCamelCase = toCamelCaseImpl;
export const toSnakeCase = toSnakeCaseImpl;
