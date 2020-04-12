const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

let idCount = links.length;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    info: () => "This is the API for hackernews clone",
    feed: () => links,
    link: (parent, args) => links.find(link => link.id === args.id)
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },

    deleteLink: (parent, args) => {
      const deleted = links.find(({ id }) => id === args.id);
      links = links.filter(({ id }) => id !== args.id);
      return deleted;
    },

    updateLink: (parent, args) => {
      const idx = links.findIndex(({ id }) => id === args.id);
      if (!idx) {
        return null;
      }
      if (args.url) {
        links[idx].url = args.url;
      }

      if (args.description) {
        links[idx].description = args.description;
      }

      return links[idx];
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers
});

server.start(() => console.log(`Server is running`));
