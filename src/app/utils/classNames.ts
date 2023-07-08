import _ from 'lodash';

import { classNamesArgs } from '#types/classNamesArgs';

export const classNames = (...args: classNamesArgs) => {
  const classes: string[] = [];

  _.map(args, arg => {
    if (arg) {
      switch (typeof arg) {
        case 'string':
          classes.push(arg);
          break;
        case 'object':
          _(arg)
            .entries()
            .map(prop => {
              if (prop[1]) {
                classes.push(prop[0]);
              }

              return null;
            });
          break;
        default:
          break;
      }
    }

    return null;
  });

  return classes.join(' ');
};
