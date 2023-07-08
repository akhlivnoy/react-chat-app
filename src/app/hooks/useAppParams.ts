import { useParams } from 'react-router-dom';

import { Params } from '#navigation/routes';

export const useAppParams = () => useParams<Params>();
