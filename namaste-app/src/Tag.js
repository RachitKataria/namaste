import React from "react";
import "./Tag.css";

function Tag({ text, active, isClickable, clickHandler }) {
  const [isActive, setIsActive] = React.useState(active);
  const maybeOnClick = isClickable ? clickHandler : false;

  // Set the current Tag as active and execute passed in clickHandler
  function onClick() {
    // Only toggle if button is clickable
    if (isClickable) {
      // Toggle whether the button is active
      setIsActive(!isActive);

      if (clickHandler) {
        maybeOnClick(text);
      }
    }
  }

  const bgColor = isActive ? "#FFBE5B" : "#FBD59C";
  return (
    <button
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
      class="button"
    >
      {text}
    </button>
  );
}

export default Tag;
