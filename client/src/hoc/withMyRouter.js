import React from "react";
import { useParams } from "react-router-dom";

export const withMyRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};
