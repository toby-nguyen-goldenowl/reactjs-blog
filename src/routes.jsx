import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import uuid from "react-uuid";
// import { connect } from "react-redux";

const HomeComponent = lazy(() => import("./components/blog/home"));
const LayoutComponent = lazy(() => import("./components/layouts/index"));
const ListingComponent = lazy(() => import("./components/blog/listing"));
const LoginComponent = lazy(() => import("./components/login/login"));
const LogupComponent = lazy(() => import("./components/login/logup"));
const LogoutComponent = lazy(() => import("./components/login/confirm"));
const CreateBlogComponent = lazy(() => import("./components/blog/createblog"));
const BlogitemDetail = lazy(() => import("./components/blog/BlogitemDetail"));
const MyBlog = lazy(() => import("./components/blog/Myblog"));
const MySaved = lazy(() => import("./components/blog/Mysaved"));

// const LoadingComponent = lazy(() => import("./components/common/Loading"));

// import HomeComponent from "./components/blog/home";
// import LayoutComponent from "./components/layouts/index";
// import ListingComponent from "./components/blog/listing";
// import LoginComponent from "./components/login/login";
// import LogupComponent from "./components/login/logup";
// import LogoutComponent from "./components/login/logout";

export const Routes = {
  Login: {
    path: "/login",
    auth: false,
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
  CreateBlog: {
    path: "/createblog",
    layout: LayoutComponent,
    component: CreateBlogComponent,
  },
  MyBlog: {
    path: "/my-blog",
    layout: LayoutComponent,
    component: MyBlog,
  },
  BlogContent: {
    path: "/blog/:id",
    layout: LayoutComponent,
    component: BlogitemDetail,
  },
  MySaved: {
    path: "/my-saved",
    layout: LayoutComponent,
    component: MySaved,
  },
  Home: {
    path: "/",
    layout: LayoutComponent,
    component: HomeComponent,
    routes: {
      Listing: {
        path: "/listings",
        // layout: React.Fragment,
        component: ListingComponent,
      },
    },
  },
};
export default function RouteConfig({ routes }) {
  return (
    <Switch>
      {Object.values(routes).map((route) => {
        // <RouteWithLayout
        //   /* eslint-disable react/jsx-props-no-spreading */
        //   key={uuid()}
        //   route={route}
        // />
        // if (route.auth) {
        //   return (
        //     <Route
        //       key={uuid()}
        //       path={route.path}
        //       /* eslint-disable react/jsx-props-no-spreading */
        //       render={(props) => (
        //         <route.layout {...props}>
        //           <WapperComponent {...props} route={route} />
        //         </route.layout>
        //       )}
        //     />
        //   );
        // }
        if (!route.auth) {
          const Layout = route.layout || React.Fragment;
          return (
            <Route
              key={uuid()}
              path={route.path}
              /* eslint-disable react/jsx-props-no-spreading */
              render={(props) => (
                <Layout {...props}>
                  <route.component {...props}>
                    {route.routes
                      ? RouteConfig({ routes: route.routes })
                      : null}
                  </route.component>
                </Layout>
              )}
            />
          );
        }
        return null;
      })}
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

// const RouteWapper = (props) => {
//   const { route, loading, userId, ...rest } = props;
//   if (loading) {
//     return <LoadingComponent />;
//   }
//   if (userId) {
//     return (
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       <route.component {...rest}>
//         {route.routes ? RouteConfig({ routes: route.routes }) : null}
//       </route.component>
//     );
//   }
//   return <Redirect to="/login" />;
// };

// const mapStateToProps = (state) => ({
//   userId: state.user.userId,
//   loading: state.user.loading,
// });

// const WapperComponent = connect(mapStateToProps)(RouteWapper);
