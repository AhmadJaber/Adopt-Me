import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import { connect } from 'react-redux';
import PetCollection from './PetCollection';

import useDropdown from './useDropdown';
import changeTheme from './actionCreators/changeTheme';
import changeLocation from './actionCreators/changeLocation';

const SearchParams = (props) => {
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropDown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location: props.location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed('');

    pet.breeds(animal).then(({ breeds: breedsApi }) => {
      const breedString = breedsApi.map(({ name }) => name);
      setBreeds(breedString);
    }, console.error);
  }, [animal, setBreed]);

  return (
    <div className='search-params'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor='location'>
          Location
          <input
            type='text'
            value={props.location}
            id='location'
            placeholder='Location'
            onChange={(e) => props.updateLocation(e.target.value)}
          />
        </label>

        <AnimalDropdown />
        <BreedDropDown />

        <label htmlFor='theme'>
          Theme
          <select
            id='theme'
            value={props.theme}
            onChange={(e) => props.updateTheme(e.target.value)}
            onBlur={(e) => props.updateTheme(e.target.value)}
          >
            <option value='peru'>Peru</option>
            <option value='tomato'>Tomato</option>
            <option value='cornflowerblue'>Cornflowerblue</option>
          </select>
        </label>

        <button style={{ backgroundColor: props.theme }}>Submit</button>
      </form>

      <PetCollection pets={pets} />
    </div>
  );
};

const mapStateToProps = ({ location, theme }) => ({
  location,
  theme,
});

const mapDispatchToProps = (dispatch) => ({
  updateTheme(theme) {
    dispatch(changeTheme(theme));
  },

  updateLocation(location) {
    dispatch(changeLocation(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);
