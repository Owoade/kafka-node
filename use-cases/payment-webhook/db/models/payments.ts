import db from "..";
import schema_type, { InferedSchemaType } from "../../../../utils/schema_types";

const Payment = db.define("Payments", {
    
    id: schema_type.primary_key(),

    PaymentProfileId: schema_type.int(),

    amount: schema_type.int(),

    customer_name: schema_type.string(),

    customer_email: schema_type.string(),

    webhook_url: schema_type.string(),

    webhook_failed_attempt_count: schema_type.int(),

    last_attempted_at: schema_type.optional_string(),

    webhook_call_status: schema_type.enum("success", "failed", "pending")

}, { timestamps: true })

export interface PaymentInterface {

    id?: number;

    PaymentProfileId: number;

    amount: number;

    customer_name: string;

    customer_email: string;

    webhook_url: string;

    webhook_failed_attempt: number,

    last_attempted_at: string;

    webhook_call_status: "status" | "failed" | "pending";

    createdAt?: string;

    updatedAt: string;

}

export default Payment as InferedSchemaType<PaymentInterface>;