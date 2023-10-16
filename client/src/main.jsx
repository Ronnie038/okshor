import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './store/index.jsx';
import 'react-quill/dist/quill.snow.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		{' '}
		<React.StrictMode>
			<App />
			<Toaster />
		</React.StrictMode>
	</Provider>
);
