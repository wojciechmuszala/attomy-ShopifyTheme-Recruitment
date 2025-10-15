import Collapse from "./modules/Collapse";
import Faq from "./modules/Faq";

const initModules = () => {
  new Collapse();
  new Faq();
};

initModules();

if (Shopify.designMode) {
  document.addEventListener("shopify:section:load", initModules);
  document.addEventListener("shopify:section:unload", initModules);
  document.addEventListener("shopify:block:select", initModules);
  document.addEventListener("shopify:block:deselect", initModules);
}
