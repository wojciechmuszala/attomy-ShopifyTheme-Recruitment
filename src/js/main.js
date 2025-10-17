import Collapse from "./modules/Collapse";
import Faq from "./modules/Faq";

let collapseInstance = null;
let faqInstance = null;

const initModules = (container = document) => {
  if (collapseInstance) collapseInstance.destroy();
  if (faqInstance) faqInstance.destroy();

  collapseInstance = new Collapse(container);
  faqInstance = new Faq(container);
};

document.addEventListener("DOMContentLoaded", () => {
  initModules();
});

if (Shopify.designMode) {
  document.addEventListener("shopify:section:load", (event) => {
    initModules(event.target);
  });
  document.addEventListener("shopify:section:unload", () => {
    if (collapseInstance) collapseInstance.destroy();
    if (faqInstance) faqInstance.destroy();
  });
}
