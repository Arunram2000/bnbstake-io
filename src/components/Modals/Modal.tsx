import React, { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

import Backdrop from "./Backdrop"
import ReactModal from "./ReactModal"
import { modalVaraints } from "../../constants/variants"

interface IModal {
  children: ReactNode
  handleClose?: () => void
  isOpen: boolean
  overlay?: boolean
}

const Modal: React.FC<IModal> = ({
  children,
  handleClose,
  isOpen,
  overlay = true,
}) => {
  if (!isOpen) return null

  return (
    <ReactModal>
      <Backdrop isOpen={isOpen} handleClose={handleClose} overlay={overlay}>
        <AnimatePresence exitBeforeEnter>
          {isOpen && (
            <motion.div
              onClick={(e) => e.stopPropagation()}
              variants={modalVaraints}
              className="modal-content"
              animate="animate"
              initial="initial"
              exit="initial"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </Backdrop>
    </ReactModal>
  )
}

export default Modal
