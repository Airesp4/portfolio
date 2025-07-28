const fs = require('fs');
const token = process.env.GITHUB_TOKEN;

if (!token) {
  throw new Error('❌ GITHUB_TOKEN não definido');
}

const content = `
export const environment = {
  production: true,
  githubToken: '${token}'
};
`;

fs.writeFileSync('./src/app/environments/environment.ts', content);
console.log('✅ Token injetado com sucesso!');
