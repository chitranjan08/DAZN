
import supertest from 'supertest';
import app from './index';

const request = supertest(app);
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZW1wVXNlcklkIiwidXNlcm5hbWUiOiJ0ZW1wVXNlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwOTk2MTAzMn0.dYQEW7UwSaM5Bk_7nM1D7YPoQo3WZUTrydKcHvBBBMI';

describe('REST API Tests', () => {
  it('GET /getAllMovies should return a list of movies', async () => {
    const response = await request.get('/movies/getAllMovies');
    console.log('Response:', response.body);
    expect(response.status).toBe(200);
   
  });

  it('GET /search should return a list of movies based on the search query', async () => {
    const response = await request.get('/movies/search').query({ q: 'example' });
    console.log('Response:', response.body); 
    expect(response.status).toBe(200);
   
  });

  it('POST /addMovie should add a new movie', async () => {
    const newMovie = {
      title: 'New Movie',
      genre: 'Drama',
      rating: 4.8,
      streamingLink: 'https://example.com/forrest-gump',
      
    };

    const response = await request.post('/movies/addMovie').send(newMovie);
    console.log('Response:', response.body); 
    expect(response.status).toBe(201);
   
  });

  it('PUT /:id should update a movie', async () => {
    const movieId = '65ebe2b759823fedcd08e545'; 
    const updatedMovie = {
      
      title:"new"
    };

    const response = await request.put(`/movies/${movieId}`)
    .set('Authorization', `Bearer ${adminToken}`)
    .send(updatedMovie);
  console.log('Response:', response.body); 
  expect(response.status).toBe(200);
    
  });

  it('DELETE /:id should delete a movie (admin authentication)', async () => {
    const movieId = '65ebe2b759823fedcd08e545'; 

    const response = await request
      .delete(`movies//${movieId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    console.log('Response:', response.body); 
    expect(response.status).toBe(204);
   
  });

  
});
