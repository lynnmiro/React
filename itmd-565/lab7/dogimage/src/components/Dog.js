import React from 'react'
import axios from 'axios'

class Dog extends React.Component {

constructor() {
 super()
 this.state = {breeds : [], images: '', currentindex: 1, currentdog: ''}
 this.fetchDogs = this.fetchDogs.bind(this);
}

componentDidMount() {

document.getElementById("dropdown").addEventListener("change", this.fetchDogs);

axios.get('https://dog.ceo/api/breeds/list/all').then(function(res){

this.setState({
  breeds: Object.keys(res.data.message),
})

}.bind(this))

}

fetchDogs() {
if(document.getElementById('dropdown').value == this.state.currentdog) {
  this.setState({currentindex: this.state.currentindex + 1})
}

else {

  const currentdog = document.getElementById('dropdown').value;
  axios.get(`https://dog.ceo/api/breed/${currentdog}/images`).then(function(res){

  this.setState({images: res.data.message, currentdog: currentdog})
  }.bind(this))

}

}

render() {
const {breeds, images, currentindex, currentdog} = this.state;
const doggy = this.state.currentdog || 'affenpinscher'
return  (
  <div>
    <div><h1> {doggy} Dog Image Generator</h1> </div>
   <p>Please press the button to generate a new random image</p>
      { console.log(this.state.currentdog) }
      <div>
    <select id="dropdown">
      {breeds.map((current) => {
        return <option>{current}</option>
      })}
    </select>

    <button onClick={() => {
      this.fetchDogs();
    }}> Fetch </button>
  </div>

    {(images && images.length && currentindex < images.length) ? <img style={{float:'left',width:'500px',height:'360px'}} src={images[this.state.currentindex]} /> : <img style={{float:'left',width:'500px',height:'360px'}}src="https://images.dog.ceo/breeds/affenpinscher/n02110627_10147.jpg"/>}
  </div>
)

 }
}

export default Dog;
