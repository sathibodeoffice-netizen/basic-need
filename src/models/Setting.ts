import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  aboutText: string;
}

const SettingsSchema: Schema = new Schema(
  {
    contactEmail: { type: String, default: 'support@basicneed.com' },
    contactPhone: { type: String, default: '+880 1234 567890' },
    contactAddress: { type: String, default: 'Dhaka, Bangladesh' },
    aboutText: { type: String, default: 'Your Everyday Essentials, Anytime.' },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
