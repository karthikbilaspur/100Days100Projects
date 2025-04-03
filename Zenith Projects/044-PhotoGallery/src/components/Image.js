import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Rating } from 'react-rating';
import { Cache } from 'react-cache';


const Image = ({ image }) => {
  const [comments, setComments] = useState([]);
  const { register, handleSubmit } = useForm();
  const [rating, setRating] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const cachedImage = cache.get(image.url);
  const Image = ({ image }) => {

    if (cachedImage) {
      return <img src={cachedImage} alt={image.name} />;
    }
  

  const handleCommentSubmit = async (data) => {
    const comment = { text: data.comment, imageId: image.id };
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });
    const newComment = await response.json();
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  useEffect(() => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => setLoaded(true);
  }, [image.url]);

  return loaded ? (
    <img src={image.url} alt={image.name} />
  ) : (
    <div>Loading...</div>
  );
};


  return (
    <div>
      <img src={image.url} alt={image.name} />
      <p>{image.name}</p>
      <form onSubmit={handleSubmit(handleCommentSubmit)}>
        <input type="text" {...register('comment')} />
        <button type="submit">Comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

return (
     
    <div>
      <img src={image.url} alt={image.name} />
      <p>{image.name}</p>
      <Rating
        initialRating={rating}
        onChange={handleRatingChange}
      />
          <img
      src={image.url}
      alt={image.name}
      onLoad={(event) => cache.set(image.url, event.target.src)}
    />
  );
  <img
      src={image.url}
      alt={image.name}
      onLoad={(event) => cache.set(image.url, event.target.src)}
    />
  );

    </div>
  );
};

export default Image;