// index.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const db = "mongodb://localhost:27017/?appName=mongodb-vscode+1.13.0&directConnection=true&serverSelectionTimeoutMS=2000";

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Not Connected', err));

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    genre: String,
    releaseYear: Number,
    rating: Number,
    review: String,
    thumbnailImage: String,
    reviews: [
        {
            rating: Number,
            review: String
        }
    ]
});

const Movie = mongoose.model("Movie", movieSchema);

app.get('/', (req, res) => {
    Movie.find({})
        .then((movies) => {
            movies.forEach(movie => {
                let total = movie.rating;
                let count = 1;

                if (movie.reviews.length > 0) {
                    movie.reviews.forEach(r => {
                        total += r.rating;
                        count++;
                    });
                }

                movie.avgRating = parseFloat((total / count).toFixed(1));
            });

            res.render('index', { moviesList: movies });
        })
        .catch(err => {
            console.log("Error retrieving movies:", err);
        });
});

app.get('/movie/:id', (req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            res.render('movie', {
                movieId: movie._id,
                title: movie.title,
                director: movie.director,
                genre: movie.genre,
                releaseYear: movie.releaseYear,
                rating: movie.rating,
                review: movie.review,
                thumbnailImage: movie.thumbnailImage,
                reviews: movie.reviews
            });
        })
        .catch(err => console.log("Movie not found", err));
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const data = req.body;
    Movie.create({
        title: data.title,
        director: data.director,
        genre: data.genre,
        releaseYear: data.releaseYear,
        rating: parseInt(data.rating),
        review: data.review,
        thumbnailImage: data.thumbnailImage,
        reviews: []
    })
    .then(() => {
        console.log("Movie added");
        res.redirect('/');
    })
    .catch(err => {
        console.log("Failed to add movie:", err);
        res.render('add');
    });
});

app.post('/movie/:id/review', (req, res) => {
    const { rating, review } = req.body;

    Movie.findByIdAndUpdate(req.params.id, {
        $push: {
            reviews: {
                rating: parseInt(rating),
                review: review
            }
        }
    })
    .then(() => {
        res.redirect('/movie/' + req.params.id);
    })
    .catch(err => {
        console.log("Failed to submit review:", err);
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
