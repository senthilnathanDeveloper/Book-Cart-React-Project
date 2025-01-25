// 'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchBooks } from '../../redux/cartSlice'; // Corrected path
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.cart.books);
  const error = useSelector((state) => state.cart.error); // Get error from Redux state
  const loading = useSelector((state) => state.cart.status === 'loading'); // Get loading status from Redux state
  const router = useRouter();
  const [favorites, setFavorites] = useState({});

  const handleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchBooks());
    };
    fetchData();
  }, [dispatch]);

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {loading && (
        <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
          Loading products...
        </Typography>
      )}
      {error ? (
        <Typography variant="h6" sx={{ color: 'red', textAlign: 'center', width: '100%' }}>
          Failed to fetch Products....Try after some time
        </Typography>
      ) : (
        books.map((book) => (
          <Card
            onClick={() => router.push(`/product/${book.bookId}`)}
            key={book.bookId}
            sx={{
              width: 'calc(25% - 10px)',
              margin: '5px',
              height: '370px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: 24,
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={`https://bookcart.azurewebsites.net/Upload/${book.coverFileName}`}
              alt={book.title}
              sx={{ objectFit: 'fill', height: '250px', width: '100%' }}
            />
            <IconButton
              aria-label="add to favorites"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: favorites[book.id] ? '#ff3d00' : 'whitesmoke',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite(book.id);
              }}
            >
              <FavoriteIcon />
            </IconButton>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  color: 'blue',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {book.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ₹{book.price}
              </Typography>
            </CardContent>
            <CardActions sx={{ marginTop: '-20px' }}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                sx={{
                  margin: '5px',
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontWeight: 'bold',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(book);
                }}
              >
                <ShoppingCartIcon />
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </div>
  );
};

export default ProductList;
