import React from 'react';
import Prili from '../../../Components/Prili/Prili';
import Likhito from '../../../Components/Likhito/Likhito';
import Vaiva from '../../../Components/Vaiva/Vaiva';
import { useParams } from 'react-router-dom';

const BcsData = ({ data, category }) => {
	//   const { category } = useParams();
	//   console.log(category);
	return (
		<div>
			<Prili data={data} />
		</div>
	);
};

export default BcsData;
