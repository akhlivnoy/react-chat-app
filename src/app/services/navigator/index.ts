import { NavigateFunction, NavigateOptions, To, useNavigate } from 'react-router-dom';

import { Nullable } from '#types/nullable';

export class StaticNavigator {
  static navigator: Nullable<NavigateFunction> = null;

  static navigate(to: To | number, options?: NavigateOptions) {
    if (this.navigator) {
      if (typeof to === 'number') {
        this.navigator(to);
      } else {
        this.navigator(to, options);
      }
    }
  }
}

export const NavigatorSetter = () => {
  StaticNavigator.navigator = useNavigate();

  return null;
};
