// import customCss from "./HtmlString.module.css";
import "./HtmlString.css";
const HTMLStringToComponent = ({ htmlString }) => {
  return (
    <div
      //   className={customCss}
      className="htmlString"
      dangerouslySetInnerHTML={{
        __html: htmlString,
      }}
    />
  );
};

export default HTMLStringToComponent;
