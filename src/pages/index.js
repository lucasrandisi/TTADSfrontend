import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import OrderContainer from "../components/order/orderContainer.tsx"

export default function Pages() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/order/:id" component={OrderContainer} />
      </Switch>
    </BrowserRouter>
  )
}
