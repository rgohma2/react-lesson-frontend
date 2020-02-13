import React from 'react'

import { Form, Button, Label, Modal, Header } from 'semantic-ui-react'

function EditDogModal(props){

	return(
		<Modal open={props.open} closeIcon={true} onClose={() => props.closeModal()}>
		<Header>Edit Dog</Header>
			<Modal.Content>
				<Form onSubmit={props.updateDog}>
					<Label>Name:</Label>
					<Form.Input
					type="text"
					name="name"
					value={props.dogToEdit.name}
					onChange={props.handleEditChange}
					/>
					<Label>Breed:</Label>
					<Form.Input
					type="text"
					name="breed"
					value={props.dogToEdit.breed}
					onChange={props.handleEditChange}
					/>
					<Label>Owner:</Label>
					<Form.Input
					type="text"
					name="owner"
					value={props.dogToEdit.owner}
					onChange={props.handleEditChange}
					/>
					<Button type="submit">Update Dog</Button>
				</Form>
			</Modal.Content>
		</Modal>
	)
}

export default EditDogModal