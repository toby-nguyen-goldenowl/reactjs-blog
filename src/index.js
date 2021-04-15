import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import App from "./App";
import * as env from "./constant-env/index";
import store from "./store/index";

Sentry.init({
  dsn: env.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store().store}>
      <PersistGate loading="null" persistor={store().persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
