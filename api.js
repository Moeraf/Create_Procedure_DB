const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const _PORT = 3000
const sql = require('mssql')
const sqlConfig = {
    user: 'sa',
    password: 'First51830694',
    database: 'DBFOR_PERSON',
    server: 'MOEMENPC\\INSTANCE_2K19_1',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000 
    },
    options: {
      encrypt: false,
      trustServerCertificate: false 
    }
  }

app.get('/AllPersons', async function (req, res) { //you should put async fro function because you are calling this api from another place 
    res.send( await GetPersonFromDB())
})

app.get('/GetPersonsByName', async function (req, res) { //you should put async fro function because you are calling this api from another place 
  res.send( await GetPersonsByName(req.query.name))        //express query string handinh
})

const GetPersonFromDB = async () => {
  const Get_Query = 'EXEC GET_PERSON_INFO'
    try {
     await sql.connect(sqlConfig)
     const result = await sql.query(Get_Query)
     return result.recordset;
    } catch (err) {
     console.log(err);
    }
    finally { 
       sql.close()
    }
   }



const GetPersonsByName = async (name) => {
  const Get_Query = `EXEC [dbo].[GET_PERSON_BY_CRITIREA] '${name}'`
    try {
     await sql.connect(sqlConfig)
     const result = await sql.query(Get_Query)
     return result.recordset;
    } catch (err) {
     console.log(err);
    }
    finally { 
       sql.close()
    }
   }

   app.listen(_PORT)