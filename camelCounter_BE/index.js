// Load modules
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors')
const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const calculateCamels = require('./functions');

// MongoDB connection information
// Read environment variables
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbCluster_address = process.env.DB_CLUSTER_ADDRESS;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster_address}/?retryWrites=true&w=majority`;
const dbName = process.env.DB_NAME;
const dbCollection = process.env.DB_COLLECTION;
const port = process.env.PORT || 3000;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Create Express app
const app = express()
app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());


// POST /api/users/new route
app.post('/api/users/new', async (req, res) => {
  try {
    const { username, password, repeatPassword, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15 } = req.body;
    if (password !== repeatPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }
    const encryptedPassword = btoa(password); // Encode password
    const answers = { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15 }

    // Check if required fields are present
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Connect to MongoDB
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the "users" collection
    const usersCollection = db.collection(dbCollection);

    // Check if the user is already registered
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'User already registered.' });
    }

    // Calculate the user's camelworth
    const camels = calculateCamels(answers);

    // Create new user object
    const newUser = { username, encryptedPassword, camels, answers };

    // Save the user data to the collection
    await usersCollection.insertOne(newUser);

    // Send success message
    res.status(200).json({ message: 'User registered successfully.', camelCount: camels });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Ensure the connection is always closed, even if an error occurs
    await client.close();
  }
});


// GET /api/users/:username route
app.get('/api/users/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Connect to MongoDB
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the "users" collection
    const usersCollection = db.collection(dbCollection);

    // Find the user with the given username
    const user = await usersCollection.findOne({ username }, { projection: { username: 1, camels: 1 } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Send the user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Ensure the connection is always closed, even if an error occurs
    await client.close();
  }
});


/*###########
 SECURE ROUTE
###########*/
// POST /api/users/:username/full route
app.post('/api/users/:username/full', async (req, res) => {
  try {
    const { username } = req.params;
    const { password }  = req.body;

    // Connect to MongoDB
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the "users" collection
    const usersCollection = db.collection(dbCollection);

    // Find the user with the given username
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the password is correct
    if (user.encryptedPassword !== btoa(password)) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // Send the user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Ensure the connection is always closed, even if an error occurs
    await client.close();
  }
});


// GET /api/users route
app.get('/api/users', async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the "users" collection
    const usersCollection = db.collection(dbCollection);

    // Find all users
    const users = await usersCollection.find({}, { projection: { username: 1, camels: 1 } }).toArray();

    // Send the user data
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Ensure the connection is always closed, even if an error occurs
    await client.close();
  }
});


/*###########
 SECURE ROUTE
###########*/
// PUT /api/users/:username route
app.put('/api/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { password, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15 } = req.body;
    const answers = { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15 };
    
    // Connect to MongoDB
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the "users" collection
    const usersCollection = db.collection(dbCollection);

    // Find the user with the given username
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the password is correct
    if (user.encryptedPassword !== btoa(password)) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // Calculate the user's camelworth
    const camels = calculateCamels(answers);

    // Update the user's data
    await usersCollection.updateOne({ username }, { $set: { answers, camels } });

    // Send success message
    res.status(200).json({ message: 'User updated successfully.', camelCount: camels });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Ensure the connection is always closed, even if an error occurs
    await client.close();
  }
});

/*###########
 SECURE ROUTE
###########*/
// DELETE /api/users/:username route
app.delete('/api/users/:username', async (req, res) => {

  try {
    const { username } = req.params;
    const { password } = req.body;

    // Connect to MongoDB
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the "users" collection
    const usersCollection = db.collection(dbCollection);

    // Find the user with the given username
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the password is correct
    if (user.encryptedPassword !== btoa(password)) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // Delete the user
    await usersCollection.deleteOne({ username });

    // Send success message
    res.status(200).json({ message: 'User deleted successfully.' });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Ensure the connection is always closed, even if an error occurs
    await client.close();
  }
});


// GET /api/users/top-camels/:count route
app.get('/api/users/top-camels/:count', async (req, res) => {
  try {
    const { count } = req.params;

    // Connect to MongoDB
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the "users" collection
    const usersCollection = db.collection(dbCollection);

    // Find the top camel owners and project only the username and camels fields
    const topCamels = await usersCollection.find({}, { projection: { username: 1, camels: 1 } }).sort({ camels: -1 }).limit(parseInt(count)).toArray();

    // Close the connection
    await client.close();

    // Send the user data
    res.status(200).json(topCamels);
  } catch (error) {
    console.error('Error retrieving top camel owners:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Test route to check MongoDB connection
app.get('/testMongo', async (req, res) => {
    try {
      await client.connect();
  
      // Access the database
      const db = client.db(dbName);
      await client.db(dbName).command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      res.status(200).json({ message: "Succesfully pinged MongoDB server!" });
      
    } catch (error) {
      console.error('Error testing MongoDB connection:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      // Ensure the connection is always closed, even if an error occurs
      await client.close();
    }
});
  

app.listen(port);
console.log("app running at http://localhost:3000");