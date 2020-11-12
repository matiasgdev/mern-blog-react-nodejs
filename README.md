f# Bloggy. React & Nodejs

It's a fullstack app that combine javascript technologies to build a blog, **completely from scratch**.

The content is in spanish

Technologies: 
- Express
- Mondodb
- React
- Redux
- JSONWebToken
- Styled components
- Multer

## Packages

Use the following commands to install the dependencies in the main folder

```
npm install
```

And then for the front-end

```
npx create-react-app frontend
```

Create the folder for the statics files
```
mkdir public/images
```

## Usage

Config .env file with the following
```
  NODE_ENV = development
  SERVER_PORT = youravaibleport
  DB = 'mongodb://localhost/blog-react-node' for example
```
### Images

![home page](/public/images/home.png)
![community page](/public/images/community.png)
![post detail](/public/images/post-detail.png)
![form](/public/images/form.png)


## Future changes
- [ ] Add validations, maybe Joi or Yup
- [ ] Text editor for write pretty posts
- [ ] Use roles for different purposes
- [ ] Deploy App

## Contributing
Pull requests are welcome :)