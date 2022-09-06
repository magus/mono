// maybe 'barrel file' pattern is not great since we have to add
// "sideEffects": false, to get tree shaking to work properly
// though it is convenient for being able to `import { Anything } from '@magusn/react'`
// alternative would be to import specifically via package syntax
// `import { MagicAuthProvider } from '@magusn/react/magic-auth/MagicAuthProvider'`

// default export from @magusn/react is components
// exporting specifics can be done via folders
// e.g.
//    import { MagicAuth } from '@magusn/react/magic-auth'
//
// export * lets components/index.js control exports
export * from './components';
export * from './hooks';
