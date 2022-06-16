import Mongoose from '../db/db.js'

const userShema = new Mongoose.Schema(
    {
        name: String,
        email: String,
        password: String
    },
    {
        collection: 'users',
        timestamps: true
    }
)


export default Mongoose.model('users', userShema, 'users')


