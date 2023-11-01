// setDocumentTitle.js
// import { useRef, useEffect } from "react";

function setDocumentTitle(title) {
  //   const defaultTitle = useRef(document.title);

  window.document.title = title;
}

export { setDocumentTitle };
