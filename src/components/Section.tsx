import React, { DetailedHTMLProps, HTMLAttributes, FC } from "react";
import classes from "styles/components/Section.module.scss";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  innerClassName?: string;
  thisRef?: any;
  innerRef?: any;
  innerStyle?: React.CSSProperties;
}

export const Section: FC<Props> = ({
  thisRef,
  innerRef,
  children,
  className,
  innerClassName,
  innerStyle,
  style,
  ...props
}) => {
  return (
    <div
      {...props}
      style={style}
      ref={thisRef}
      className={[classes.container, className].join(" ")}
    >
      <div
        ref={innerRef}
        className={[classes.innerContainer, innerClassName].join(" ")}
        style={innerStyle}
      >
        {children}
      </div>
    </div>
  );
};
