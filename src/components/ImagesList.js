import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import ImageSearch from './ImageSearch';

const ImagesList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`);
      const data = await response.json();
      setImages(data.hits);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container mx-auto">
      <ImageSearch />
      {
        loading ? 
        <h1 className="text-6xl text-center mx-auto">Loading..</h1>
        :
        <div className="grid grid-cols-3 gap-4">
        {
          images.map((image) => (
            <ImageCard 
              key={image.id}
              imageItem={image}
            />
          ))
        }
      </div>}
    </div>
  )
}

export default ImagesList;
