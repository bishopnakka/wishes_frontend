import {useEffect, useState} from 'react';

import axios from 'axios';
import '../styles/admin.css';

export default function AdminPanel() {

  const [templates, setTemplates] = useState([]);

  const [formData, setFormData] = useState({

      title: '',
      category: '',
      heading: '',
      description: '',
      previewImage: '',
      price: '',
      isPremium: false

    });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {

    try {

      const response = await axios.get( 'http://localhost:5000/api/template' );

      setTemplates(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFormData({

      ...formData,

      [name]:

        type === 'checkbox'
          ? checked
          : value

    });
  };

  const createTemplate = async () => {

    try {

      await axios.post(

        'http://localhost:5000/api/admin/template/create',

        formData,

        {
          headers: {
            role:
              localStorage.getItem('role')
          }
        }

      );

      alert(
        'Template Added 🎉'
      );

      fetchTemplates();

    } catch (error) {

      console.log(error);

      alert(
        'Failed To Add Template'
      );

    }
  };

  const deleteTemplate = async ( id ) => {

    try {

      await axios.delete(

        `http://localhost:5000/api/admin/template/${id}`,

        {
          headers: {
            role:
              localStorage.getItem('role')
          }
        }

      );

      fetchTemplates();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className='admin-page'>

      <div className='admin-form'>

        <h1>
          Admin Panel
        </h1>

        <input
          type='text'
          name='title'
          placeholder='Title'
          onChange={handleChange}
        />

        <input
          type='text'
          name='category'
          placeholder='Category'
          onChange={handleChange}
        />

        <input
          type='text'
          name='heading'
          placeholder='Heading'
          onChange={handleChange}
        />

        <textarea
          name='description'
          placeholder='Description'
          onChange={handleChange}
        />

        <input
          type='text'
          name='previewImage'
          placeholder='Preview Image URL'
          onChange={handleChange}
        />

        <input
          type='number'
          name='price'
          placeholder='Price'
          onChange={handleChange}
        />

        <label>

          Premium Template

          <input
            type='checkbox'
            name='isPremium'
            onChange={handleChange}
          />

        </label>

        <button
          onClick={createTemplate}
        >

          Add Template

        </button>

      </div>

      <div className='admin-templates'>

        <h2>
          All Templates
        </h2>

        <div className='admin-grid'>

          {

            templates.map((template) => (

              <div
                className='admin-card'
                key={template._id}
              >

                <img
                  src={
                    template.previewImage
                  }
                  alt='template'
                />

                <h3>
                  {template.title}
                </h3>

                <p>
                  {template.category}
                </p>

                <p>
                  ₹{template.price}
                </p>

                <button

                  onClick={() =>
                    deleteTemplate(
                      template._id
                    )
                  }

                >

                  Delete

                </button>

              </div>

            ))

          }

        </div>

      </div>

    </div>
  );
}