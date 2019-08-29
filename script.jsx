class List extends React.Component {
  constructor(){
    super()

    this.state = {
      word:"",
      list : [],
      error : false
    }
  }

  addItem(){
    if(this.state.word<1 || this.state.word>200){
        let newState = {
            error:true
        }
        this.setState(newState)
    }else{
        this.state.list.push([this.state.word,new Date()])
        let newState = {
            list:this.state.list,
            word:"",
            error:false
        }
        this.setState(newState)
    }

  }

  changeHandler(){
        let temp = event.target.value
        let newState = {
            word:temp
        }
        this.setState(newState)
  }

  removeThis(e,index){
        console.log(e)
        console.log(index)
        this.state.list.splice(index,1);
        let newState = {
            list:this.state.list
        }
        this.setState(newState)
  }

  render() {
      // render the list with a map() here

      console.log("rendering");
      return (
        <div>
            <div className="list">
              <input onChange={(event)=>{this.changeHandler(event)}} value={this.state.word}/>
              <button onClick={()=>{this.addItem()}}>add item</button><br/>
              {this.state.error && <p className="warning">Your text must be more than 1 OR less than 200 characters!</p>}
            </div>
            <div>
                <table>
                    <tbody>
                    {this.state.list.map((x,index)=>
                        <tr>
                            <td className="first-column">{x[0]}</td>
                            <td>
                               {moment().format("MMM Do YY")}
                            </td>
                            <td><button onClick={(e)=>{this.removeThis(e,index)}}>Delete</button></td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

