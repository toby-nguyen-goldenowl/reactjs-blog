import React from "react";
import { Switch, Route } from "react-router-dom";
import uuid from "react-uuid";
// import { connect } from "react-redux";

// const Home = lazy(() => import("./components/blog/home"));
// const Layout = lazy(() => import("./components/layouts/index"));
// const Listing = lazy(() => import("./components/blog/listing"));

import HomeComponent from "./components/blog/home";
import LayoutComponent from "./components/layouts/index";
import ListingComponent from "./components/blog/listing";
import LoginComponent from "./components/login/login";
import LogupComponent from "./components/login/logup";
import LogoutComponent from "./components/login/logout";

export const Routes = {
  Login: {
    path: "/login",
    layout: LayoutComponent,
    component: LoginComponent,
  },
  Logup: {
    path: "/logup",
    layout: LayoutComponent,
    component: LogupComponent,
  },
  Logout: {
    path: "/logout",
    layout: LayoutComponent,
    component: LogoutComponent,
  },
  Home: {
    path: "/",
    layout: LayoutComponent,
    component: HomeComponent,
    routes: {
      Listing: {
        path: "/listings",
        layout: LayoutComponent,
        component: ListingComponent,
      },
    },
  },
};

export default function RouteConfig({ routes }) {
  return (
    <Switch>
      {Object.values(routes).map((route) => (
        // <RouteWithLayout
        //   /* eslint-disable react/jsx-props-no-spreading */
        //   key={uuid()}
        //   route={route}
        // />
        <Route
          key={uuid()}
          path={route.path}
          /* eslint-disable react/jsx-props-no-spreading */
          render={(props) => (
            <route.layout {...props}>
              <route.component {...props}>
                {route.routes ? RouteConfig({ routes: route.routes }) : null}
              </route.component>
            </route.layout>
          )}
        />
      ))}
    </Switch>
  );
}

// function RouteWithLayout({ route, ...rest }) {
//   console.log(route.layout);
//   console.log(route.component);
//   return (
//     <Route
//       {...rest}
//       path={route.path}
//       render={(props) => (
//         <layout {...props}>
//           <component {...props}>
//             {route.routes ? RouteConfig({ routes: route.routes }) : null}
//           </component>
//         </layout>
//       )}
//     />
//   );
// }
