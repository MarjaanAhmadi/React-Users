import React from "react";

//define a component for serach
export default class SearchInput extends React.Component {
  constructor(props){
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onChange = this.onChange.bind(this)
  }
    render () {
        return (
          <form  className="create-user-form">
              <input type="text"
              autoFocus
              placeholder="Search"
              ref="userMessage"
              onKeyDown={this.onKeyDown}
              onChange={this.onChange}/>
          </form>
        );
    }

    //by writing each word this method is called then the search list method
    //called and pass writted value to searchlist method for search the value in names
    onChange = (e) => {
        this.props.searchList(e.target.value);
        e.preventDefault();
    }

    //when user click on backspace this method is called for search by
    //remaind words in search box and update the user list
    onKeyDown (e) {
     if (e.keyCode === 8) {
       this.props.refreshList();
     }
 }
}
