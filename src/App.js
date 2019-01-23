import React, { Component } from "react";
import Header from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import Recipe from "./components/Recipe";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import { Container } from "reactstrap";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div>
            <Header />
            <Container>
              <Switch>
                <Route exact path="/" component={RecipeList} />
                <Route path="/add" component={AddRecipe} />
                <Route path="/edit/:id" component={EditRecipe} />
                <Route path="/:id" component={Recipe} />
              </Switch>
            </Container>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
