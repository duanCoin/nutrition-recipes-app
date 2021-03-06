import express from 'express';
import webpack from 'webpack';
import webpackConfig from './webpack.config';

const app = express();
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
const selectMenu = require('./public/src/mongo/menu/selectMenu');
const selectRecipe = require('./public/src/mongo/recipe/selectRecipe');
const selectRecipeDetail = require('./public/src/mongo/recipe/selectRecipeDetail');

app.use('/selectMenu', selectMenu.findAll);
app.use('/selectDetail/:id', selectRecipeDetail.findDetail);
app.use('/selectRecipe/name', selectRecipe.findByName);
app.use('/selectRecipe/sort', selectRecipe.findBySort);

app.use(express.static('public'));

app.get('/', (res, req)=> {
  req.send('abc');
});

app.listen(3000, function() {
  console.log("server started at http://localhost:3000");
});