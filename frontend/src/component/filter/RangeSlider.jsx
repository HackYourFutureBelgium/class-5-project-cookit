import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class RangeSlider extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      portionValue: 5,
      calorieValue: 100
    }
    this.handleChangePortion = this.handleChangePortion.bind(this);
    this.handleChangeCalorie = this.handleChangeCalorie.bind(this);
  }

  handleChangePortion(value) {
    this.setState({
      portionValue: value
    })
  }

  handleChangeCalorie(value) {
    this.setState({
      calorieValue: value
    })
  }

  render () {
    const { portionValue, calorieValue } = this.state
    return (
      <div className='slider orientation-reversed' style={{marginLeft: '2em',width:'80%' , height: '80%'}} >
        <div className='slider-group'>  
          <div className='slider-horizontal'>
            <Slider
              min={1}
              max={20}
              value={portionValue}
              orientation='horizontal'
              onChange={this.handleChangePortion}
            />
            <div className='value'>Portion : {portionValue}</div>
          </div>
          <div className='slider-horizontal'>
            <Slider
              min={0}
              max={1000}
              value={calorieValue}
              orientation='horizontal'
              onChange={this.handleChangeCalorie}
            />
            <div className='value'>Max-Calorie : {calorieValue}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default RangeSlider