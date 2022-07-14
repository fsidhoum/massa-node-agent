export interface WalletInfo {
  address: string;
  balance: {
    candidate_balance: string;
    final_balance: string;
    locked_balance: string;
  };
  block_draws: [
    {
      period: number;
      thread: number;
    },
  ];
  blocks_created: string[];
  endorsement_draws: [
    {
      slot: {
        period: number;
        thread: number;
      };
      index: number;
    },
  ];
  involved_in_endorsements: [string];
  involved_in_operations: [string];
  production_stats: [
    {
      cycle: number;
      is_final: boolean;
      nok_count: number;
      ok_count: number;
    }[],
  ];
  rolls: {
    active_rolls: number;
    candidate_rolls: number;
    final_rolls: number;
  };
  thread: number;
  final_balance_info: number | null;
  candidate_balance_info: number | null;
  final_datastore_keys: number[];
  candidate_datastore_keys: number[];
}
