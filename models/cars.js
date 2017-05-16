// Dependencies
// =============================================================

module.exports = function(sequelize,DataTypes){

// Creates a "Car" model that matches up with DB
var Car = sequelize.define("car", {
  model: {
    type: DataTypes.STRING
  },
  make: {
    type: DataTypes.STRING
  },
  color: {
  type: DataTypes.STRING
  },
  year: {
    type: DataTypes.STRING
  }, 
  price: {
    type: DataTypes.STRING
  },
  swap: {
  type: DataTypes.BOOLEAN
  },
  photo: {
  type: DataTypes.TEXT
  }

}, {
  timestamps: false
});


return Car;
}
