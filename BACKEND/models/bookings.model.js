const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "utility", required: true },
  serviceId: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  details: { type: String },
  preferredDate: { type: String },
  preferredTime: { type: String },
  status: { type: String, enum: ["pending", "confirmed", "rejected", "cancelled", "completed"], default: "pending" },
  rejectedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "utility" }],
  createdAt: { type: Date, default: Date.now },
},


{ timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
