import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import AppShell from "./AppShell";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import FourOFour from "./pages/FourOFour";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Temp from "./pages/Temp";
import Users from "./pages/Users";

const AuthenticatedRoute = ({ children, path, redirectPath }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      path={path}
      render={() =>
        isAuthenticated() ? <AppShell>{children}</AppShell> : <Redirect to={redirectPath} />
      }
    />
  );
};
const AdminRoute = ({ children, path, redirectPath }) => {
  const { isAdmin, isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      path={path}
      render={() =>
        isAdmin() && isAuthenticated() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to={redirectPath} />
        )
      }
    />
  );
};

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/temp">
        <Temp />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <AuthenticatedRoute path="/dashboard" redirectPath="/">
        <Dashboard />
      </AuthenticatedRoute>
      <AdminRoute path="/inventory" redirectPath="/">
        <Inventory />
      </AdminRoute>
      <AuthenticatedRoute path="/account" redirectPath="/">
        <Account />
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/settings" redirectPath="/">
        <Settings />
      </AuthenticatedRoute>
      <AdminRoute path="/users" redirectPath="/">
        <Users />
      </AdminRoute>
      <Route path="*">
        <FourOFour />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
