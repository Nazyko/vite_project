import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';  
import { store } from './store/store';


ReactDOM.render(
    <Provider store={store}>
        <MantineProvider withCssVariables withGlobalClasses withStaticClasses>
            <App />
        </MantineProvider>
    </Provider> , 
document.getElementById('root'));