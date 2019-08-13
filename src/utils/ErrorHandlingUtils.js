import {Message} from "element-ui";
import {vueInstance} from "@/main";

export function errorConnectionMessageCall() {
    Message({
        type: 'error',
        message: vueInstance.$t("common.errorCommunication")
    });
}