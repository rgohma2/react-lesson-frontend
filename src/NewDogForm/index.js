import React from 'react'
import { Form, Button, Label, Segment} from 'semantic-ui-react'

class NewDogForm extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			name: '',
			breed: '',
			owner: ''
		}
	}

	handleChange = (event) => {
		// computed properties syntax
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.addDog(this.state)
		this.setState({
			name:'',
			breed: '',
			owner: ''
		})
	}

	render() {
		return(
			<Segment>
				<h4>Create New Dog</h4>
				<Form onSubmit={this.handleSubmit}>
					<Label>Name:</Label>
					<Form.Input
						type='text'
						name='name'
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<Label>Breed:</Label>
					<Form.Input
						type='text'
						name='breed'
						value={this.state.breed}
						onChange={this.handleChange}
					/>
					<Label>Owner:</Label>
					<Form.Input
						type='text'
						name='owner'
						value={this.state.owner}
						onChange={this.handleChange}
					/>
					<Button>Add New Dog</Button>
				</Form>
			</Segment>	
		)
	}
}

export default NewDogForm