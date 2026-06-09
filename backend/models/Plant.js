import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, enum: ['indoor', 'outdoor', 'succulent', 'medicinal', 'flowering'], required: true },
  image: { type: String },
  
  careGuide: {
    wateringSchedule: { type: String },
    sunlightRequirement: { type: String },
    soilType: { type: String },
    soilChangeFrequency: { type: String },
    temperature: { type: String },
    humidity: { type: String },
  },

  isMedicinal: { type: Boolean, default: false },
  medicalProperties: {
    uses: [{ type: String }],
    benefits: { type: String },
    partsUsed: { type: String },
    dosageInfo: { type: String },
    precautions: { type: String },
  },

  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
}, { timestamps: true });

export default mongoose.model('Plant', plantSchema);
