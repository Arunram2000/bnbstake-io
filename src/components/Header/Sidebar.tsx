import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Sidebar: React.FC<{ sidebar: boolean; handleClose: () => void; children: ReactNode }> = ({
  sidebar,
  handleClose,
  children,
}) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {sidebar && (
        <motion.div
          className="sidebar_backdrop"
          onClick={handleClose}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.div
            className="sidebar"
            onClick={(e) => e.stopPropagation()}
            animate={{ left: 0, transitionDelay: "-200ms" }}
            exit={{ left: -300 }}
            initial={{ left: -300 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
