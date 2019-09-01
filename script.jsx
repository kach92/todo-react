class Form extends React.Component {

    render(){

        return(
            <div className="list">
                <input onChange={(event)=>{this.props.changeHandler(event)}} value={this.props.word}/>
                <button onClick={(event)=>{this.props.addItem(event)}}>add item</button><br/>
              {this.props.error && <p className="warning">Your text must be more than 1 OR less than 200 characters!</p>}
            </div>
            )
    }
}

class TodoItem extends React.Component{

    constructor(props){
        super(props);
        this.index = this.props.index;
        this.state = {
            timeLeft:5
        }
    }

    componentDidMount() {
        this.intervalID = setInterval(
          () => this.tick(),
          1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        if(this.state.timeLeft <1){
            console.log(this.index)
            this.props.removeByTime(this.index)
        }else{
            this.state.timeLeft--
            this.setState({
              timeLeft: this.state.timeLeft
            });
        }

    }

    render(){

        return(
                <tr>
                    <td className="first-column">{this.props.x[0]}</td>
                    <td className="second-column">
                       {moment(this.props.x[1]).fromNow()}
                    </td>
                    <td>{this.state.timeLeft}s</td>
                    <td><button onClick={(e)=>{this.props.removeThis(e,this.props.index)}}>Delete</button></td>
                </tr>
            )
    }
}

class ItemList extends React.Component{
    render(){

        let items = this.props.list.map((x,index)=>{
            return <TodoItem  x={x} index={index} removeThis={this.props.removeThis} removeByTime={this.props.removeByTime}/>

        })



        return(
                <table>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            )
    }
}

class DeletedItemList extends React.Component{
    render(){
        let list = this.props.delete.map(x=>{
            return <li>{x[0]}</li>
        })
        return(
                <div>
                <h2>Deleted items</h2>
                    <ul>
                        {list}
                    </ul>
                </div>
            )
    }
}

class TodoApp extends React.Component {
  constructor(){
    super()

    this.state = {
      word:"",
      list : [],
      error : false,
      delete :[]
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeThis = this.removeThis.bind(this);
    this.removeByTime = this.removeByTime.bind(this);
  }

  addItem(event){
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

  changeHandler(event){
        let temp = event.target.value
        let newState = {
            word:temp
        }
        this.setState(newState)
  }

  removeThis(e,index){
        let deleted = this.state.list[index]
        this.state.list.splice(index,1);
        this.state.delete.push(deleted)
        let newState = {
            list:this.state.list,
            delete: this.state.delete
        }
        this.setState(newState)
  }

  removeByTime(index){
        let deleted = this.state.list[index]
        this.state.list.splice(index,1);
        this.state.delete.push(deleted)
        let newState = {
            list:this.state.list,
            delete: this.state.delete
        }
        this.setState(newState)
  }

  render() {
      // render the list with a map() here
      console.log(this.state.delete)
      return (
        <div>

            <div>
                <Form changeHandler={this.changeHandler} addItem={this.addItem} word={this.state.word} error={this.state.error}/>
                <ItemList list={this.state.list} removeThis={this.removeThis} removeByTime={this.removeByTime}/>
                <DeletedItemList delete={this.state.delete}/>
            </div>
        </div>
      );
  }
}

ReactDOM.render(
    <TodoApp/>,
    document.getElementById('root')
);

