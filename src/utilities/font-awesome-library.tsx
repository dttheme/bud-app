import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faGoogle, faExclamationCircle);

export const google = icon({ prefix: "fab", iconName: "google" });
