import axios from 'axios';

type BusinessState = Array<'live' | 'not_live'>;

type CreativeApi = {
  creative_group_id: number;
  business_state: BusinessState;
  app_id: number;
  live_since_date?: string;
};

type GetCreativesResponse = {
  creatives: CreativeApi[];
};

export type GetCreativesConfig = {
  params: {
    app_id: number;
    states?: Array<'archived' | 'new'>;
    campaign_ids?: number[];
    business_states?: BusinessState;
  };
};

export const getCreatives = async (config: GetCreativesConfig) => {
  const response = await axios.get<GetCreativesResponse>(
    'https://public-api.stage.adikteev.com/dsp_dashboard_api/creatives',
    {
      params: config.params,
      headers: {
        Authorization:
          'Bearer ',
      },
    },
  );

  return response.data;
};
