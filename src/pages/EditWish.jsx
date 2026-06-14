import {
  useEffect,
  useState
}
from 'react';

import axios
from 'axios';

import {
  useParams,
  useNavigate
}
from 'react-router-dom';

export default function EditWish(){

  const { id } =
  useParams();

  const navigate =
  useNavigate();

  const [message,
  setMessage] =
  useState('');

  const [unlockWord,
  setUnlockWord] =
  useState('');

  useEffect(()=>{

    fetchWish();

  },[]);

  const fetchWish =
  async()=>{

    const response =
    await axios.get(

      `http://localhost:5000/api/wishes/${id}`

    );

    setMessage(
      response.data.message
    );

    setUnlockWord(
      response.data.unlockWord
    );

  };

  const updateWish =
  async()=>{

    const token =
    localStorage.getItem(
      'token'
    );

    await axios.put(

      `http://localhost:5000/api/wishes/${id}`,

      {

        message,

        unlockWord

      },

      {

        headers:{

          authorization:
          token

        }

      }

    );

    alert(
      'Wish Updated 🎉'
    );

    navigate(
      '/dashboard'
    );

  };

  return(

    <div
      className='create-page'
    >

      <div
        className='create-container'
      >

        <h1>

          Edit Wish

        </h1>

        <textarea

          value={message}

          onChange={(e)=>

            setMessage(
              e.target.value
            )

          }

        />

        <input

          type='text'

          value={unlockWord}

          onChange={(e)=>

            setUnlockWord(
              e.target.value
            )

          }

        />

        <button

          onClick={
            updateWish
          }

        >

          Save Changes

        </button>

      </div>

    </div>

  );

}