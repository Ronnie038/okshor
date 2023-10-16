import './HtmlString.css';
const HTMLStringToComponent = ({ htmlString }) => {
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: htmlString,
			}}
		/>
	);
};

export default HTMLStringToComponent;
