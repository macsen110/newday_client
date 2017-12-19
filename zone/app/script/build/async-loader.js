import React from "react";
const asyncComponent = (loadComponent, useBundleLoader) =>
  class AsyncComponent extends React.Component {
    state = {
      Component: null
    };

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }
      //为了兼容使用bundle-loader的包
      function fetchPromise() {
        return new Promise((res, rej) => {
          if (useBundleLoader) {loadComponent(mod => {res(mod)})}
          else res(loadComponent())
        });
      }
      fetchPromise()
        .then(module => this.setState({ Component: module.default ? module.default : module }))
        .catch(err => {
          console.error(`Cannot load component in <AsyncComponent />`);
          throw err;
        });
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  };

export default asyncComponent;
