import React from 'react';
import pet, { Photo } from '@frontendmasters/pet';
import { navigate, RouteComponentProps } from '@reach/router';

import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';
import Modal from './Modal';

class Details extends React.Component<RouteComponentProps<{ id: string }>> {
  public state = {
    loading: true,
    showModal: false,
    url: '',
    name: '',
    media: [] as Photo[],
    breed: '',
    animal: '',
    description: '',
    location: '',
  };

  public componentDidMount() {
    // should be a 404page instead of below
    if (!this.props.id) {
      navigate('/');
      return;
    }

    pet
      .animal(+this.props.id)
      .then(({ animal }) => {
        this.setState({
          url: animal.url,
          name: animal.name,
          breed: animal.breeds.primary,
          animal: animal.type,
          media: animal.photos,
          description: animal.description,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          loading: false,
        });
      }, console.error)
      .catch((err: Error) => this.setState({ error: err }));
  }

  public toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  public adopt = () => navigate(this.state.url);

  public render() {
    if (this.state.loading) {
      return <h2>Loading......</h2>;
    }

    const {
      name,
      breed,
      animal,
      description,
      location,
      media,
      showModal,
    } = this.state;

    return (
      <div className='details'>
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>

          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>

          {showModal ? (
            <Modal>
              <div>
                <h1>Would You Like to adopt {name}</h1>
                <div className='buttons'>
                  <button onClick={this.adopt}>YES</button>
                  <button onClick={this.toggleModal}>No, I am a Monster</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsErrorBoundary(
  props: RouteComponentProps<{ id: string }>
) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
