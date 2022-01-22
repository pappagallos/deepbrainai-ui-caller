import {atom} from 'recoil';

const videoState = atom({
  key: 'videoState',
  default: {
    counterNumber: '',
    name: '',
    video: '',
  },
});

const callListState = atom({
  key: 'callListState',
  default: [],
});

export {videoState, callListState};
