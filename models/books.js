var mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    require: "Enter name",
  },
  publish_date: {
    type: Date,
    require: "Enter date",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    require: "Enter author",
    autopopulate: true,
  },
  isInStock: {
    type: Boolean,
  },
});

bookSchema.plugin(require("mongoose-autopopulate"));
let Books = mongoose.model("Book", bookSchema);
module.exports = Books;
