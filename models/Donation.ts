import mongoose, { Schema, Document } from 'mongoose'

export interface IDonation extends Document {
  donorName: string
  donorEmail?: string
  amount: number
  campaign?: mongoose.Types.ObjectId
  message?: string
  anonymous: boolean
  status: 'pending' | 'completed' | 'failed'
  transactionId?: string
}

const DonationSchema = new Schema<IDonation>(
  {
    donorName:     { type: String, required: true },
    donorEmail:    { type: String },
    amount:        { type: Number, required: true, min: 1 },
    campaign:      { type: Schema.Types.ObjectId, ref: 'Campaign' },
    message:       { type: String, maxlength: 200 },
    anonymous:     { type: Boolean, default: false },
    status:        { type: String, enum: ['pending','completed','failed'], default: 'completed' },
    transactionId: { type: String },
  },
  { timestamps: true }
)

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema)
