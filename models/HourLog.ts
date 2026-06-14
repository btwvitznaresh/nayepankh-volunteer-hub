import mongoose, { Schema, Document } from 'mongoose'

export interface IHourLog extends Document {
  volunteer: mongoose.Types.ObjectId
  campaign?: mongoose.Types.ObjectId
  hours: number
  description: string
  date: Date
  approvedBy?: mongoose.Types.ObjectId
  status: 'pending' | 'approved' | 'rejected'
}

const HourLogSchema = new Schema<IHourLog>(
  {
    volunteer:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
    campaign:   { type: Schema.Types.ObjectId, ref: 'Campaign' },
    hours:      { type: Number, required: true, min: 0.5, max: 24 },
    description:{ type: String, required: true },
    date:       { type: Date, required: true, default: Date.now },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    status:     { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  },
  { timestamps: true }
)

export default mongoose.models.HourLog || mongoose.model<IHourLog>('HourLog', HourLogSchema)
