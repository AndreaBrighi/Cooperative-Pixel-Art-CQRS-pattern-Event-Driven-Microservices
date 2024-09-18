export class MQTTDto<T>{
    pattern: string
    data: T

    constructor(pattern: string, data: T){
        this.pattern = pattern
        this.data = data
    }
}