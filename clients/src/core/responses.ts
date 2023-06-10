// This is imported from outside of this src root because it has been 
// defined in "api/core" as common response types used in /api and /clients
import {
  ResultOrError,
  IsError,
  hasResult,
  isError,
  hasError,
  setLogger,
} from "../../../api/core/responses.js";

// ValueOrError is the return type for clients who will always 
// return an array as [value,null] or [null,error],
type ValueOrError<T> = [T | null, IsError | null]; // [value, error]

export {
  ResultOrError,
  ValueOrError,
  IsError,
  hasResult,
  isError,
  hasError,
  setLogger,
}