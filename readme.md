# Documentation

## Dev environment for Node.js Lambda function

Custom webpack setup was created to manage development and production builds. The following features were used:

1. **webpack-merge** for separating development and production configuration.
2. **concurrently** for simultaneously watching and transpiling .ts files with webpack, and watching the produced .js files with nodemon, for seamless development stream.

`npm i` to install needed packages

`npm start` to start development webpack process to watch and continuously bundle our files

`npm build` to generate a final minimised build
