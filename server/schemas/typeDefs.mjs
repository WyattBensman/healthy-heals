const typeDefs = `
type User {
    _id: ID!
    fName: String
    lName: String
    email: String
    password: String
    createdDishes: [Dish]
    savedDishes: [Dish]
}

scalar Upload

type Dish {
    _id: ID!
    title: String
    description: String
    image: Upload
    cookTime: Int
    category: String
    ingredients: [String]
    instructions: [String]
    author: User
    createdAt: String
    likeCount: Int
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    user(userId: ID!): User
    dish(dishId: ID!): Dish
    dishes(category: String): [Dish]
}

type Mutation {
    login(email: String!, password: String!): Auth
    createUser(fName: String!, lName: String!, email: String!, password: String!): Auth
    updateUser(fName: String, lName: String, email: String, password: String): User
    createDish(title: String!, description: String!, image: Upload, cookTime: Int!, category: String!, ingredients: [String]!, instructions: [String]!): Dish
    updateDish(dishId: ID!, title: String, description: String, image: Upload, cookTime: Int, category: String, ingredients: [String], instructions: [String]): Dish
    deleteDish(dishId: ID!): User
    saveDish(dishId: ID!): User
    unsaveDish(dishId: ID!): User
}
`;

export default typeDefs;
