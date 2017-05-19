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
  photo: {
    type: DataTypes.TEXT
  },
  username:{
      type: DataTypes.STRING
  },
  swapStatus: {
    type: DataTypes.INTEGER,
    defaultValue:0
  },
   swappedOrPendingSwap:{
    type:DataTypes.BOOLEAN,
    defaultValue: false
  },
   userSwap:{
    type: DataTypes.STRING,
    allowNull: true  
   },
   initiatedSwap: {
       type: DataTypes.BOOLEAN,
       defaultValue: false
   },
   swapCarID: {
       type: DataTypes.INTEGER,
       defaultValue: false
   },
}, {
  timestamps: false
});


return Car;
}
