export class Trade {
	id:String;
	script: String;
    exchange_id:Number;
    currency_from_id:Number;
    currency_to_id:Number;
    exchangeId:Number;
	constructor(script:String, exchange_id:Number, currency_from_id:Number, currency_to_id:Number,
              exchangeId:Number){
        this.script=script;
        this.exchange_id=exchange_id;
        this.exchangeId=exchangeId;
        this.currency_from_id=currency_from_id;
        this.currency_to_id=currency_to_id;
	}
  }
  