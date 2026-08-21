import { Yup } from 'shared/hook-form/yup';
import { validateMedia } from 'shared/hook-form/yup/yup.config';
import {
  discordLinkRegex,
  instagramLinkRegex,
  telegramLinkRegex,
  websiteRegex,
} from 'shared/hook-form/validation';
import { convertDateToUTCTimestamp } from 'utils';

export const schema = Yup.object({
  poolLogo: Yup.lazy((value) =>
    typeof value === 'string' ? Yup.string() : validateMedia(5).nullable(),
  ),
  poolName: Yup.string().required('Name is required'),
  description: Yup.string().max(500, 'Maximum 500 symbols').notRequired(),
  instagram: Yup.string()
    .nullable()
    .notRequired()
    .test('', 'Wrong Instagram link', (value) =>
      !value ? true : instagramLinkRegex.test(value),
    ),
  telegram: Yup.string()
    .nullable()
    .notRequired()
    .test('', 'Wrong telegram link', (value) =>
      !value ? true : telegramLinkRegex.test(value),
    ),
  discord: Yup.string()
    .nullable()
    .notRequired()
    .test('', 'Wrong discord link', (value) =>
      !value ? true : discordLinkRegex.test(value),
    ),
  website: Yup.string()
    .nullable()
    .notRequired()
    .test('', 'Wrong website link', (value) =>
      !value ? true : websiteRegex.test(value),
    ),
  rewardToken: Yup.string().isValidAddress(),
  startTime: Yup.date()
    .required()
    .nullable()
    .max(Yup.ref('endTime'), 'Start time cannot be after end time')
    .test(
      'compare pools start date',
      'Wrong bonus pool and main pool timing',
      (value, { options: { context }, createError }) => {
        if (value === null) {
          return createError({ message: 'Invalid date' });
        }

        if (value && context) {
          const currentDate = new Date(value);
          const mainPoolDate = new Date(context?.mainPoolStartTime);

          return (
            convertDateToUTCTimestamp(currentDate) >
            mainPoolDate.getTime() / 1000
          );
        }
        return true;
      },
    ),
  endTime: Yup.date()
    .nullable()
    .min(Yup.ref('startTime'), 'End time cannot be before end time')
    .test(
      'compare pools end date',
      'Wrong bonus pool and main pool timing',
      (value, { options: { context }, createError }) => {
        if (value === null) {
          return createError({ message: 'Invalid date' });
        }

        if (value && context) {
          const currentDate = new Date(value);
          const mainPoolDate = new Date(context?.mainPoolEndTime);

          return (
            convertDateToUTCTimestamp(currentDate) <
            mainPoolDate.getTime() / 1000
          );
        }
        return true;
      },
    ),
  rps: Yup.lazy((value, { context }) => {
    if (context && !context?.isEditing) {
      return Yup.string().required();
    }

    return Yup.string();
  }),
});
