import React, { ButtonHTMLAttributes, ReactNode } from "react"

import "./Button.scss"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "error" | "primary_gradient"
  children: ReactNode
  size?: "lg" | "md" | "sm"
  fullWidth?: boolean
}

const Button: React.FC<IButton> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth,
  ...rest
}) => {
  const getClassName = (type: string) => {
    switch (type) {
      case "secondary":
        return "btn-secondary"
      case "error":
        return "btn-error"
      case "primary_gradient":
        return "btn-primary-gradient"
      default:
        return "btn-primary"
    }
  }

  const getSizeClassName = (type: string) => {
    switch (type) {
      case "lg":
        return "lg"
      case "sm":
        return "sm"
      default:
        return "md"
    }
  }

  const getIsFullWidth = (type: boolean | undefined) =>
    !!type ? "full-width" : undefined

  return (
    <button
      className={`${getClassName(variant)} ${getSizeClassName(
        size
      )} ${getIsFullWidth(fullWidth)}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
