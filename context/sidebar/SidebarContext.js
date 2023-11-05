// SidebarContext.js
import { createContext } from "react";

const SidebarContext = createContext({
  expanded: false,
  setExpanded: () => {}
});

export default SidebarContext;