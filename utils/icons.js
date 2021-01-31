/* 
https://github.com/UnlyEd/next-right-now/blob/e6f625820726d24967b4b14a5f32c93266fac3c9/src/utils/icons/font-awesome.ts
*/

import { config, library } from "@fortawesome/fontawesome-svg-core";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;

library.add(
  faChevronDown // chevron-down
);
