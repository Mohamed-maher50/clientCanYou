import { toast } from "react-toastify";
function displayError(error, ...options) {
  toast(error, {
    position: options[0]?.position || "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: options[0]?.theme || "dark",
    type: options[0]?.type || "error",
  });
}

export { displayError };
