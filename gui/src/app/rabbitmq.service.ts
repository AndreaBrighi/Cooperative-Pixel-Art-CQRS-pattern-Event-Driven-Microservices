import { Injectable } from '@angular/core';
import amqp, { Message } from 'amqplib/callback_api'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RabbitmqService {

  constructor() {
   }

  public subscribeToBroker(amqpURl: string, queueName: string){
    let subject = new Subject<any>();
    createMQConsumer(amqpURl,queueName,subject);
    return subject.asObservable;
  }
}

const createMQConsumer = (amqpURl: string, queueName: string, subject: Subject<any> ) => {
  console.log('Connecting to RabbitMQ...')
  return () => {
    amqp.connect(amqpURl, (errConn, conn) => {
      if (errConn) {
        throw errConn
      }

      conn.createChannel((errChan, chan) => {
        if (errChan) {
          throw errChan
        }

        console.log('Connected to RabbitMQ')
        chan.assertQueue(queueName, { durable: true })
        chan.consume(queueName, (msg: Message | null) => {
          if (msg) {
            const parsed = JSON.parse(msg.content.toString())
            subject.next(parsed);
            /*switch (parsed.action) {
              case 'REGISTER':
                console.log('Consuming REGISTER action', parsed.data)
                break
              case 'LOGIN':
                console.log('Consuming LOGIN action', parsed.data)
                break
              default:
                break
            }*/
          }
        }, { noAck: true })
      })
    })
  }
}
