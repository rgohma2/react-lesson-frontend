import React from 'react'
import { Card, Button } from 'semantic-ui-react'

function DogList(props) {
	const dogs = props.dogs.map(dog => {
		return <Card centered={true} key={dog.id}>
			<Card.Content >
				<Card.Header>
					{dog.name}
				</Card.Header>
				<Card.Description>
					{dog.name} is a {dog.breed} owned by {dog.owner}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button onClick={() => {props.deleteDog(dog.id)}}>Delete Dog</Button>
				<Button onClick={() => {props.editDog(dog.id)}}>Edit Dog</Button>
			</Card.Content>
		</Card>
	})
	return(
		<div>
			<Card.Group>
				{dogs}
			</Card.Group>
		</div>
	)
}

export default DogList