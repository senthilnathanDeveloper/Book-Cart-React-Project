"use client";
import { MenuItem, MenuList, Paper, Box, Typography, Slider, Stack } from '@mui/material';
import { useState, useEffect } from 'react';

const LeftBar = () => {
  const MIN = 111.00;
  const MAX = 8264.00;
  const [priceRange, setPriceRange] = useState([MIN, MAX]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://bookcart.azurewebsites.net/api/book/GetCategoriesList');
        if (response.ok) {
          const data = await response.json();
          // Assuming the API returns an array of objects with categoryId and categoryName
          // Prepend 'All Categories' and ensure categoryName is used for display
          setCategories([{ categoryId: '', categoryName: 'All Categories' }, ...data]);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Typography variant="body2" sx={{ padding: '20px' }}>Loading categories...</Typography>;
  }

  return (
    <Stack sx={{ display: "flex", direction: "column", gap: 2 }}>
      <Paper sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', height: "300px", padding: "5px" }}>
        <MenuList>
          {categories.map((category) => (
            <MenuItem
              key={category.categoryId || category.categoryName}  // Use categoryId or categoryName for unique keys
              onClick={() => setSelectedCategory(category.categoryName)}
              sx={{
                borderRadius: "4px", padding: "12px", fontSize: "16px",
                backgroundColor: selectedCategory === category.categoryName ? '#FF5722' : 'inherit',
              }}>
              {category.categoryName}  {/* Display category name */}
            </MenuItem>
          ))}
        </MenuList>
      </Paper>

      <Paper>
        <Box sx={{ height: "60px", backgroundColor: "#f73378", color: "white" }}>
          <Typography variant="body2" sx={{ fontSize: "22px", padding: "12px" }}>
            Price Filter
          </Typography>
        </Box>
        <Box sx={{ width: 250, margin: "10px" }}>
          <Slider sx={{ color: "#3f51b5" }}
            step={10}
            value={priceRange}
            valueLabelDisplay="auto"
            min={MIN}
            max={MAX}
            onChange={(_, newRange) => setPriceRange(newRange)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', cursor: "pointer" }}>
            <Typography variant="body2" onClick={() => setPriceRange([MIN, priceRange[1]])}>
              ₹{MIN}
            </Typography>

            <Typography variant="body2">to</Typography>

            <Typography variant="body2" onClick={() => setPriceRange([priceRange[0], MAX])}>
              ₹{MAX}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
};

export default LeftBar;
