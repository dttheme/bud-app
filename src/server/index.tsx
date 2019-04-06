import express from "express";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import gql from "graphql-tag";
import buildASTSchema from "graphql";

const PLANTS = [
  {
    common_name: "strawberry",
    scientific_name: "testing"
  },
  {
    common_name: "thyme",
    scientific_name: "testing"
  }
];

const schema = buildASTSchema(gql`
type Query {
    plants:[Plant]
    plant:(id: ID!): Plant
}
type Plant {
    id: ID;
    common_name: String;
    scientific_name: String;
}
`);

const mapPlant = (plant, id) => plant && { id, ...plant };

const root = {
  plants: () => PLANTS.map(mapPlant),
  plant: ({ id }) => mapPlant(PLANTS[id], id)
};

const app = express();

app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
