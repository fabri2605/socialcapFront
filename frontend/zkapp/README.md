# zkApp SvelteKit UI with Add contract example

An example on how to set up a running zkApp UI using SvelteKit.

It demonstrates (see `src/lib/contracts/helpers`) how to: 

1. **load Snarky and init the zkApp instance, and compile the contract**
2. **connect the Auro wallet**
3. **call the update() method on the contract and send a transaction with fees payed with the wallet**

The example contract is based on the MINA Protocol zkApp tutorial/example contract which adds 2 to the current state.

A running build of the Smart contract can be found in [NPM @mazito/zkapp-contracts-add](https://www.npmjs.com/package/@mazito/zkapp-contracts-add)

Features:

- It corrects config params for `vite.config.js`,`svelte.config.json`, and `tsconfig.json`. At the time of this writing (2023-06-20) a project created using `zk project ...` will not build.
- It is tested using the `static` adapter, so currently it can only be deployed as a static site or an SPA.
- Uses: Typescript, Node 19+, SvelteKit 

## Install

Clone this repo, remove `package-lock.json`, an install:
~~~
  npm i 
~~~

Just in case, install the Add contract from NPMContract:
~~~
  npm i @mazito/zkapp-contracts-add
~~~

## Developing

Once you've created a project and installed dependencies with `npm install`:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
