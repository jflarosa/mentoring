import axios from 'axios';
import type { ApplicationControlGroupApi } from '@api/control-group/model';
import type { UnionFromArray } from '@helpers/UnionFromArray';

import type { AdvertiserCategoryApi } from '../advertiser-category/model';
import type { BusinessModelApi } from '../business-model/model';
import type { CompanyApi } from '../company/model';
import type { VerticalApi } from '../vertical/model';

export enum Attribution {
  Internal = 'internal',
  External = 'external',
}

// Temporary choice: CTV is treated as an application platform for fast integration.
// Long-term plan: CTV will not be a platform but a channel.
export const platforms = ['ios', 'android', 'ctv'] as const;

export type Platform = UnionFromArray<typeof platforms>;

export enum ApplicationState {
  New = 'new',
  Archived = 'archived',
  All = 'all',
}

export const trackingProviders = [
  'adjust',
  'appsflyer',
  'branch',
  'kochava',
  'singular',
  'airbridge',
  'tune', // deprecated last application recorded with tune : 2018
  'unknown',
  'custom',
] as const;

export type TrackingProvider = UnionFromArray<typeof trackingProviders>;

export const applicationBusinessState = [
  'live',
  'onboarding',
  'paused',
  'churned',
] as const;

export type ApplicationBusinessState = UnionFromArray<
  typeof applicationBusinessState
>;

export type ApplicationApi = {
  id: number;
  company_id: CompanyApi['id'];
  advertiser_website_url: string | null;
  app_store_id: number | null;
  app_store_url: string | null;
  attribution: Attribution;
  bundle_identifier: string;
  competitors: string[];
  has_competition: string;
  is_blacklisted: boolean;
  name: string | null;
  platform: Platform;
  tracking_provider: TrackingProvider;
  control_group_configuration: ApplicationControlGroupApi | null;
  tracking_provider_attribution_days?: number | null;
  vertical_id: VerticalApi['id'] | null;
  business_model_id: BusinessModelApi['id'] | null;
  is_churn_prediction_enabled: boolean;
  state: ApplicationState;
  business_state: ApplicationBusinessState;
  is_attributed_to_user: boolean;
  advertiser_categories: AdvertiserCategoryApi[];
  icon_url?: string | null;
  app_title_id: number;
};

type GetApplicationsResponse = {
  items: ApplicationsApi[];
};

type Config = {
  params: {
    company_id: number;
    state: ApplicationState;
  };
};

export const getApplications = async (config: Config) => {
  const response = await axios.get<GetApplicationsResponse>(
    'https://public-api.stage.adikteev.com/dsp_dashboard_api/apps',
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
