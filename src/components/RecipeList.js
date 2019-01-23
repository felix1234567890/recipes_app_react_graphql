import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const ALL_RECIPES = gql`
  query {
    recipes {
      id
      title
      ingredients
      directions
    }
  }
`;

export default class RecipeList extends Component {
  render() {
    return (
      <Query query={ALL_RECIPES}>
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading...</h1>;
          if (error) return <h2>{error.message}</h2>;
          return (
            <div>
              {data.recipes.map(recipe => (
                <ListGroup className="mt-2" key={recipe.id}>
                  <ListGroupItem>
                    {recipe.title}
                    <Link
                      className="btn btn-primary float-right"
                      to={"/" + recipe.id}
                    >
                      Show
                    </Link>
                  </ListGroupItem>
                </ListGroup>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
