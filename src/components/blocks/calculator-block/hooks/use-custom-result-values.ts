import { useMemo } from 'react';
import { TFunction } from 'react-i18next';
import { CustomResultValue } from '../interface';

export const useCustomResultValues = (
  userDefinedFunctionBodies: string[],
  userDefinedFunctionArguments: string,
  args: any[],
  t: TFunction<'translation'>,
): CustomResultValue[] => {
  return useMemo(
    () =>
      userDefinedFunctionBodies.reduce((result, userDefinerFunctionBody) => {
        try {
          const userDefinedFunction =
            // eslint-disable-next-line no-eval
            eval(`((${userDefinedFunctionArguments}) => {
              ${userDefinerFunctionBody}
            })`);

          const value = userDefinedFunction(...args, t);

          if (value) {
            result[value.key] = value;
          }
        } catch (e) {
          console.warn(e);
        }

        return result;
      }, {} as any),
    [userDefinedFunctionBodies, userDefinedFunctionArguments, args, t],
  );
};
