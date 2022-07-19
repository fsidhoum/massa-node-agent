import { Event } from '../event/event';
import { Data } from './data';

export class DataMapper {
  public static mapToEvent(data: Data): Event {
    return {
      status: {
        connected_node_count: Object.values(data.status.connected_nodes).length,
        staker_count: data.status.consensus_stats.staker_count,
        current_cycle: data.status.current_cycle,
        in_connection_count: data.status.network_stats.in_connection_count,
        out_connection_count: data.status.network_stats.out_connection_count,
        node_ip: data.status.node_ip,
        version: data.status.version,
      },
      wallet_info: {
        address: data.walletInfo.address,
        candidate_balance:
          +data.walletInfo.ledger_info.candidate_ledger_info.balance,
        final_balance: +data.walletInfo.ledger_info.final_ledger_info.balance,
        active_rolls: data.walletInfo.rolls.active_rolls,
        candidate_rolls: data.walletInfo.rolls.candidate_rolls,
        final_rolls: data.walletInfo.rolls.final_rolls,
      },
    };
  }
}
