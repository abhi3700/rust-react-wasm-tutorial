# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Add Rust (for Rust dev)

```rust
// Create Rust library for Wasm
$ cargo new wasm-lib --lib
```

Add `wasm-bindgen` to `Cargo.toml` & then wrap the function with `#[wasm_bindgen]` macro like this:

```diff
// Cargo.toml
[package]
name = "wasm-lib"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

+[lib]
+crate-type = ["cdylib"]

[dependencies]
# Rust <--> JS interop
+wasm-bindgen = "0.2.89"
```

```diff
// wasm-lib/src/lib.rs
+use wasm_bindgen::prelude::wasm_bindgen;

+#[wasm_bindgen]
pub fn add(left: usize, right: usize) -> usize {
    left + right
}
```

## For React dev

And then use `wasm-pack` to build the Rust library into a WebAssembly module and bundle it up into a JavaScript package.

```sh
# install wasm-pack (by Rust dev)
$ cargo install wasm-pack
# OR (by React dev)
$ curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# verify wasm-pack installation
$ wasm-pack --version
```

Next, add a script command into `package.json`:

```diff
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
+   "build:wasm": "cd wasm-lib && wasm-pack build --target web --out-dir pkg",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

Next, run the script command:

```sh
$ npm run build:wasm
```

Now, install the `wasm-lib` package into the React app:

```sh
$ npm install ./wasm-lib/pkg
```

This installs the `wasm-lib` package from the local file system. The `wasm-lib` package is a WebAssembly module that contains the Rust function we want to use in the React app.

```diff
// package.json
...
+"wasm-lib": "file:wasm-lib/pkg",
...
```

Lastly, add some bunch of code to use the Rust function in the React app:

```diff
import React, { useEffect, useState } from "react";
+import init, { add } from "wasm-lib";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // inputs
+  let x = 42,
+    y = 51;

+  const [ans, setAns] = useState(0);
+  useEffect(() => {
+    init().then(() => {
+      setAns(add(x, y));
+    });
+  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
+        <p>
+          Edit <code>src/App.tsx</code> and save to reload.
+        </p>
        +<p>
        +  {x} + {y} = {ans}
        +</p>
        <a
          className="App-link"

```

And you are done! Now, just `$ npm start` and you can use the Rust function in the React app.
