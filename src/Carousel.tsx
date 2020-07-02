import React from 'react';
import { Photo } from '@frontendmasters/pet';

interface IProps {
  media: Photo[];
}

// no need
interface IState {
  active: number;
  photos: string[];
}

class Carousel extends React.Component<IProps, IState> {
  state = {
    photos: [],
    active: 0,
  };

  static getDerivedStateFromProps({ media }: IProps) {
    let photos = ['http://placecorgi.com/600/600'];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (event.target.dataset.index) {
      this.setState({ active: parseInt(event.target.dataset.index, 10) });
    }
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className='carousel'>
        <img src={photos[active]} alt='animal' />
        <div className='carousel-smaller'>
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              src={photo}
              alt='animal thumbnail'
              key={photo}
              data-index={index}
              onClick={this.handleIndexClick}
              className={index === active ? 'active' : ''}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
