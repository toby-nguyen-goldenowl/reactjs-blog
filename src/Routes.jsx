import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import uuid from "react-uuid";
// import { connect } from "react-redux";
import { MDXProvider } from "@mdx-js/react";

const HomeComponent = lazy(() => import("./components/blog/Home"));
const LayoutComponent = lazy(() => import("./components/layouts/Index"));
const ListingComponent = lazy(() => import("./components/blog/Listing"));
const LoginComponent = lazy(() => import("./components/login/Login"));
const LogupComponent = lazy(() => import("./components/login/Signup"));
const LogoutComponent = lazy(() => import("./components/login/Confirm"));
const CreateBlogComponent = lazy(() => import("./components/blog/Createblog"));
const BlogitemDetail = lazy(() => import("./components/blog/BlogitemDetail"));
const MyBlog = lazy(() => import("./components/blog/Myblog"));
const MySaved = lazy(() => import("./components/blog/Mysaved"));
const HomeChildrenComponent = lazy(() =>
  import("./components/blog/Homechildren")
);

// const LoadingComponent = lazy(() => import("./components/common/Loading"));

// import HomeComponent from "./components/blog/home";
// import LayoutComponent from "./components/layouts/index";
// import ListingComponent from "./components/blog/listing";
// import LoginComponent from "./components/login/login";
// import LogupComponent from "./components/login/logup";
// import LogoutComponent from "./components/login/logout";

export const Routes = {
  Home: {
    path: "/",
    layout: LayoutComponent,
    component: HomeChildrenComponent,
    routes: {
      Listing: {
        path: "/listings",
        component: ListingComponent,
      },
      MyBlog: {
        path: "/my-blog",
        component: MyBlog,
      },
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
      BlogContent: {
        path: "/blog/:id",
        component: BlogitemDetail,
      },
      MySaved: {
        path: "/my-saved",
        component: MySaved,
      },
      Default: {
        path: "/",
        component: HomeComponent,
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
          const Layout = route.layout || MDXProvider;
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
