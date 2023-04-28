import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddEdit.css';

const AddEdit = () => {
    
    
    const initialState = {
        name: '',
        phone: '',
        school: '',
        myclass: '',
        rollNo: '',
        address: ''
    };
    const [state, setState] = useState(initialState);
    const { name, phone, school, myclass, rollNo, address } = state;
    const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !phone || !school || !myclass || !rollNo || !address){
        toast.error('Please enter the details');
    }else {
        axios.post("http://localhost:5000/api/post", {
            name, 
            phone,
            school,
            myclass,
            rollNo,
            address,
        })
        .then(() =>{
            setState({name: "", phone: "", school: "", myclass: "", rollNo: "", address: "" });
        })
        .catch((err) => toast.error(err.response.data));
        setTimeout(() => history.push("/"), 500)
    }
  };
  
  


  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
        name='add-edit-form'
      >
        <label htmlFor='name'></label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Your Name'
          value={name}
          onChange={handleInputChange}
        />

        <label htmlFor='phone'></label>
        <input
          type='number'
          id='phone'
          name='phone'
          placeholder='Your Phone Number'
          value={phone}
          onChange={handleInputChange}
        />

        <label htmlFor='school'></label>
        <input
          type='text'
          id='school'
          name='school'
          placeholder='Your school name'
          value={school}
          onChange={handleInputChange}
        />

        <label htmlFor='myclass'></label>
        <input
          type='number'
          id='myclass'
          name='myclass'
          placeholder='Enter your class'
          value={myclass}
          onChange={handleInputChange}
        />

        <label htmlFor='rollNo'></label>
        <input
          type='number'
          id='rollNo'
          name='rollNo'
          placeholder='Enter Your roll No'
          value={rollNo}
          onChange={handleInputChange}
        />

        <label htmlFor='address'></label>
        <input
          type='text'
          id='address'
          name='address'
          placeholder='Your Address'
          value={address}
          onChange={handleInputChange}
        />

        <input type='submit' value='Save' />

        <Link to='/'>
          <input type='button' value='Go Back' />
        </Link>
      </form>
    </div>
  );

};

export default AddEdit;
