FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ARG VITE_GOOGLE_MAPS_API_KEY
ARG VITE_API_URL
ARG VITE_RECAPTCHA_SITE_KEY
ARG VITE_G4A_TRACKING_ID

ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY
ENV VITE_G4A_TRACKING_ID=$VITE_G4A_TRACKING_ID

# create .env file with environment variables
RUN echo "VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY" > .env
RUN echo "VITE_API_URL=$VITE_API_URL" >> .env
RUN echo "VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY" >> .env
RUN echo "VITE_G4A_TRACKING_ID=$VITE_G4A_TRACKING_ID" >> .env

# Build application
RUN npm run build

# Stage 2: Production Stage
FROM nginx:stable-alpine

# Copy the build output from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]