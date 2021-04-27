import React from "react";
const Tags = (props) => (
  <div className="tags">
    <a href={props.value} className="element-a-tags">
      {props.hashtagValue}
    </a>
    &nbsp;
  </div>
);
export default Tags;
