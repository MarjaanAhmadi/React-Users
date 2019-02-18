import React from "react";
import UsersList from "./components/List/UsersList";
import SearchInput from "./components/Actions/SearchInput";
import Sort from "./components/Actions/Sort";
import css from "./public/css/App.css";

// define a class of users athat containt user list and specific methods
const users = {
    // specific user list
    items: [
      {
        id: "357ba804-0b52-11e9-8b25-1040f388afa6",
        name: "Morgan Freeman"
      },
      {
        id: "4504cb3e-0b52-11e9-871c-1040f388afa6",
        name: "Joey Diaz"
      },
      {
        id: "49255760-0b52-11e9-ab0e-1040f388afa6",
        name: "Sonny Breitmeyer"
      },
      {
        id: "4e15cc64-0b52-11e9-8530-1040f388afa6",
        name: "Geronimo Fallon"
      },
      {
        id: "527085b0-0b52-11e9-9403-1040f388afa6",
        name: "Pallas Darwen"
      },
      {
        id: "56d4a474-0b52-11e9-a6a9-1040f388afa6",
        name: "Manilo Dozer"
      },
      {
        id: "5a142812-0b52-11e9-9e23-1040f388afa6",
        name: "Fabio Krantz"
      }
    ],

    //populate items of users
    populate() {
        this.items = this.get();
    },

    // return items or null
    get () {
        try {
            return this.items || []
        } catch (e) {}
        return [];
    },

    //mark user as trusted by userid as id
    //find user by id and add isTrusted attribute to item
    mark (id) {
      var userItem = this.items.find((element) => {
        return id === element.id;
      });
        userItem.isTrusted = !userItem.isTrusted;
    },
};
export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            users: users.items
        };
        this.refreshList = this.refreshList.bind(this)
        this.searchList = this.searchList.bind(this)
        this.sortList = this.sortList.bind(this)
        this.markUser = this.markUser.bind(this)
    }

    componentWillMount (){
      //prepare users for display when componentWillMount
      users.populate();
    }

    //serach by name in list and setstate to find users
    searchList = (name) => {
      var updatedList = this.state.users;
      updatedList = updatedList.filter((item) =>
      item.name.toLowerCase().search(
        name.toLowerCase()) !== -1 || item.id.search(
          name.toLowerCase()) !== -1 );
      this.setState({users: updatedList});
    }

    /*by searching search box when you are press on backspace the list will be update
    continue search by reminded words in serach box*/
    refreshList =() => {
      this.setState({
        users: users.items
      });
    }

    //sort list by ascending(sortId=1) or descending(sortId=-1)
    //then set state users
    sortList = (sortId) => {
    let sortedArray;
    (sortId === "1") ? sortedArray = this.state.users.sort( (a, b) => {
                      if (a.name < b.name) return -1;
                      else if (a.name > b.name) return 1;
                      return 0;
                    })
                    : sortedArray = this.state.users.sort( (a, b) => {
                                      if (a.name > b.name) return -1;
                                      else if (a.name < b.name) return 1;
                                      return 0;
                    });
                    this.setState({
                      users: sortedArray
                    });
                  }

    //mark user and update user list then notif to server
    markUser = (userId) => {
        users.mark(userId);
        this.setState({ users: this.state.users });
        this.notifToServer(userId);
    }

    //notif to server by api
    notifToServer = (userId) => {
      var url = new URL("http://www.abx.com") ,
      params = {id: userId};
      fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          //markUser();
          console.log("server got the notif");
        },
        (error) => {
          //handleError
          console.log("try again");
        }
      )
    }

    //display userlist and serach box and sorting filter components
    render () {
        return (
            <div>
                <h1>User List UI</h1>
              <div className="headerBar">
                <SearchInput refreshList={this.refreshList}
                             searchList={this.searchList}
                             />
                <Sort
                    sortList={this.sortList}
                    />
              </div>
                <UsersList
                    users={this.state.users}
                    markUser={this.markUser}
                />
            </div>
        );
    }
}
