import mongoose, { Schema, Document } from "mongoose";

interface PaymentType extends Document {
  order: Schema.Types.ObjectId;
  status: string;
  ref_id: string;
}

const PaymentSchema: Schema<PaymentType> = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "order",
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    ref_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model<PaymentType>("payment", PaymentSchema);
