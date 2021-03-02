const Pool = require('pg').Pool
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');

const pool = new Pool({
  host: 'localhost',
  database: 'restaurant',
  port: 5432
})

const userLogin = (request, response) => {
  const req = request.body
  const values = [req.username]
  const query = {
    text: 'SELECT password FROM users WHERE username = $1',
    values: values
  }
  pool.query(query, async (error, results) => {
    try {
      if (await bcrypt.compare(req.password, results.rows[0].password)) {
        response.status(200).send()
      }
    } catch(error) {
      console.log(error)
      response.status(500).send()
    }
  })
}

const createUser = async (request, response) => {
  const req = request.body
  const hashedPassword = await bcrypt.hash(req.password, 10)
  const values = [uuidv4(), req.username, hashedPassword]
  const query = {
    text: 'INSERT INTO users (user_uuid, username, password) VALUES ($1, $2, $3)',
    values: values
  }
  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
} 

module.exports = { userLogin, createUser }