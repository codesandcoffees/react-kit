import Loadable from 'react-loadable';

import LoadingComponent from '../components/Loading';

export default {
  LoadableCounter: Loadable({
    loader: () => import('../containers/Counter'),
    loading: LoadingComponent,
  }),

  LoadableAbout: Loadable({
    loader: () => import('../containers/About'),
    loading: LoadingComponent,
  }),
};
