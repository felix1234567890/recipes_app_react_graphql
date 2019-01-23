import React, { Component } from "react";
import { Card, CardText, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { Query, graphql } from "react-apollo";

const SINGLE_RECIPE = gql`
  query($id: ID!) {
    recipe(where: { id: $id }) {
      id
      title
      ingredients
      directions
    }
  }
`;
const DELETE_RECIPE = gql`
  mutation($id: ID!) {
    deleteRecipe(where: { id: $id }) {
      title
    }
  }
`;
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

class Recipe extends Component {
  deleteRecipe = id => {
    this.props
      .mutate({
        variables: { id },
        refetchQueries: [{ query: ALL_RECIPES }]
      })
      .then(({ data }) => {
        this.props.history.push("/");
      })
      .catch(e => console.log(e));
  };
  render() {
    const id = this.props.match.params.id;
    return (
      <Query query={SINGLE_RECIPE} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <h1>Loading....</h1>;
          if (error) return <h2>{error.message}</h2>;

          return (
            <Card body className="text-center mt-2">
              <CardTitle>{data.recipe.title}</CardTitle>
              <CardText className="lead">
                <strong>Ingredients:</strong>
                {data.recipe.ingredients}
                <br />
                <strong>Directions:</strong>
                {data.recipe.directions}
              </CardText>
              <div>
                <Link to="/" className="btn btn-secondary mx-1">
                  Back
                </Link>
                <Link
                  to={"/edit/" + data.recipe.id}
                  className="btn btn-info mx-1"
                >
                  Edit
                </Link>
                <Button
                  onClick={() => this.deleteRecipe(data.recipe.id)}
                  className="btn btn-danger mx-1"
                >
                  Delete
                </Button>
              </div>
            </Card>
          );
        }}
      </Query>
    );
  }
}
export default graphql(DELETE_RECIPE)(Recipe);
