import { Box, Typography } from '@ui';
import { useQuery } from '@tanstack/react-query';
import {
  getWeather,
  getWeatherKey,
} from '@features/creative-preview/api/getWeather.ts';

export const PreviewCreativeStatic = () => {
  const marseille = ['43.2965', '5.3698'] as const;
  const paris = ['48.8566', '2.3522'] as const;

  const marseilleQuery = useQuery({
    queryKey: getWeatherKey(marseille),
    queryFn: () => getWeather(marseille),
  });

  const parisQuery = useQuery({
    queryKey: getWeatherKey(paris),
    queryFn: () => getWeather(paris),
  });

  if (marseilleQuery.status === 'pending' || parisQuery.status === 'pending') {
    return 'Fetch...';
  }

  if (marseilleQuery.status === 'error' || parisQuery.status === 'error') {
    return <Typography color='error'>An error occurred</Typography>;
  }

  return (
    <Box>
      <Typography>Marseille :{marseilleQuery.data.latitude}</Typography>
      <Typography>Paris :{parisQuery.data.latitude}</Typography>
    </Box>
  );
};
