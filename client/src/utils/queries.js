import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      _id
      fName
      lName
      email
      createdDishes {
        _id
        title
        description
        image
        cookTime
        category
        ingredients
        instructions
        author {
          _id
          fName
          lName
          email
        }
        createdAt
        likeCount
      }
      savedDishes {
        _id
        title
        description
        image
        cookTime
        category
        ingredients
        instructions
        author {
          _id
          fName
          lName
          email
        }
        createdAt
        likeCount
      }
    }
  }
`;

export const GET_DISH = gql`
  query GetDish($dishId: ID!) {
    dish(dishId: $dishId) {
      _id
      title
      description
      image
      cookTime
      category
      ingredients
      instructions
      author {
        _id
        fName
        lName
        email
      }
      createdAt
      likeCount
    }
  }
`;

export const GET_DISHES = gql`
  query GetDishes($category: String) {
    dishes(category: $category) {
      _id
      title
      description
      image
      cookTime
      category
      ingredients
      instructions
      author {
        _id
        fName
        lName
        email
      }
      createdAt
      likeCount
    }
  }
`;
