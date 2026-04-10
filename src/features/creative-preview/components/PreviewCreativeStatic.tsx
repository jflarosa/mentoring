import { useState } from 'react';

type Action = 'increment' | 'decrement';

const labels: Record<Action, string> = {
  decrement: 'Decrement',
  increment: 'Increment',
};

type Props = {
  action: Action;
  step?: number;
};

export const PreviewCreativeStatic = (props: Props) => {
  const { action, step = 1 } = props;

  const [value, setValue] = useState(0);

  const increment = () => {
    setValue(value + step);
  };

  const decrement = () => {
    setValue(value - step);
  };

  return (
    <div>
      <button onClick={action === 'increment' ? increment : decrement}>
        {labels[action]}
      </button>
      <p>{value}</p>
    </div>
  );
};
