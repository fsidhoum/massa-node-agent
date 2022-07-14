import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { MnaLogger } from '../common/mna-logger';
import { Status } from './status';
import { RpcResponse } from './rpc-response';
import { WalletInfo } from './walletInfo';

@Injectable()
export class TaskService {
  private readonly logger = new MnaLogger(TaskService.name);

  private readonly MASSA_NODE_URL =
    process.env.MNA_MASSA_NODE_URL || 'http://localhost:33035';

  public eventsGateway: any;

  constructor(private readonly httpService: HttpService) {}

  @Timeout(0)
  async atStartup() {
    this.logger.log('Collecting data at start up...');
    await this.sync();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async periodically() {
    this.logger.log('Collecting data after 1 minutes');
    await this.sync();
  }

  private async sync() {
    const data = await this.collectData();
    this.eventsGateway.emit('event', data);
  }

  private async collectData() {
    this.logger.debug('Collecting data...');

    const { data: statusResponse }: { data: RpcResponse<Status> } =
      await this.httpService.axiosRef.post(this.MASSA_NODE_URL, {
        jsonrpc: '2.0',
        method: 'get_status',
        id: 123,
      });

    const { data: walletInfoResponse }: { data: RpcResponse<WalletInfo> } =
      process.env.MNA_WALLET_ADDRESS
        ? await this.httpService.axiosRef.post(this.MASSA_NODE_URL, {
            jsonrpc: '2.0',
            method: 'get_addresses',
            id: 123,
            params: [[process.env.MNA_WALLET_ADDRESS]],
          })
        : { data: null };

    return {
      status: statusResponse.result,
      walletInfo: walletInfoResponse?.result,
    };
  }
}
