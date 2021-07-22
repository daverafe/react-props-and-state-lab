import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    fetch(this.state.filters.type === 'all' ? `/api/pets` : `/api/pets?type=${this.state.filters.type}`)
    .then(resp => resp.json())
    .then(petData => {
      this.setState({
        pets: this.state.pets.concat(petData) 
      })
    })
  }

  onAdoptPet = (id) => {
   const matchingPet = this.state.pets.filter(pet => {
      return pet.id === id 
    })
    matchingPet[0].isAdopted = true 
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
