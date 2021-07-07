import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { ConfigContext } from '../AppContext';
import { Router, RouteComponent } from './Router';
import { Grommet, Box } from 'grommet';
import { theme } from '../constants';
import Home from '../routes/Home';

const Main = () => {
    const config = useContext(ConfigContext);

    return (
        <Grommet theme={theme}>
            <Box >
                <Box pad={{vertical: 'small'}} round='medium' alignSelf='center' background='dark-1' height='500px' width='medium'>
                    <Router
                        routes={{
                            '/': <RouteComponent component={Home} />
                        }} />
                </Box>
            </Box>
        </Grommet>
    );
};

export default Main;
