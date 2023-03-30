module.exports = (mongoose) => {
   const Schema = mongoose.Schema
   const UserSchema = new Schema( {
   idnew_table: {
      type: Schema.Types.ObjectId,
      autoIncrement: true,
      primaryKey: true,        
      allowNull: false
   },
   name: {
      type: String,        
   },
   surname: {
      type: String,
   },
   });  
   const User = mongoose.model('User', UserSchema);
   return User;
};