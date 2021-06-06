import React, { Suspense, lazy } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Aux from "../hoc/Auxiliary"
import Config from "../config"

const HolidayComponent = lazy(() => import("../components/HolidayComponent"))
const layout = (props) => {
    return(
        <Aux>
            <main className="container">
            <BrowserRouter>
            <Suspense fallback={<div>&nbsp;</div>}>
               <Switch>
                   <Route path={Config.HOLIDAY_LANDING_PAGE} exact component={HolidayComponent}></Route>
              </Switch>
              </Suspense>
            </BrowserRouter>
            </main>
        </Aux>
    );
}
export default layout