import React, { Component } from "react";

import SpaceItem from "../components/spaces/space_item";
import './Spaces.css'
const SpacesPage = ({spaces}) => {
  console.log(spaces)
  return (
    <div className="space-index-main">
      <div className="spaces-index-spaces-wrapper">
        <div className="space-index-header">
          All spaces in San Francisco
        </div>
        <div>
          {spaces.map(({ _id, ...otherSpaceProps }) => {
            return (
              <SpaceItem 
                key={_id} 
                spaceId={_id} 
                {...otherSpaceProps}
              />
            )
          })}
        </div>
      </div>
    
      <div className="space-index-map">
      </div>
    </div>
  );
 
}
  

export default SpacesPage;

