export class Price {
	id:String;
    date: Date;
    price: Number;
    trade_id: String;
	constructor(price:Number, trade_id:String){
        this.date = new Date();
	    this.price = price;
	    this.trade_id = trade_id;
	}
  }
  