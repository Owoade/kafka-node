import db from "..";
import schema_type, { InferedSchemaType } from "../../../../utils/schema_types";

const Payment = db.define("Payments", {
    
    id: schema_type.primary_key(),

    PaymentProfileId: schema_type.int(),

    amount: schema_type.int(),

    customer_name: schema_type.string(),

    customer_email: schema_type.string()

}, { timestamps: true })

export interface PaymentInterface {

    id?: number;

    PaymentProfileId: number;

    amount: number;

    customer_name: string;

    customer_email: string;

}

export default Payment as InferedSchemaType<PaymentInterface>;