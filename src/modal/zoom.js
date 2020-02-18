import React from 'react'

class Zoom extends React.Component {
  render() {
    return (
      <div>
        <img
          className="zoom-img"
          src={this.props.image}
          alt="Generic placeholder image"
        />
      </div>
    )
  }
}

export default Zoom
