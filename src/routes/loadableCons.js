import Loadable from 'react-loadable';

import LoadingComponent from '../components/Loading';

const fakeDelay = ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export default {
  LoadableCounter: Loadable({
    loader: () => fakeDelay(2000).then(() => import('../containers/Counter')),
    loading: LoadingComponent,
  }),

  LoadableAbout: Loadable({
    loader: () => fakeDelay(2000).then(() => import('../containers/About')),
    loading: LoadingComponent,
  }),
};
