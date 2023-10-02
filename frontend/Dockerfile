# frontend/Dockerfile

# Step 1: Build the React application
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install \
    && npm install @babel/plugin-proposal-private-property-in-object axios
COPY . ./
RUN npm ci
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install @mui/icons-material
RUN npm install @babel/plugin-proposal-private-property-in-object @emotion/styled @emotion/react
RUN npm install react-router-dom


RUN npm run build
# Step 2: Serve the React application from Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
