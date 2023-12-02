import React from "react";

// React Component to display individual item
const Item = ({category }) => (
    <div className="item-container">
        <span className="item-label">Categoria:</span>
        {category}
      </div>
  );

  export default Item;