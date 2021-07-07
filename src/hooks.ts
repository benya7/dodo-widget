import { ServiceContext, TradeContext } from './AppContext';
import { useContext } from 'preact/hooks';

export const useService = (): any => useContext(ServiceContext);
export const useStore = (): any => useContext(TradeContext)[0]
export const useDispatch = (): any => useContext(TradeContext)[1]

