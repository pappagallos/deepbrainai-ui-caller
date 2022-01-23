import {atom} from 'recoil';

export const callClient = atom({
  key: 'callClient',
  default: {
    counterNumber: '',
    name: '',
    video: '',
  },
});
