import React from 'react';
import PropTypes from 'prop-types';

function ListItem(props) {
  return (
    <li>
      {props.item.id} = {props.item.value}
    </li>
  );
}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
};

export default ListItem;
