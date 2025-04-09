const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
// Schema creation
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'a tour name must have less or equal to 40 character'],
    minlength: [10, 'a tour name must have more or equal than 10 characters'],
    // validate: [validator.isAlpha, 'Tour names must only contain characters'],
  },
  duration: {
    type: Number,
    required: [true, 'Specify the tour duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Specify the maximum group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'Must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'difficulty must be either: easy, medium or difficult',
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'rating must be above 1.0'],
    max: [5, 'rating cannot be greater than 5'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: Number,
    validator: {
      validate: function (val) {
        // this.price only works when creating a new document, it will not work when patching
        return val < this.price; //false returns an error message
      },
      message: 'the discount ({VALUE}) cannot be greater than the price',
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'the img must have a cover image'],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

// Virtual schema
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document middleware: runs before .save e .create
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// // Query Middleware
// tourSchema.pre(/^find/, function (next) {
//   this.find({ secretTour: { $ne: true } });
//   this.start = Date.now();
//   next();
// });

// Aggregation Middleware
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().shift({ $match: { secretTour: { $ne: true } } });
//   console.log(this.pipeline);
//   next();
// });
// Creation of the first tour following a mongoose schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
