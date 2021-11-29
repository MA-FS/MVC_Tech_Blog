// Require dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine instance with custom helpers
const hbs = exphbs.create({ helpers });

// Create session object constant for use with session()
const sess = {
  // This is the secret used to sign the session ID cookie.
  secret: "This is an ultra super secret phrase",
  // Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute.
  cookie: { maxAge: null },
  // Forces the session to be saved back to the session store, even if the session was never modified during the request
  resave: false,
  // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
  saveUninitialized: true,
  // The session store instance, defaults to a new MemoryStore instance.
  store: new SequelizeStore({
    // Connect the Sequelize instance with express and sessions
    db: sequelize,
  }),
};

// Create Session middleware
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}!`));
});
