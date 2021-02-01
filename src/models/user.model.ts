import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    name: string;
}

const User: Schema = new Schema({
    email: {type: String,  required: true, unique: true},
    name: { type: String, required: true},
})

export default mongoose.model<IUser>('User', User);