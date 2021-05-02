FROM node:13.8.0

ARG SSH_KEY

# Create app directory
WORKDIR /usr/app

# update yarn version, yarn seems to be hanging with default yarn version
RUN yarn --version
RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn --version

RUN mkdir -p /root/.ssh/ && \
    echo "$SSH_KEY" > /root/.ssh/id_rsa && \
    chmod -R 600 /root/.ssh/ && \
    ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

# Copy over lock files
COPY package.json ./
COPY yarn.lock ./

# Bundle app source
COPY . .

# Install dependencies for the app
# RUN yarn install --verbose
RUN yarn install

# # Copy over working directory (docker ignore excludes node_modules & public)
# COPY . .

# # Print files in this image (everything that was copied over)
# RUN ls -lsa

CMD [ "yarn", "start:development:production" ]