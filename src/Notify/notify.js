import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export function notifyError(text){  
  toast.error(text, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: toast.TRANSITIONS.BOUNCE,
  });
}

export function notifyInfo(text){  
  toast.success(text, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: toast.TRANSITIONS.BOUNCE,
  });
}
