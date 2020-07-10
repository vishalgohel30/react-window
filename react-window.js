import React, { memo } from 'react';
import memoize from 'memoize-one';
import { FixedSizeList as List, areEqual } from 'react-window';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// If list items are expensive to render,
// Consider using PureComponent to avoid unnecessary re-renders.
// https://reactjs.org/docs/react-api.html#reactpurecomponent
const Row = memo(({ index, style, data: { items, toggleItem, objKey } = {} } = {}) => {
  const item = items[index];
  return (
    <ListItem key={index} className={item.selected ? 'selected-item' : ''} role="listitem" button onClick={() => { toggleItem(item, index) }} style={style} >
      <ListItemText primary={item[objKey] ? item[objKey] : ''} />
    </ListItem>
  );
}, areEqual);

// This helper function memoizes incoming props,
// To avoid causing unnecessary re-renders pure Row components.
// This is only needed since we are passing multiple props with a wrapper object.
// If we were only passing a single, stable value (e.g. items),
// We could just pass the value directly.
const createItemData = memoize((items, toggleItem, objKey) => ({ items, toggleItem, objKey }));

// In this example, "items" is an Array of objects to render,
// // and "toggleItem" is a function that updates an item's state.
export const ReactWindow = ({ defaultHeight = '', items = [], toggleItem = () => { }, defaultWidth = '', objKey = '' }) => (
  <List
    height={defaultHeight ? defaultHeight : 240}
    itemCount={items.length}
    itemData={createItemData(items, toggleItem, objKey)}
    itemSize={35}
    width={defaultWidth ? defaultWidth : '100%'}
  >
    {Row}
  </List>
);


// export const ReactWindow = ({ defaultHeight = '', items = [], toggleItem = () => { }, defaultWidth = '', objKey = '' }) => (
//   <List
//     height={240}
//     itemCount={items.length}
//     itemData={createItemData(items, toggleItem, objKey)}
//     itemSize={35}
//     width={'100%'}
//   >
//     {Row}
//   </List>
// );



































































// import React, { PureComponent, memo } from 'react';
// import ReactDOM from 'react-dom';
// import memoize from 'memoize-one';
// import { FixedSizeList as List, areEqual } from 'react-window';

// const generateItems = numItems =>
//   Array(numItems)
//     .fill(true)
//     .map(_ => ({
//       isActive: false,
//       label: Math.random()
//         .toString(36)
//         .substr(2),
//     }));

// // If list items are expensive to render,
// // Consider using PureComponent to avoid unnecessary re-renders.
// // https://reactjs.org/docs/react-api.html#reactpurecomponent
// const Row = memo(({ data, index, style }) => {
//   // Data passed to List as "itemData" is available as props.data
//   const { items, toggleItemActive } = data;
//   const item = items[index];

//   return (
//     <div onClick={() => toggleItemActive(index)} style={style}>
//       {item.label} is {item.isActive ? 'active' : 'inactive'}
//     </div>
//   );
// }, areEqual);

// // This helper function memoizes incoming props,
// // To avoid causing unnecessary re-renders pure Row components.
// // This is only needed since we are passing multiple props with a wrapper object.
// // If we were only passing a single, stable value (e.g. items),
// // We could just pass the value directly.
// const createItemData = memoize((items, toggleItemActive) => ({
//   items,
//   toggleItemActive,
// }));

// // In this example, "items" is an Array of objects to render,
// // and "toggleItemActive" is a function that updates an item's state.
// function Example({ height, items, toggleItemActive, width }) {
//   // Bundle additional data to list items using the "itemData" prop.
//   // It will be accessible to item renderers as props.data.
//   // Memoize this data to avoid bypassing shouldComponentUpdate().
//   const itemData = createItemData(items, toggleItemActive);

//   return (
//     <List
//       height={height}
//       itemCount={items.length}
//       itemData={itemData}
//       itemSize={35}
//       width={width}
//     >
//       {Row}
//     </List>
//   );
// }

// class ExampleWrapper extends PureComponent {
//   state = {
//     items: generateItems(1000),
//   };

//   toggleItemActive = index =>
//     this.setState(prevState => {
//       const item = prevState.items[index];
//       const items = prevState.items.concat();
//       items[index] = {
//         ...item,
//         isActive: !item.isActive,
//       };
//       return { items };
//     });

//   render() {
//     return (
//       <Example
//         height={150}
//         items={this.state.items}
//         toggleItemActive={this.toggleItemActive}
//         width={300}
//       />
//     );
//   }
// }

