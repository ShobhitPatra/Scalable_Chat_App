import { Kafka, Producer }from "kafkajs"
import prisma from "./db"

const kafka = new Kafka({
    brokers  :[]
})

let existingProducer:null|Producer  = null

export const createProducer = async ()=>{
    if(existingProducer){
        return existingProducer
    }   
    const producer  = kafka.producer()
    await producer.connect()
    existingProducer = producer
    return existingProducer
}

export const produceMessage = async(data :string) =>{
    const producer = await createProducer()
    if(producer){
        console.log(`producer not genreated`)
    }
    try {
        await producer.send({
        topic :  "MESSAGES",
        messages :[{key : `message-${Date.now()}`,value : data}]
    })
    } catch (error) {
        console.log(error)
    }
   
}


export const consumeMessage = async()=>{
    const consumer = kafka.consumer({groupId : "default"})
    await consumer.connect()
    await consumer.subscribe({topic  :  "MESSAGES",fromBeginning :true})

    await consumer.run({
        eachMessage  :async({pause,message}) =>{
            if(!message.value) return
            console.log("new message ... ",message)
            try {
                await  prisma.message.create({
                    data : {
                        data : message.value.toString()
                        
                    }
                })
            } catch (error) {
                console.log("error inserting in db")
                pause();
                setTimeout(() => {
                  consumer.resume([{ topic: "MESSAGES" }]);
                }, 60 * 1000);
            }
        }

    })
}
export default kafka