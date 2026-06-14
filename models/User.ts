import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'volunteer' | 'admin' | 'superadmin'
  avatar?: string
  phone?: string
  city?: string
  bio?: string
  skills: string[]
  status: 'pending' | 'active' | 'inactive'
  totalHours: number
  campaignsJoined: mongoose.Types.ObjectId[]
  createdAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role:     { type: String, enum: ['volunteer', 'admin', 'superadmin'], default: 'volunteer' },
    avatar:   { type: String },
    phone:    { type: String },
    city:     { type: String },
    bio:      { type: String, maxlength: 300 },
    skills:   [{ type: String }],
    status:   { type: String, enum: ['pending', 'active', 'inactive'], default: 'pending' },
    totalHours:      { type: Number, default: 0 },
    campaignsJoined: [{ type: Schema.Types.ObjectId, ref: 'Campaign' }],
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
