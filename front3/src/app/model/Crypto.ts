export class Crypto {
	id: String;
	name: String;
	symbol: String;
	description: String;
	wiki: String;
	userId: Number;
	constructor(name: String, symbol: String, description: String, wiki: String, userId: Number) {
		this.name = name;
		this.symbol = symbol;
		this.description = description;
		this.wiki = wiki;
		this.userId = userId;
	}
}
