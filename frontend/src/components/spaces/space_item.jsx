import React from 'react';
import './space_item.css'
import { Link } from 'react-router-dom';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

class SpaceItem extends React.Component {
  constructor(props) {
    super(props)
  }

  includedAmenities() {
    let included = ""

    if (this.props.availability) {
      included += "Space available · "
    }

    if (this.props.deskDay) {
      included += 'Day Passes Available · '
    }

    included += `${this.props.peopleCapacity} total capacity`

    if (this.props.officeCapacity > 0) {
      included += ` · ${this.props.officeCapacity} offices`
    }
    return included;
  }

  phone() {
    if (this.props.phone !== 'N/A') return this.props.phone
  }

  email() {
    if (this.props.email !== 'N/A') return this.props.email

  }
  render() {
    return (
      <div className="space-item-wrapper">
        <img className="main-pic" src={this.props.mainPhoto} />
        <div className="space-item-info">
          <div className="space-item-name">{this.props.name}</div>
          <div className="space-item-amenities">
            <div>
              {this.props.city}, {this.props.state}
            </div>
            <span>{this.props.neighborhood}</span>
            <div className="space-amenity-wrapper">
              {this.includedAmenities()}
            </div>
            <div className="space-item-contact">
              <div>{this.phone()}</div>
              <div>{this.email()}</div>
            </div>
          </div>
          <div className="space-item-cost">
            <strong>${this.props.cost}</strong> per desk / month
          </div>
        </div>
      </div>
    );
  }
}

export default SpaceItem