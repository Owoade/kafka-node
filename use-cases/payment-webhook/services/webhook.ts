import EventEmitter from "events";
import { EachMessagePayload } from "kafkajs";
import { PaymentInterface } from "../db/models/payments";
import axios from "axios";
import crypto from "crypto";

class WebhookService {

    private webhook_event: EventEmitter;
    
    constructor( webhook_event: EventEmitter ){

        this.webhook_event = webhook_event;

        this.webhook_event.on("consume", this.consume );

    }

    async consume( payload: EachMessagePayload ){

        const message = JSON.parse(payload.message.value?.toString()! ) as WebhookPayload;

        const { url, payment, secret_key } = message;

        const req_body = {

            type: "charge.success",

            amount: payment.amount,

            completed_at: payment.createdAt,

            metadata: {

                customer_name: payment.customer_name,

                customer_email: payment.customer_email

            }
        };

        const hash = crypto.createHmac('sha256', secret_key ).update( JSON.stringify(req_body) ).digest('hex');

        const response = await axios.post(url, req_body, { headers: {
            'signature': hash
        } });



    }

    
}

interface WebhookPayload {
    url: string;
    payment: PaymentInterface,
    secret_key: string;
}