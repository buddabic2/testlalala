const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./users');
const menu = require('./menu')
const e = require('express');

const app = express()
const port = process.env.PORT || 3000
console.log(path.join(__dirname, '../synoptic_project/client/build/index.html'))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.static(path.join(__dirname, '../synoptic_project/client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../synoptic_project/client/build/index.html'))
})

app.post('/create_user', users.createUser);
app.post('/user_login', users.userLogin);

app.post('/menu_items', menu.getAllMenuItems);
app.post('/add_menu_item', menu.addMenuItem);

app.post('/order', menu.createOrder);
app.post('/add_item_to_order', menu.addItemToOrder);

app.listen(port, () => {
  console.log('Server is listening on port ' + port)
})