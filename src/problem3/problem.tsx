interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// Remove unused interface
// TODO: Remove this
interface Props extends BoxProps {}

const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Can use useCallback for this
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return (
      balances
        .filter((balance: WalletBalance) => {
          // These operations may causes confusion for reviewer
          // `.blockchain` props should be changed to `.currency`
          // TODO: refactor this
          const balancePriority = getPriority(balance.blockchain);
          // Confusing name
          // TODO: I think it's balancePriority instead of lhsPriority
          if (lhsPriority > -99) {
            // Balance amount should be greater or equal to 0
            // TODO: change it to balance.amount >= 0
            if (balance.amount <= 0) {
              return true;
            }
          }
          return false;
        })
        // Should use a more meaningful variable name and the logic is mess
        // TODO: refactor this, just return a subtraction of 2 values.
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
        })
    );
    // Prices dep here looks like redundant
    // TODO: remove it
  }, [balances, prices]);

  // Unused function
  // TODO: use it
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // This should be formattedBalances
  // TODO: change it below
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          // Use keys with indexes
          // TODO: use balance.currency instead
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
