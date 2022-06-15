import { errorHandler } from '../utils/errorHandler';
import ziqniApi from './index';

const api = new ziqniApi.ZiqniTechGamificationApiClient.RewardsApi();

const handleGetRewards = (entityId, apiKey) => {
  ziqniApi.defaultClient.authentications.OAuth2.apiKey = apiKey;
  const request = new ziqniApi.ZiqniTechGamificationApiClient.RewardRequest(entityId);

  return new Promise((resolve, reject) => {
    const callback = (error, data, responseString) => {
      const errorsFromHandler = errorHandler(error, data, responseString);
      if (error) {
        reject(error.message);
      } else if (errorsFromHandler.length) {
        const errors = errorsFromHandler.join(', ');
        reject(errors);
      } else {
        resolve(data);
      }
    };

    api.getRewards(request, callback);
  });
};

const rewardsApi = {
  handleGetRewards
};

export default rewardsApi;
