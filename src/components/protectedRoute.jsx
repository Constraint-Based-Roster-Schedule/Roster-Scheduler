import React, { Component } from "react";
import { Route, Navigate, useParams } from "react-router-dom";
import authService from "../auth_service/auth_services";

const ProtectedRoute = ({ permissions, children }) => {
  const currentUser = authService.getUserType();
  // console.log("currentUser: ", currentUser);
  if (currentUser) {
    if (!permissions) return children;
    else if (permissions == currentUser) return children;
    else {
      return (
        <Navigate
          replace
          to={{
            pathname: "/notfound",
            // state: { from: children.location }
          }}
        />
      );
    }
  } else {
    return (
      <Navigate
        to={{
          pathname: "/login",
          // state: { from: children.location }
        }}
      />
    );
  }
};

export default ProtectedRoute;
