import React from 'react';
import pet from '@frontendmasters/pet';

import Carousel from './Carousel';

class Details extends React.Component {
  state = { loading: true };

  componentDidMount() {
    pet
      .animal(this.props.id)
      .then(({ animal }) => {
        this.setState({
          name: animal.name,
          breed: animal.breeds.primary,
          animal: animal.type,
          media: animal.photos,
          description: animal.description,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          loading: false,
        });
      })
      .catch((err) => this.setState({ error: err }));
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading......</h2>;
    }

    const { name, breed, animal, description, location, media } = this.state;

    return (
      <div className='details'>
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
