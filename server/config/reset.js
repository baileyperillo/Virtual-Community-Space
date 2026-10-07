import { pool } from './database.js'
import './dotenv.js'
import locData from '../data/gyms.js'
import eventData from '../data/events.js'


// Create gyms table
const createGymsTable = async () => {

    const createTableQuery = `
        DROP TABLE IF EXISTS gyms;

        CREATE TABLE IF NOT EXISTS gyms (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            pricePoint VARCHAR(10) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            classes TEXT NOT NULL,
            location VARCHAR(255) NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 gyms table created successfully')
    }
    catch (err) {
        console.error('⚠️ error creating gyms table', err)
    }
}


// Seed gyms table
const seedGymsTable = async () => {

    await createGymsTable()

    locData.forEach((gym) => {

        const insertQuery = {
            text: `
                INSERT INTO gyms 
                (name, pricePoint, image, description, classes, location) 
                VALUES ($1, $2, $3, $4, $5, $6)
            `
        }

        const values = [
            gym.name,
            gym.pricePoint,
            gym.image,
            gym.description,
            gym.classes,
            gym.location
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting gym', err)
                return
            }

            console.log(`✅ ${gym.name} added successfully`)
        })
    })
}


// Run reset
seedGymsTable()


const createEventsTable = async () => {

    const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            gym_id INTEGER NOT NULL
        );
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 events table created successfully')
    }
    catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

const seedEventsTable = async () => {

    await createEventsTable()

    for (const event of eventData) {

        const insertQuery = `
            INSERT INTO events
            (name, description, date, time, gym_id)
            VALUES ($1, $2, $3, $4, $5)
        `

        const values = [
            event.name,
            event.description,
            event.date,
            event.time,
            event.gym_id
        ]

        try {
            await pool.query(insertQuery, values)
            console.log(`✅ ${event.name} added successfully`)
        }
        catch (err) {
            console.error('⚠️ error inserting event', err)
        }
    }
}
seedEventsTable()