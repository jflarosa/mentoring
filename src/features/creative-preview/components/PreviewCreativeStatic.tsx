import { Box, Typography } from '@ui';
import { useQuery } from '@tanstack/react-query';
import {
  getCreatives,
  type GetCreativesConfig,
} from '@features/creative-preview/api/getCreatives.ts';
import { getApplications } from '@features/applications/api/getApplications.ts';

export const PreviewCreativeStatic = () => {
  const getApplicationsQuery = useQuery({
    queryFn: () => getApplications({ params: { company_id: 82, state: "new" } }),
    queryKey: ['applications', 82],
  });

  const getCreativesQuery = useQuery({
    queryFn: (config: GetCreativesConfig) => getCreatives(config),
    queryKey: ['creatives'],
    enabled: false,
  });

  if (getApplicationsQuery.status === 'pending') {
    return 'Fetch...';
  }

  if (getApplicationsQuery.status === 'error') {
    return <Typography color='error'>An error occurred</Typography>;
  }

  return (
    <Box>
      {getApplicationsQuery.data.items.map((application) => (
        <Typography key={application.id}>{application.name}</Typography>
      ))}
    </Box>
  );
};
