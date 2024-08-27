import { useState } from "react";
import PropTypes from 'prop-types';

export default function ListGroup(props) {
  const numbers = Array.from({ length: props.length }, (_, i) => i);
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <>
      <h1>{props.title}</h1>
      <ul className="list-group">
        {numbers.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={index}
            onClick={ () => setSelectedIndex(index) }
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

ListGroup.propTypes = {
    title: PropTypes.string,
    length: PropTypes.number,
    onSelectItem: PropTypes.func
}
