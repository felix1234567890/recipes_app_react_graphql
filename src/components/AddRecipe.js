import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
const ADD_RECIPE = gql`
  mutation(
    $title: String!
    $ingredients: String!
    $directions: String!
    $published: Boolean
  ) {
    createRecipe(
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
export class AddRecipe extends Component {
  state = {
    title: "",
    ingredients: "",
    directions: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { title, ingredients, directions } = this.state;
    this.props
      .mutate({
        variables: { title, ingredients, directions, published: false }
      })
      .then(({ data }) => {
        this.props.history.push("/");
      })
      .catch(e => console.log(e));
  };
  render() {
    return (
      <div>
        <h1 className=" text-center">Add a recipe</h1>
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
            Add
          </Button>
          <Link to="/" className="btn btn-warning mx-1">
            Back
          </Link>
        </Form>
      </div>
    );
  }
}

export default graphql(ADD_RECIPE)(AddRecipe);
