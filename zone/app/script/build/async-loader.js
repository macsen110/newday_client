
import React, {Component} from 'react';
//export default {};

/**
 * 异步的组件
 */
export default function asyncLoader(component) {
  return React.createClass({
    getInitialState() {
      return {
        Component: null
      }
    },


    componentDidMount() {
      //模拟出loading的效果
      // setTimeout(() => {
      //   component((Component) => {
      //     this.setState({
      //       Component: Component
      //     });
      //   });
      // }, 1000);
      component((Component) => {
        this.setState({
          Component: Component
        });
      });
    },


    render() {
      var Component = this.state.Component;

      if (Component) {
        let NewComponent = Component.default || Component;
        return <NewComponent {... this.props}/>
      } else {
        return <div>Loading...</div>;
      }
    }
  })
}