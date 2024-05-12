import { Kafka, Message } from "kafkajs";
import EventEmitter from "events";
import webhook_event from "../../events/webhook";

class KafkaService {

    private provider: Kafka

    private producer: ReturnType<Kafka['producer']>;

    private webhook_consumer: ReturnType<Kafka['consumer']>;

    private webhook_event: EventEmitter;

    constructor( webhook_event: EventEmitter ){

        this.provider = new Kafka({
            clientId: 'test-id',
            brokers: ['localhost:9092']
        })

        this.producer = this.provider.producer()

        this.webhook_consumer =  this.provider.consumer({
            groupId: 'webhook-group1'
        })

        this.webhook_event = webhook_event;

        this.run();
    
    }

    async run(){

        await this.producer.connect();

        await this.webhook_consumer.connect();

        await this.webhook_consumer.subscribe({
            topic: 'webhook'
        })

        await this.webhook_consumer.run({
            eachMessage: async ( payload ) => (this.webhook_event.emit("consume", payload)) as any
        })

        this.webhook_event.on("push", this.push);
        
    }

    async push( topic: Topics, payload: Message[] ){

        await this.producer.send({
            topic, 
            messages: payload
        })

    }


}

const kafka_service = new KafkaService( webhook_event );

export default kafka_service;

type Topics = "webhook";