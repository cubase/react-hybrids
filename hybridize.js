import { define, render } from 'hybrids'
import React from 'react'
import ReactDOM from 'react-dom'
import '@webcomponents/webcomponentsjs'

import * as Components from './components'

const hybridize = fn => render(
    host => {
      const ReactComponent = fn(host)
      return (_, target) => ReactDOM.render(ReactComponent, target)
    },
    { shadowRoot: false })

Object.entries(Components).forEach(([componentName, Component]) => {
    if (!Component.defaultHybridProps) return console.error(`Exported React components must include static object 'defaultHybridProps' property`)
    // Camel-case props are not supported
    const hybridProps = Object.keys(Component.defaultHybridProps)
    if (hybridProps.some(propName => /[A-Z]/.test(propName))) {
        console.warn(`[${componentName}] Camel-case props are not supported`)
    }
    const HybridizedComponent = {
        render: hybridize(host => {
          const props = hybridProps.reduce((acc, propName) => {
            acc[propName] = host[propName]
            return acc
          }, {})
          return <Component {...props} />
        })
    }

    Object.entries(Component.defaultHybridProps).forEach(([name, defaultValue]) => {
        // Map default props to web component
        HybridizedComponent[name] = defaultValue
    })

    define(`react-${componentName.toLowerCase()}`, HybridizedComponent)
})
