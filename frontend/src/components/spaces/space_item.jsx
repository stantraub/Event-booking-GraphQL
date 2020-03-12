import React from 'react';
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
    console.log(this.props)
    return (
      <div className="space-item-wrapper">

      </div>
    );
  }
}

export default SpaceItem