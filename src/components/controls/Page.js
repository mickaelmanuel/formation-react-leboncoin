import React, { Component } from "react";

export default class Page extends Component {
  static defaultProps = {
    isActive: false,
    isDisabled: false,
    href: "#"
  };

  render() {
    return (
      <li
        onClick={e => {
          const { isDisabled, pageNumber } = this.props;
          e.preventDefault();
          if (isDisabled) {
            return;
          }
          this.props.onClick(pageNumber);
        }}
      >
        <a
          href={this.props.href}
          className={this.props.isActive ? "active" : null}
        >
          {this.props.pageText}
        </a>
      </li>
    );
  }
}
