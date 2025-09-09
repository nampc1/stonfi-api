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
  // For the bare build, use the compatible `humps` library.
  toCamelCaseImpl = <T extends Record<string, unknown>>(
    val: T,
  ): CamelCasedPropertiesDeep<T> => {
    return humps.camelizeKeys(val) as CamelCasedPropertiesDeep<T>;
  };
  toSnakeCaseImpl = <T extends Record<string, unknown>>(
    val: T,
  ): SnakeCasedPropertiesDeep<T> => {
    return humps.decamelizeKeys(val) as SnakeCasedPropertiesDeep<T>;
  };
} else {
  // For Node.js builds, use the libraries with modern regex.
  toCamelCaseImpl = <T extends Record<string, unknown>>(
    val: T,
  ): CamelCasedPropertiesDeep<T> => {
    return camelcaseKeys(val, { deep: true }) as CamelCasedPropertiesDeep<T>;
  };
  toSnakeCaseImpl = <T extends Record<string, unknown>>(
    val: T,
  ): SnakeCasedPropertiesDeep<T> => {
    return decamelizeKeys(val, { deep: true }) as SnakeCasedPropertiesDeep<T>;
  };
}

export const toCamelCase = toCamelCaseImpl;
export const toSnakeCase = toSnakeCaseImpl;
