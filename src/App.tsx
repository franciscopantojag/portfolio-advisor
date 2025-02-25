import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/globals.scss";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/calculator">
            <Calculator />
          </Route>
          <Route exact path="/">
            <Index />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
