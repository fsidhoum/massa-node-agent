export interface Event {
  status: {
    connected_node_count: number;
    staker_count: number;
    current_cycle: number;
    in_connection_count: number;
    out_connection_count: number;
    node_ip: string;
    version: string;
  };
  wallet_info: {
    address: string;
    candidate_balance: number;
    final_balance: number;
    active_rolls: number;
    candidate_rolls: number;
    final_rolls: number;
  };
}
