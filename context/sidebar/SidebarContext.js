// SidebarContext.js
import { createContext } from "react";

const SidebarContext = createContext({
  expanded: true,
  setExpanded: () => {}
});

export default SidebarContext;