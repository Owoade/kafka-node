import { Transaction } from "sequelize";
import PaymentProfile, { PaymentProfileInterface } from "../db/models/payment-profile";
import Payment, { PaymentInterface } from "../db/models/payments";

class PaymentRepository {

    constructor(){}

    async create_profile( payload: PaymentProfileInterface ){
        
        const new_profile = await PaymentProfile.create( payload );

        return new_profile.toJSON();

    }

    async get_existing_profile( email: string ){

        const profile = await PaymentProfile.findOne({
            where: {
                email
            },
            attributes: ["id"]
        })

        return profile?.toJSON();
    }

    async create_payment( payload: PaymentInterface, transaction: Transaction ){

        const payment = await Payment.create( payload, { transaction } );

        return payment.toJSON();

    }

    async get_payments( profile_id: number, page: number, per_page: number ){

        const payments = await Payment.findAll({
            where: {
                PaymentProfileId: profile_id
            },
            limit: per_page,
            offset: per_page * ( page - 1 )
        })

        return payments;

    }

    async increament_webhook_failed_attempt( paymenr_id: number, attempts: number ){

        await Payment.increment('webhook_failed_attempt', { by: 1, where:{ PaymentProfileId: paymenr_id } });
        
    }

    async update_balance( amount: number, profile_id: number, transaction: Transaction ){

        await PaymentProfile.increment('balance', { by: amount, transaction, where: { id: profile_id } });

    }

    async uodate_payment_webhook_call_status( payment_id: number, status: PaymentInterface['webhook_call_status'] ){

        await Payment.update({ webhook_call_status: status }, { where: { id: payment_id  }});

    }

}

const payment_repository = new PaymentRepository();

export default payment_repository;