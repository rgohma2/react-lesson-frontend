import React from 'react'

import { Form, Button, Label, Modal, Header } from 'semantic-ui-react'

class EditDogModal extends React.Component {
	constructor(props) {

		super(props)

		this.state = {
			name: '',
			breed: '',
			owner: ''
		}
	}

	componentDidMount() {
		this.setState(this.props.dogToEdit)
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.updateDog(this.state)
	}

	render() {
		return(
			<Modal open={true} closeIcon={true} onClose={() => this.props.closeUpdate()}>
			<Header>Edit Dog</Header>
				<Modal.Content>
					<Form onSubmit={this.handleSubmit}>
						<Label>Name:</Label>
						<Form.Input
						type="text"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
						/>
						<Label>Breed:</Label>
						<Form.Input
						type="text"
						name="breed"
						value={this.state.breed}
						onChange={this.handleChange}
						/>
						<Label>Owner:</Label>
						<Form.Input
						type="text"
						name="owner"
						value={this.state.owner}
						onChange={this.handleChange}
						/>
						<Button type="submit">Update Dog</Button>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}

export default EditDogModal