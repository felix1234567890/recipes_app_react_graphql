import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { gql } from "apollo-boost";
import { graphql, compose, withApollo } from "react-apollo";
import { Link } from "react-router-dom";
const SINGLE_RECIPE = gql`
  query($id: ID!) {
    recipe(where: { id: $id }) {
      title
      ingredients
      directions
      published
    }
  }
`;
const EDIT_RECIPE = gql`
  mutation(
    $id: ID!
    $title: String!
    $ingredients: String!
    $directions: String!
    $published: Boolean
  ) {
    updateRecipe(
      where: { id: $id }
      data: {
        title: $title
        ingredients: $ingredients
        directions: $directions
        published: $published
      }
    ) {
      id
      title
    }
  }
`;
export class EditRecipe extends Component {
  state = {
    title: "",
    ingredients: "",
    directions: ""
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.client
      .query({
        query: SINGLE_RECIPE,
        variables: { id }
      })
      .then(data =>
        this.setState({
          title: data.data.recipe.title,
          ingredients: data.data.recipe.ingredients,
          directions: data.data.recipe.directions
        })
      );
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { title, ingredients, directions } = this.state;
    const id = this.props.match.params.id;
    this.props
      .mutate({
        variables: { id, title, ingredients, directions, published: false }
      })
      .then(({ data }) => {
        this.props.history.push("/");
      })
      .catch(e => console.log(e));
  };
  render() {
    return (
      <div>
        <h1 className=" text-center">Edit recipe</h1>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Enter title"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="ingredients">Ingredients</Label>
            <Input
              type="text"
              name="ingredients"
              placeholder="Enter ingredients"
              value={this.state.ingredients}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="directions">Directions</Label>
            <Input
              type="text"
              name="directions"
              placeholder="Enter directions"
              value={this.state.directions}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit" onClick={this.handleSubmit}>
            Edit
          </Button>
          <Link to="/" className="btn btn-warning mx-1">
            Back
          </Link>
        </Form>
      </div>
    );
  }
}

export default compose(
  graphql(EDIT_RECIPE),
  withApollo
)(EditRecipe);
