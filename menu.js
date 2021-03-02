const Pool = require('pg').Pool
const { v4: uuidv4 } = require('uuid');
const { fromString } = require('uuid')

const pool = new Pool({
  host: 'localhost',
  database: 'restaurant',
  port: 5432
})

const addMenuItem = (request, response) => {
  console.log('run')
  const req = request.body
  const values = [uuidv4(), req.course, req.item, req.item_type, req.price, req.stock]
  const query = {
    text: 'INSERT INTO menu (item_uuid, course, item, item_type, price, stock) VALUES ($1, $2, $3, $4, $5, $6)',
    values: values
  }
  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAllMenuItems = (request, response) => {
  const query = {
    text: 'SELECT item_uuid, course, item, item_type, price, stock FROM menu'
  }
  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  })
}

const createOrder = (request, response) => {
  const req = request.body
  const username = req[0]
  const orderTotal = req[1]
  const order_uuid = uuidv4()
  const values = [order_uuid, uuidv4(username), orderTotal]
  const query = {
    text: 'INSERT INTO orders (order_uuid, user_uuid, order_total) VALUES ($1, $2, $3)',
    values: values
  }
  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.send(order_uuid)
  })
}

const addItemToOrder = (request, response) => {
  const req = request.body
  const values = [uuidv4(), uuidv4(req[0]), uuidv4(req[1])]
  console.log(values)
  const query = {
    text: 'INSERT INTO ordered_items (ordered_item_uuid, order_uuid, item_uuid) VALUES ($1, $2, $3)',
    values: values
  }
  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.send(200)
  })
}


module.exports = {
  addMenuItem,
  getAllMenuItems,
  createOrder,
  addItemToOrder
}