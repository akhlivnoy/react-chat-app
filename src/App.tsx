import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from '#navigation';
import { persistor, store } from '#redux/store';
import i18n from '#services/localization';

export const App: React.ComponentType = () => (
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
