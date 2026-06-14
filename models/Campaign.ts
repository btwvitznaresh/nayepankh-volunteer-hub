import mongoose, { Schema, Document } from 'mongoose'

export interface ICampaign extends Document {
  title: string
  description: string
  image?: string
  category: 'education' | 'healthcare' | 'environment' | 'community' | 'other'
  goalAmount: number
  raisedAmount: number
  startDate: Date
  endDate: Date
  status: 'upcoming' | 'active' | 'completed' | 'archived'
  volunteers: mongoose.Types.ObjectId[]
  createdBy: mongoose.Types.ObjectId
  location?: string
  tags: string[]
}

const CampaignSchema = new Schema<ICampaign>(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image:       { type: String },
    category:    { type: String, enum: ['education','healthcare','environment','community','other'], default: 'community' },
    goalAmount:  { type: Number, required: true, default: 0 },
    raisedAmount:{ type: Number, default: 0 },
    startDate:   { type: Date, required: true },
    endDate:     { type: Date, required: true },
    status:      { type: String, enum: ['upcoming','active','completed','archived'], default: 'upcoming' },
    volunteers:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location:    { type: String },
    tags:        [{ type: String }],
  },
  { timestamps: true }
)

export default mongoose.models.Campaign || mongoose.model<ICampaign>('Campaign', CampaignSchema)
