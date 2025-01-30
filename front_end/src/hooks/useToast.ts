import { toast } from "react-toastify";

export function useToast() {
    function success(message: string) {
        toast.success(message, { autoClose: 3000 });
    }

    function error(message: string) {
        toast.error(message, { autoClose: 3000 });
    }

    return { success, error };
}
