const errorCont = document.querySelector(".errorContainer");


export function showMsgError(msg){
  errorCont.innerHTML = "";
  const textError = document.createElement("h2");
  textError.classList.add("msgError");
  textError.innerHTML = msg;

  errorCont.appendChild(textError);

}



