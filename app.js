var Ingredient = React.createClass({
    render: function () {
      var className = "ingredient";
      return(
        <div className = "outer">
          <a href={this.props.link} target="_nofollow">
            <div className = {className}>
              {this.props.name}
            </div>
          </a>
        </div>
      );
    }
});

var View = React.createClass({
    getInitialState: function () {
      return { appIngredients: "",
               entreeIngredients: "",
               dessertIngredients: ""};
    },
    generateAppetizerIngredients: function () {
      this.generateIngredients("appIngredients", appSideI, appProteinI);
    },
    generateEntreeIngredients: function () {
      this.generateIngredients("entreeIngredients", entSideI, entProteinI);
    },
    generateDessertIngredients: function() {
      this.generateIngredients("dessertIngredients", desIpart1, desIpart2);
    },
    generateIngredients: function (property, sides, protein) {
        this.setState({[property]: this.chooseIngredients(sides, 3)
                             .concat(this.chooseIngredients(protein, 1))});
    },
    chooseIngredients: function (ingredientsArr, numIngredients) {
      var arr = []
      var resultIngredients = [];
      while(arr.length < numIngredients){
       var randomnumber = Math.ceil(Math.random()*(ingredientsArr.length - 1))
        if(arr.indexOf(randomnumber) > -1) continue;
          arr[arr.length] = randomnumber;
      }
      for (let i = 0; i < arr.length; i++) {
        resultIngredients.push(ingredientsArr[arr[i]]);
      }
      return resultIngredients;
    },
    makeIngredientListFromIngredients: function(property) {
      let ingredients = [];
      for (let i = 0; i < this.state[property].length; i++) {
      ingredients.push(<Ingredient name = {this.state[property][i]} 
                                   link = {"http://google.com/#q=" + this.state[property][i]}
                                   key = {i}/>)
      }
      return ingredients;
    },
    
    render: function () {
      var appIngredients = this.makeIngredientListFromIngredients("appIngredients");
      var entIngredients = this.makeIngredientListFromIngredients("entreeIngredients");
      var desIngredients = this.makeIngredientListFromIngredients("dessertIngredients");
      return (
        <div>
          <div className="container-fluid">
            <h1> Mystery Basket Generator</h1>
            <hr></hr>
            <div className="col-xs-12">
              <div className="appetizerHeader">
                  <h2>Appetizer Items</h2>
                </div>
                <button className="btn btn-success btn-lg" 
                        onClick={this.generateAppetizerIngredients}>
                        Generate Appetizer Round</button>
                <div className="ingredientList">
                  {appIngredients}
                </div>
                <hr></hr>
                <div className="lowerHeader">
                  <h2>Entree Items</h2>
                </div>
                <button className="btn btn-success btn-lg" 
                        onClick={this.generateEntreeIngredients}>
                        Generate Entree Round</button>
                <div className="ingredientList">
                  {entIngredients}
                </div>
                <hr></hr>
                <div className="lowerHeader">
                  <h2>Dessert Items</h2>
                </div>
                <button className="btn btn-success btn-lg" 
                        onClick={this.generateDessertIngredients}>
                        Generate Dessert Round</button>
                <div className="ingredientList">
                  {desIngredients}
                </div>
                <hr></hr>
                <div className="footer">
                  <p>Created for Anne Cogswell with <span className="glyphicon glyphicon-heart"></span> by <a href="http://codepen.io/dsilverman/">David Silverman</a></p>
                </div>
             </div>
          </div>
        </div>
      );
    }
});

ReactDOM.render(<View />, document.getElementById("container"));

