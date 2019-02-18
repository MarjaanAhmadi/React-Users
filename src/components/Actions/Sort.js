import React from "react";

//create a sort component that user can select them filter
export default class Sort extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this)
  }
    render () {
        return (
          <select className="selectList" onChange={this.onChange}>
            <option value="0">Choos your sort item</option>
            <option value="1">Ascending</option>
            <option value="-1">Descending</option>
          </select>
        );
    }

    //when user select a filter this method is called for sort and update list
    onChange = (e) => {
      if (e.target.value === "0") {
        alert("Choose one item please");
      }
      else{
        this.props.sortList(e.target.value);
      }
        e.preventDefault();
    }
}
