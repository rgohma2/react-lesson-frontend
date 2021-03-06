import React, { Component } from 'react'
import DogList from '../DogList'
import NewDogForm from '../NewDogForm'
import EditDogModal from './EditDogModal'
import { Grid } from 'semantic-ui-react'

class Name extends Component {
	constructor(props) {

		super(props)

		this.state = {
			dogs: [],
			idOfDogToEdit: -1
		}
	}

	componentDidMount() {
		this.getDogs()
	}
	// CORS calls this to FAIL
	// browsers implement this for security reasons
	// we need to configure server to speak to specific clients that is 
	// recongizes. We need an options response in our back end (flask app) 

	getDogs = async () => {
		try{
			const dogsResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/dogs/')
			const dogsJson = await dogsResponse.json()
			console.log(dogsJson);
			this.setState({
				dogs: dogsJson.data
			})
		}catch(err){
			console.log(err)
		}
	}

	addDog = async (dog) => {
		try{
			// customize fetch according to this
			// body -- dog ^^^ in this case
			// header -- Content-Type: application/json

			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/dogs/', {
				method: 'POST',
				body: JSON.stringify(dog),
				headers: {
					'Content-Type': 'application/json'
				}
			}) 
			const addDogJson = await response.json()
			console.log(addDogJson);

			// if(response.status === 201) {
			// 	const dogs = this.state.dogs
			// 	dogs.push(addDogJson.data)
			// 	this.setState({
			// 		dogs: dogs
			// 	})
			// }

			this.setState({
				dogs:[...this.state.dogs, addDogJson.data]
			})

		}catch(err){
			console.error(err)
		}
	}

	deleteDog = async (id) => {
		console.log("trying to delete dog with id:", id);
		try{
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/dogs/' + id, {
				method: 'DELETE'
			})
			const deleteDogJson = response.json()
			console.log(deleteDogJson);

			// we want to remove dog with this id from array of dogs in state

			// returns array of dogs that dont match the id that is to be deleted
			if (deleteDogJson.status === 200) {
				this.setState({
					dogs: this.state.dogs.filter(dog => dog.id !== id)
				})
			}
			
		}catch(err){
			console.log(err)
		}

	}

	editDog = (id) => {
		console.log('dog we want to edit, id:', id);
		console.log(this.state.dogs.find((dog) => {
			if (dog.id === id) {
				return true
			} else {
				return false
			}
		}));
		this.setState({
			idOfDogToEdit: id
		})
	}

	 updateDog = async (newDogInfo) => {
		console.log('trying to update dog at index', this.state.idOfDogToEdit);
		console.log(newDogInfo);
		try{
			const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/dogs/' + this.state.idOfDogToEdit, 
			{
				method: 'PUT',
				body: JSON.stringify(newDogInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const updatedDogJson = await response.json() 

			if (response.status === 200) {
				const dogs = this.state.dogs
				const index = dogs.findIndex(dog => dog.id === this.state.idOfDogToEdit)
				dogs[index] = updatedDogJson.data
				this.setState({
					dogs: dogs
				})
				this.closeUpdate()
			}
		}catch(err){
			console.log(err)
		}
	}

	closeUpdate = () => {
		this.setState({
			idOfDogToEdit: -1
		})
	}

	render() {
		return(
			<Grid columns={2} divided textAlign={'center'} stackable={true}>
				<Grid.Column>
					<DogList 
					dogs={this.state.dogs} 
					deleteDog={this.deleteDog}
					editDog={this.editDog}
					/>
				</Grid.Column>
				<Grid.Column>
					<NewDogForm addDog={this.addDog}/>
				</Grid.Column>
				{
					this.state.idOfDogToEdit !== -1
					? 
					<EditDogModal dogToEdit= {
						this.state.dogs.find((dog) => dog.id === this.state.idOfDogToEdit)
					}
					updateDog={this.updateDog}
					closeUpdate={this.closeUpdate}/>
					: 
					null
				}
			</Grid>
		)
	}
}

export default Name