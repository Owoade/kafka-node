import db from "..";
import schema_type, { InferedSchemaType } from "../../../../utils/schema_types";
import Payment from "./payments";

const PaymentProfile = db.define("PaymentProfile", {
    
    id: schema_type.primary_key(),
    
    email: schema_type.string(),

    secret_key: schema_type.string(),

    balance: schema_type.int()

}, { timestamps: true });

PaymentProfile.hasMany(Payment );
Payment.belongsTo( PaymentProfile );

export interface PaymentProfileInterface {

    id?: number;

    email: string;

    secret: string;

    balance: number

}

export default PaymentProfile as InferedSchemaType<PaymentProfileInterface>