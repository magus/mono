// maybe 'barrel file' pattern is not great since we have to add
// "sideEffects": false, to get tree shaking to work properly
// though it is convenient for being able to `import { Anything } from '@magusn/react'`
// alternative would be to import specifically via package syntax
// `import { MagicAuthProvider } from '@magusn/react/src/magic-auth/MagicAuthProvider'`

export { Button } from './components/Button/Button';
export { usePageVisibility } from './hooks/usePageVisibility';

// export * because magic-auth/index.js controls exports
export * from './magic-auth';
