import React, { Component }  from 'react'
import geocoder from 'geocoder';
import GoogleMapReact from 'google-map-react';


var input = ''
var center=  {
  lat: 50.0902,
  lng: 30.7129,
}
class Todo extends Component {
  constructor(props){
    super(props)
    this.state={
      todos: [],
      country: '',
      edit: '',
      center: {
        lat: center.lat,
        lng: center.lng,
      },
      zoom: 11
    }
  }


  addTodo(e) {
    if (e === 'Enter') {
      geocoder.geocode(input, function ( err, data ) {
       center = {
         lat: data.results[0].geometry.location.lat,
         lng: data.results[0].geometry.location.lng
       }
       console.log(center)
      });
      this.refs.country.value = '';
    }
  }

  deleteTodo(i) {
    let todo = this.state.todos
    todo.splice(i,1)
    this.setState({
      todos: todo
    })
  }

  editTodo(value, i) {
    let todo = this.state.todos
    todo[i] = value
    this.setState({
      todos: todo
    })
  }

  inputTodo(tambahan) {
    return (
        <div>
          <input
            onChange={(e)=> input = e.target.value}
            type="text"
            onKeyPress={(e)=> this.addTodo(e.key)}
            ref="country"
          />
        </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Lokasi</h1>
        {this.inputTodo()}
        <br /><br />

          <div style={{ height: '80vh', width: '90%' ,margin: 'auto'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA9lsEeSZFBhkmYNxpxSuzTbOapsAXiUPk' }}
          center={{lat: center.lat, lng: center.lng}}
          defaultZoom={this.state.zoom}
        >
        </GoogleMapReact>
      </div>
      </div>
    )
  }
}

export default Todo
