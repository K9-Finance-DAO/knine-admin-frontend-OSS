import type { FarmingPoolFormFields } from 'features/farming/farming-pool/shared';
import { dynamics } from 'config';
import { formatBackendData } from 'features/farming/farming-pool/shared';
import { getErrorMessage, showToastMessage, standardFetcher } from 'utils';
const url = dynamics.knineAPIBasePath;

export const updateFarmingPool = async (
  data: FarmingPoolFormFields,
  address?: string,
) => {
  try {
    if (!address) {
      return false;
    }

    const serializedData = await formatBackendData(data);

    await standardFetcher(`${url}/farming-pools/${address}/`, {
      body: JSON.stringify(serializedData),
      method: 'PATCH',
    });

    showToastMessage('success', 'Successfully updated');

    return true;
  } catch (err) {
    showToastMessage('error', getErrorMessage(err));
    return false;
  }
};
