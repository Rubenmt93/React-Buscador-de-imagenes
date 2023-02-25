import {React, useState} from 'react'
import './header.css'
import './content.css'
import './article.css'

import { Formik, Form, Field } from 'formik';
const App = () => {
  const [photos, setPhotos]= useState([])
  const open = url => window.open(url)
  console.log({photos});
  return (
    <div>
      <header>
        <Formik
          initialValues={{search:''}}
          onSubmit={async values => {
            // llamar a api de unsplash
            const response= await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
              headers: {
                'Authorization': 'Client-ID C2ptUBx1_7OsDnO4-BhpYiOTFQ-OVwGIWF0nY7XVKFA'
              }
            })
            const data= await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name='search'/>
          </Form>

        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo => 
            <article key={photo.id} onClick={()=> open(photo.links.html)}>
              <img src={photo.urls.regular}/>
              <p>{[photo.description, photo.alt_description].join( ' - ')}</p>
            </article>)}
        </div>
      </div>
    </div>
  )
}

export default App