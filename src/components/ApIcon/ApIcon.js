import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSVG } from "react-svg";
import shovel from "./shovel.svg";
import axe from "./axe.svg";
import handHoldingSeedling from "./hand-holding-seedling.svg";

const svgIcon = { shovel, axe, handHoldingSeedling };

const ApIcon = ({ icon, customSVG = false, color = "inherit", size = "1.5rem", fixedWidth = true, sx, ...restProps }) => {
  if (customSVG) {
    return (
      <ReactSVG
        src={svgIcon[icon]}
        beforeInjection={(svg) => {
          svg.setAttribute("width", size);
          svg.setAttribute("height", size);
          svg.setAttribute("fill", color);
        }}
        {...restProps}
        style={{
          cursor: restProps.onClick ? "pointer" : "unset",
          ...sx,
        }}
      />
    );
  }

  if (icon?.prefix && icon?.iconName) {
    return (
      <FontAwesomeIcon
        icon={icon}
        color={color}
        fixedWidth={fixedWidth}
        {...restProps}
        style={{
          fontSize: size,
          cursor: restProps.onClick ? "pointer" : "unset",
          ...restProps.style,
        }}
      />
    );
  }

  const Icon = icon;
  return (
    <Icon
      sx={{
        fontSize: size,
        cursor: restProps.onClick ? "pointer" : "unset",
        color,
        ...sx,
      }}
      {...restProps}
    />
  );
};

export default ApIcon;
