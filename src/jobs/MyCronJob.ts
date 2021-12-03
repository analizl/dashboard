import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {Price, Trade} from '../models';
import {ExchangeRepository, PriceRepository, TradeRepository} from '../repositories';
import {LoggingBindings, WinstonLogger} from '@loopback/logging';
import {inject} from '@loopback/core';

@cronJob()
export class MyCronJob extends CronJob {
  constructor(@repository(TradeRepository)
              public tradeRepository: TradeRepository,
              @repository(ExchangeRepository)
              public exchangeRepository:ExchangeRepository,
              @repository(PriceRepository)
              public priceRepository:PriceRepository,
              // Inject a winston logger
              @inject(LoggingBindings.WINSTON_LOGGER)
              private logger: WinstonLogger) {
    super({
      name: 'job-B', onTick: async () => {
        let trades: Trade[] = await tradeRepository.find();
        for (const trade of trades){
          try {
            const price: Price = new Price()
            price.date = (new Date()).toString()
            const exchange = await this.exchangeRepository.findById(trade.exchange_id);
            const script_exchange = eval(exchange.script)
            const script_trade = eval(trade.script)
            price.price = script_trade(script_exchange)
            price.trade_id = trade.id ?? 0
            await this.priceRepository.create(price)
            this.logger.log('info','success');
          } catch (e){
            this.logger.log('info','error');
          }
        }
      },
      cronTime: '*/10 * * * * *',
      start: true,
    });}}