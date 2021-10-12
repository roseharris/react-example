// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

//TODO - Your ES6 JavaScript code (if any) goes here
import React from 'react'
import ReactDOM from 'react-dom'

class Hello extends React.Component {
  render(){
    return (
      <h1>
        Welcome to WEB 3430 
        <span className="subtitle"> Powered by React!</span>
      </h1>
    )
  }
}

ReactDOM.render(<Hello/>, document.getElementById('main'))