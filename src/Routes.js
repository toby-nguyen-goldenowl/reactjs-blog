import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Home = lazy(() => import("./views/blog/Home"));
const LayoutComponent = lazy(() => import("./components/layouts/Index"));
const LoginComponent = lazy(() => import("./components/login/Login"));
const SignUpComponent = lazy(() => import("./components/login/Signup"));
const LogoutComponent = lazy(() => import("./components/login/Confirm"));
const CreateBlogComponent = lazy(() => import("./components/blog/Createblog"));
const BlogitemDetail = lazy(() => import("./components/blog/BlogitemDetail"));
const MyBlog = lazy(() => import("./views/blog/Myblog"));
const MySaved = lazy(() => import("./views/blog/Mysaved"));
const HomeChildrenComponent = lazy(() => import("./views/blog/HomeChildren"));
const NotFound = lazy(() => import("./views/common/NotFound"));

export const Routes = {
  Root: {
    path: "/",
    layout: LayoutComponent,
    component: HomeChildrenComponent,
    routes: {
      MyBlog: {
        path: "/my-blog",
        component: MyBlog,
      },
      Login: {
        path: "/login",
        component: LoginComponent,
      },
      SignUp: {
        path: "/signup",
        component: SignUpComponent,
      },
      Logout: {
        path: "/logout",
        component: LogoutComponent,
      },
      CreateBlog: {
        path: "/createblog",
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
      Home: {
        path: "/home",
        component: Home,
      },
      Default: {
        path: "/",
        component: NotFound,
      },
    },
  },
};
export default function RouteConfig({ routes }) {
  return (
    <Switch>
      {Object.keys(routes).map((key) => {
        if (!routes[key].auth) {
          const Layout = routes[key].layout || React.Fragment;
          const Component = routes[key].component || React.Fragment;

          return (
            <Route
              key={key}
              path={routes[key].path}
              /* eslint-disable react/jsx-props-no-spreading */
              render={(props) => (
                <Layout>
                  <Component {...props}>
                    {routes[key].routes
                      ? RouteConfig({ routes: routes[key].routes })
                      : null}
                  </Component>
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
