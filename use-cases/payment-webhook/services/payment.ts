import { Transaction } from "sequelize";
import db from "../db";
import { PaymentProfileInterface } from "../db/models/payment-profile";
import { PaymentInterface } from "../db/models/payments";
import payment_repository from "../repositories/payment";
import { AppError } from "../../../utils/error";

class PaymentService {

    constructor(){};

    async create_profile( payload: PaymentProfileInterface ){

        const existing_profile = await payment_repository.get_existing_profile( payload.email );

        if( existing_profile ) throw new AppError("Payment profile exists", 400);

        const new_profile = await payment_repository.create_profile(payload);

        return new_profile;

    }

    async create_payment( payload: PaymentInterface ){

        const transaction = await db.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
        })

        try {

            await Promise.all([

                payment_repository.update_balance(payload.amount, payload.PaymentProfileId, transaction ),

                payment_repository.create_payment(payload, transaction )

            ])

            await transaction.commit();

            // call push webhook into queue;

        }catch(e){

            await transaction.rollback();

            throw new AppError("Something went wrong", 500)

        }
    }
}