import React from "react";
import PropTypes from "prop-types";

export const List = ({ children }) => <ul>{children}</ul>;

List.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};
