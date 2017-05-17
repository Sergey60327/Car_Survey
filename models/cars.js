// Dependencies
// =============================================================

module.exports = function(sequelize,DataTypes){

// Creates a "Car" model that matches up with DB
var Car = sequelize.define("Car", {
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
  },
  username:{
    type: DataTypes.STRING
  }  
}, {
  timestamps: false
});


return Car;
}
