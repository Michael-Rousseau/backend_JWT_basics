npm init -y
npm i typescript express dotenv nodemon types
npx tsc --init
touch .env
touch .gitignore
touch run.sh
chmod +x run.sh
echo "/node_modules" >> .gitignore
echo ".env" >> .gitignore
echo "npm run build" >> run.sh
echo "tsc src/app.ts" >> run.sh
echo "nodemon dist/app.js" >> run.sh

cp ../tsconfig.json .
