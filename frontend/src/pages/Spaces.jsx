import React, { Component } from "react";

import SpaceItem from "../components/spaces/space_item";
import Spaces from '../components/spaces/space_index_container'
// import {
//   BrowserView,
//   MobileView,
//   isBrowser,
//   isMobile
// } from "react-device-detect";
const SpacesPage = ({spaces}) => {
  console.log(spaces)
  return (
    <div className="space-index-main">
      <div className="spaces-index-spaces-wrapper">
        <div className="space-index-header">All spaces in San Francisco</div>
      </div>
      <div>
        {spaces.map(({ _id, ...otherSpaceProps }) => (
          <SpaceItem key={_id} {...otherSpaceProps} />
        ))}
      </div>
      <div className="space-index-map">
        <h1> Hi </h1>
      </div>
    </div>
  );
 
}
  

export default SpacesPage;

