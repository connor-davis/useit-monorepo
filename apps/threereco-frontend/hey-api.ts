export default {
  input: {
    path: 'http://localhost:6173/api/api-spec',
  },
  output: {
    lint: 'eslint',
    path: 'src/api-client',
  },
  plugins: ['@tanstack/react-query', '@hey-api/client-fetch'],
};
