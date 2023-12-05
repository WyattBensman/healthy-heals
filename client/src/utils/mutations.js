import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $fName: String!
    $lName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      fName: $fName
      lName: $lName
      email: $email
      password: $password
    ) {
      token
      user {
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
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $fName: String
    $lName: String
    $email: String
    $password: String
  ) {
    updateUser(
      fName: $fName
      lName: $lName
      email: $email
      password: $password
    ) {
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

export const CREATE_DISH = gql`
  mutation CreateDish(
    $title: String!
    $description: String!
    $image: String
    $cookTime: Int!
    $category: String!
    $ingredients: [String]!
    $instructions: [String]!
  ) {
    createDish(
      title: $title
      description: $description
      image: $image
      cookTime: $cookTime
      category: $category
      ingredients: $ingredients
      instructions: $instructions
    ) {
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

export const UPDATE_DISH = gql`
  mutation UpdateDish(
    $dishId: ID!
    $title: String
    $description: String
    $image: String
    $cookTime: Int
    $category: String
    $ingredients: [String]
    $instructions: [String]
  ) {
    updateDish(
      dishId: $dishId
      title: $title
      description: $description
      image: $image
      cookTime: $cookTime
      category: $category
      ingredients: $ingredients
      instructions: $instructions
    ) {
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

export const DELETE_DISH = gql`
  mutation DeleteDish($dishId: ID!) {
    deleteDish(dishId: $dishId) {
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

export const SAVE_DISH = gql`
  mutation SaveDish($dishId: ID!) {
    saveDish(dishId: $dishId) {
      _id
      fName
      lName
      email
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

export const UNSAVE_DISH = gql`
  mutation UnsaveDish($dishId: ID!) {
    unsaveDish(dishId: $dishId) {
      _id
      fName
      lName
      email
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
